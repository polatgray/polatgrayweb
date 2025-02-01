import React,{useState,useEffect,useContext} from "react"
import { Routes, Route } from "react-router-dom"
import MainProvider from "./HomeComponents/MainProvider"
import LearnAboutOFM from "./LearnAboutOFM"
import JoinNow from "../components/JoinNowMain"
import MainDemo from "./DemoComponents/MainDemo"
import AdminPanelMain from "./AdminPanelComponents/AdminPanelMain"
import { LanguageContext } from "../Context/LanguageContext"
import CheckPlan from "./DemoComponents/CheckPlan"
import CheckOut from "./DemoComponents/CheckOut"
import SuccessPayment from "./DemoComponents/SuccessPayment"

const Main = () => {

    const {language,setLanguage} = useContext(LanguageContext)

    useEffect(() => {
        const getLocation = async () => {
          try {
            const response = await fetch("https://ipapi.co/json/"); 
            const data = await response.json();
            console.log(data);
            if (data.country_code === "TR") {
              setLanguage("tr"); 
            } else {
              setLanguage("en"); 
            }
          } catch (error) {
            console.error("Konum alınırken hata oluştu:", error);
          }
        };
    
        getLocation();
      }, []); 

    return(
        <>
            <Routes>
                <Route path="/" element={<MainProvider />} />
                <Route path="/learnAboutOFM" element={<LearnAboutOFM />} />
                <Route path="/joinNow" element={<JoinNow />} />
                <Route path="/DemoComponents" element={<MainDemo />} />
                <Route path="/PolatgrayAdminPanel" element={<AdminPanelMain />} />
                <Route path="/CheckPlan" element={<CheckPlan />} />
                <Route path="/CheckOut" element={<CheckOut />} />
                <Route path="/SuccessPayment" element={<SuccessPayment />} />
            </Routes>
        </>
    )
}

export default Main