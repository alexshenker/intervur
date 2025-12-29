import { HashRouter, Route, Routes } from "react-router-dom";

const App = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<div>Hello React!</div>} />
            </Routes>
        </HashRouter>
    );
};

export default App;
