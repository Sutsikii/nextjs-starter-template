import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { cookies } from "next/headers";
import { Header } from "@/components/layout/header";

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nextjs Starter",
  description: "A starter kit to develop faster with nextjs",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies()
  const sidebarState = cookieStore.get("sidebar_state")
  const defaultOpen = sidebarState ? sidebarState.value === "true" : true

  return (
    <html lang="fr" className={`${robotoMono.className} antialiased`} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
        <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
          <SidebarInset className="relative">
            <div className="flex h-screen">
              <div className="flex flex-1 flex-col">
                <Header />
                <main className="flex-1 overflow-auto p-4">
                  {children}
                </main>
              </div>
            </div>
            </SidebarInset>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
