import { useEffect } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "@/pages/HomePage";

const App = () => {
    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        const applyTheme = (e: MediaQueryList | MediaQueryListEvent) => {
            document.documentElement.classList.toggle("dark", e.matches);
        };

        applyTheme(mediaQuery);
        mediaQuery.addEventListener("change", applyTheme);

        return () => mediaQuery.removeEventListener("change", applyTheme);
    }, []);

    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
            </Routes>
        </HashRouter>
    );
};

export default App;
