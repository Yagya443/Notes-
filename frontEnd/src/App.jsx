import Home from "./Pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";

function App() {
    return (
        <>
            <div >
                <Router>
                    <Routes>
                        <Route path="/dashboard" element={<Home />} exact />
                        <Route path="/login" element={<Login />} exact />
                        <Route path="/signup" element={<SignUp />} exact />
                    </Routes>
                </Router>
            </div>
        </>
    );
}

export default App;
