import { TabNavigation } from "./TabNavigation";

interface LayoutProps {
    children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className="py-6">
            <TabNavigation />
            {children}
        </div>
    );
}
