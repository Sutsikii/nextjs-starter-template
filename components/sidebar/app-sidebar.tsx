"use client"

import { useState } from "react"
import type * as React from "react"
import { Bell, ChevronDown, Home, Layers, LayoutDashboard, Mail, Settings, Users } from "lucide-react"

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

interface NavSubItem {
  title: string
  url: string
}

interface NavItem {
  title: string
  icon: React.ComponentType<{ className?: string }>
  url: string
  notifications: number
  subItems?: NavSubItem[]
}

interface NavGroup {
  title: string
  items: NavItem[]
}

const data: {
  user: {
    name: string
    email: string
    avatar: string
  }
  navigation: NavGroup[]
} = {
  user: {
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  navigation: [
    {
      title: "Tableau de bord",
      items: [
        { title: "Accueil", icon: Home, url: "/", notifications: 0 },
        { title: "Statistiques", icon: LayoutDashboard, url: "#", notifications: 0 },
      ],
    },
    {
      title: "Applications",
      items: [
        { title: "Messages", icon: Mail, url: "#", notifications: 12 },
        { title: "Notifications", icon: Bell, url: "#", notifications: 5 },
        {
          title: "Projets",
          icon: Layers,
          url: "#",
          notifications: 0,
          subItems: [
            { title: "Projets étudiant", url: "#/projets/etudiant" },
            { title: "Projets pro", url: "#/projets/pro" },
          ],
        },
      ],
    },
    {
      title: "Administration",
      items: [
        { title: "Utilisateurs", icon: Users, url: "/users", notifications: 0 },
        { title: "Paramètres", icon: Settings, url: "#", notifications: 0 },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [openSubMenus, setOpenSubMenus] = useState<Record<string, boolean>>({})
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  const toggleSubMenu = (itemTitle: string) => {
    setOpenSubMenus((prev) => ({
      ...prev,
      [itemTitle]: !prev[itemTitle],
    }))
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
