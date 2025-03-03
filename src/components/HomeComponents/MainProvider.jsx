import { useState, useEffect, useContext } from "react";
import Home from "./Home";
import OFMIntroduction from "./OFMIntroduction"
import JoinNow from "./JoinNow"
import MyLife from "./MyLife"
import Opening from "./Opening";
import Footer from "./Footer";
import "../../css/Opening.css";
import HomeV3 from "../DemoComponents/HomeV3"

const MainProvider = ({timeTrigger}) => {

    const [aniEnd,setAniEnd] = useState(false)
    const [opacityState,setOpacityState] = useState(false);


    useEffect(() => {
        if(timeTrigger != 1){
            setTimeout(() => (
                setOpacityState(true),
                setTimeout(() => (
                    setAniEnd(true)
                ), 300)
            ), 3000);
        }
        else{
            setAniEnd("no-val");
        }
    }, [timeTrigger]);

    return (
        <>
            {!aniEnd ? (
                <div  className={`transition-all duration-300 ${opacityState ? "opacity-0" : "opacity-100"}`}>
                    <Opening />
                </div>
            ) : (
                aniEnd == "no-val" ? <></> : 
                <div>
                    <HomeV3 />
                    <OFMIntroduction />
                    <JoinNow />
                    <Footer />
                </div>
            )}
        </>
    );
};

export default MainProvider;
