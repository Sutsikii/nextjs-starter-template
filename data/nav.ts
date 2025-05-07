import { Bell, Box, ChevronDown, Home, Layers, LayoutDashboard, Mail, Settings, Users } from "lucide-react"
interface NavGroup {
    title: string
    items: NavItem[]
}

interface NavItem {
    title: string
    icon: React.ComponentType<{ className?: string }>
    url: string
    notifications?: number
    subItems?: NavSubItem[]
}

interface NavSubItem {
    title: string
    url: string
}
  

export const data: {
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
          { title: "Accueil", icon: Home, url: "/"  },
        ],
      },
      {
        title: "Docker",
        items: [
          { 
            title: "Docker", 
            icon: Box, 
            url: "/docker",
            subItems: [
              { title: "Images", url: "/docker/images" },
              { title: "Containers", url: "/docker/containers" },
              { title: "Volumes", url: "/docker/volumes" },
              { title: "Networks", url: "/docker/networks" },
            ],
          },
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
          { title: "Utilisateurs", icon: Users, url: "/users" },
          { title: "Paramètres", icon: Settings, url: "#" },
        ],
      },
    ],
  }