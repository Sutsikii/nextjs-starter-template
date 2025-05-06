import { Bell, ChevronDown, Home, Layers, LayoutDashboard, Mail, Settings, Users } from "lucide-react"
interface NavGroup {
    title: string
    items: NavItem[]
}

interface NavItem {
    title: string
    icon: React.ComponentType<{ className?: string }>
    url: string
    notifications: number
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