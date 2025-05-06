"use client"

import { useState, useEffect } from "react"
import type * as React from "react"
import { ChevronDown } from "lucide-react"

import { NavUser } from "./nav-user"
import { Badge } from "@/components/ui/badge"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import { data } from "@/data/nav"
// Constantes pour la gestion des cookies
const SIDEBAR_SUBMENU_COOKIE_NAME = "sidebar:submenus"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 30 // 30 jours

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [openSubMenus, setOpenSubMenus] = useState<Record<string, boolean>>({})
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  useEffect(() => {
    const loadSubMenuState = () => {
      const cookieValue = document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${SIDEBAR_SUBMENU_COOKIE_NAME}=`))
        ?.split("=")[1]

      if (cookieValue) {
        try {
          const parsedState = JSON.parse(decodeURIComponent(cookieValue))
          setOpenSubMenus(parsedState)
        } catch (e) {
          console.error("Erreur lors du chargement de l'état des sous-menus:", e)
        }
      }
    }

    loadSubMenuState()
  }, [])

  // Fonction pour basculer l'état d'un sous-menu
  const toggleSubMenu = (itemTitle: string) => {
    setOpenSubMenus((prev) => {
      const newState = {
        ...prev,
        [itemTitle]: !prev[itemTitle],
      }

      // Sauvegarder l'état des sous-menus dans un cookie
      document.cookie = `${SIDEBAR_SUBMENU_COOKIE_NAME}=${encodeURIComponent(
        JSON.stringify(newState),
      )}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`

      return newState
    })
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="h-auto flex-col border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-4 py-3">
          <div className="font-semibold group-data-[collapsible=icon]:hidden">MonApplication</div>
        </div>
        <form className="px-4 pb-3 group-data-[collapsible=icon]:hidden">
        </form>
      </SidebarHeader>
      <SidebarContent>
        <TooltipProvider delayDuration={300}>
          {data.navigation.map((group) => (
            <SidebarGroup key={group.title}>
              <SidebarGroupLabel className="group-data-[collapsible=icon]:sr-only">{group.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      {item.subItems ? (
                        <div className="w-full">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <SidebarMenuButton onClick={() => toggleSubMenu(item.title)} className="w-full">
                                <item.icon className="h-4 w-4" />
                                <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
                                <ChevronDown
                                  className={`ml-auto h-4 w-4 transition-transform group-data-[collapsible=icon]:hidden ${
                                    openSubMenus[item.title] ? "rotate-180" : ""
                                  }`}
                                />
                              </SidebarMenuButton>
                            </TooltipTrigger>
                            <TooltipContent side="right" className="group-data-[state=expanded]:hidden">
                              {item.title}
                            </TooltipContent>
                          </Tooltip>

                          {openSubMenus[item.title] && !isCollapsed && (
                            <div className="pl-6 mt-1 space-y-1">
                              {item.subItems.map((subItem) => (
                                <a
                                  key={subItem.title}
                                  href={subItem.url}
                                  className="flex items-center py-1.5 px-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground"
                                >
                                  {subItem.title}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <SidebarMenuButton asChild>
                              <a href={item.url}>
                                <item.icon className="h-4 w-4" />
                                <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
                                {item.notifications > 0 && (
                                  <Badge className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs group-data-[collapsible=icon]:absolute group-data-[collapsible=icon]:right-1 group-data-[collapsible=icon]:top-1 group-data-[collapsible=icon]:h-4 group-data-[collapsible=icon]:min-w-4 group-data-[collapsible=icon]:p-0">
                                    {item.notifications}
                                  </Badge>
                                )}
                              </a>
                            </SidebarMenuButton>
                          </TooltipTrigger>
                          <TooltipContent side="right" className="group-data-[state=expanded]:hidden">
                            {item.title}
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </TooltipProvider>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
