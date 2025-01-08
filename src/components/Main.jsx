import { Routes, Route } from "react-router-dom"
import MainProvider from "./HomeComponents/MainProvider"
import LearnAboutOFM from "./LearnAboutOFM"

const Main = () => {
    return(
        <>
            <Routes>
                <Route path="/" element={<MainProvider />} />
                <Route path="/learnAboutOFM" element={<LearnAboutOFM />} />
            </Routes>
        </>
    )
}

export default Main