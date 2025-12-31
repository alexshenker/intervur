import { InitProgress, searchService } from "@/lib/search";
import { HomePage } from "@/pages/HomePage";
import { questions } from "@/seed/seed";
import { useEffect, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

const App = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [loadingProgress, setLoadingProgress] = useState<InitProgress>({
        current: 0,
        total: 0,
        cached: 0,
        generated: 0,
    });

    useEffect(() => {
        // Dark mode detection
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const applyTheme = (e: MediaQueryList | MediaQueryListEvent) => {
            document.documentElement.classList.toggle("dark", e.matches);
        };
        applyTheme(mediaQuery);
        mediaQuery.addEventListener("change", applyTheme);

        // Initialize search service
        searchService
            .initialize(questions, (progress) => {
                setLoadingProgress(progress);
            })
            .then(() => {
                setIsLoading(false);
            });

        return () => mediaQuery.removeEventListener("change", applyTheme);
    }, []);

    if (isLoading) {
        return (
            <div className="py-6 text-center">
                <p className="text-muted-foreground">
                    Loading model and indexing questions...
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                    {loadingProgress.current} / {loadingProgress.total}
                    {loadingProgress.cached > 0 && (
                        <span className="ml-2">
                            ({loadingProgress.cached} cached)
                        </span>
                    )}
                </p>
            </div>
        );
    }

    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
            </Routes>
        </HashRouter>
    );
};

export default App;
