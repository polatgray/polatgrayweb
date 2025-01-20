import { Routes, Route } from "react-router-dom"
import MainProvider from "./HomeComponents/MainProvider"
import LearnAboutOFM from "./LearnAboutOFM"
import JoinNow from "../components/JoinNowMain"
import MainDemo from "./DemoComponents/MainDemo"
import AdminPanelMain from "./AdminPanelComponents/AdminPanelMain"

const Main = () => {
    return(
        <>
            <Routes>
                <Route path="/" element={<MainProvider />} />
                <Route path="/learnAboutOFM" element={<LearnAboutOFM />} />
                <Route path="/joinNow" element={<JoinNow />} />
                <Route path="/DemoComponents" element={<MainDemo />} />
                <Route path="/PolatgrayAdminPanel" element={<AdminPanelMain />} />
            </Routes>
        </>
    )
}

export default Main