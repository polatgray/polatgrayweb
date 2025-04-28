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
import SiteBlocked from "./AdminPanelComponents/SiteBlocked"
import { createClient } from "@supabase/supabase-js"
import { useNavigate } from "react-router-dom"
import CheckPhone from "./AdminPanelComponents/CheckPhone"
import AddFeautedUser from "./AdminPanelComponents/AddFeaturedUser"

const Main = () => {

    const {language,setLanguage} = useContext(LanguageContext);
    const [triggetVal,setTriggerVal] = useState(1);

    const navigate = useNavigate();

      const supabaseUrl = process.env.REACT_APP_SBURL;
      const supabaseKey = process.env.REACT_APP_SBAPIKEY;
      const supabase = createClient(supabaseUrl, supabaseKey);

      const checkSiteOnline = async () => {
            const { data, error } = await supabase
                .from('site_access')
                .select('site_online')
                .eq('id', 1)
                .single(); // Tek bir satır almak için

            if (error) {
                console.error("Supabase Hatası:", error);
                return;
            }
            else{
              if(!data.site_online){
                navigate("/ServiceUnavailable")
              }
              else{
                setTriggerVal(2);
              }
            }
      }

    useEffect(() => {
        const getLocation = async () => {
          try {
            const response = await fetch("https://ipapi.co/json/"); 
            const data = await response.json();
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
        checkSiteOnline();
      }, []); 
      

    return(
        <>
            <Routes>
                <Route path="/" element={<MainProvider timeTrigger={triggetVal}/>} />
                <Route path="/learnAboutOFM" element={<LearnAboutOFM />} />
                <Route path="/joinNow" element={<JoinNow />} />
                <Route path="/DemoComponents" element={<MainDemo />} />
                <Route path="/PolatgrayAdminPanel" element={<AdminPanelMain />} />
                <Route path="/CheckPlan" element={<CheckPlan />} />
                <Route path="/CheckOut" element={<CheckOut />} />
                <Route path="/SuccessPayment" element={<SuccessPayment />} />
                <Route path="/ServiceUnavailable" element={<SiteBlocked />} />
                <Route path="/CheckPhone" element={<CheckPhone />} />
                <Route path="/AddFeaturedUser" element={<AddFeautedUser />} />
            </Routes>
        </>
    )
}

export default Main