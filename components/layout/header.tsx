import { AppBreadcrumb } from "../breadcrumb/app-breadcrumb";
import { ModeToggle } from "../theme/theme-mode-toggle";
import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";

export function Header() {
    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 w-full justify-between">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <AppBreadcrumb />
            </div>
            <div className="flex items-center gap-2">
                <ModeToggle />
            </div>
        </header>
    )
}
