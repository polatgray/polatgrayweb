import { Routes, Route } from "react-router-dom"
import MainProvider from "./HomeComponents/MainProvider"

const Main = () => {
    return(
        <>
            <Routes>
                <Route path="/" element={<MainProvider />} />
            </Routes>
        </>
    )
}

export default Main