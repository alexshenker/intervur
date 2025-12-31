import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, List, Shuffle } from "lucide-react";

const tabs = [
    { to: "/", label: "Home", icon: Home },
    { to: "/questions", label: "Questions", icon: List },
    { to: "/practice", label: "Practice", icon: Shuffle },
] as const;

export function TabNavigation() {
    return (
        <nav className="flex border-b border-border mb-6">
            {tabs.map((tab) => (
                <NavLink
                    key={tab.to}
                    to={tab.to}
                    end={tab.to === "/"}
                    className={({ isActive }) =>
                        cn(
                            "flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px",
                            isActive
                                ? "border-primary text-foreground"
                                : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"
                        )
                    }
                >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                </NavLink>
            ))}
        </nav>
    );
}
