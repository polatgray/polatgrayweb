import { useState, useEffect, useContext } from "react";
import HomeV2 from "../DemoComponents/HomeV2";
import OFMIntroduction from "./OFMIntroduction"
import JoinNow from "./JoinNow"
import MyLife from "./MyLife"
import Opening from "./Opening";
import Footer from "./Footer";
import "../../css/Opening.css";

const MainProvider = () => {

    const [aniEnd,setAniEnd] = useState(false)
    const [opacityState,setOpacityState] = useState(false);


    useEffect(() => {
        setTimeout(() => (
            setOpacityState(true),
            setTimeout(() => (
                setAniEnd(true)
            ), 300)
        ), 3000);
    }, []);

    return (
        <>
            {!aniEnd ? (
                <div  className={`transition-all duration-300 ${opacityState ? "opacity-0" : "opacity-100"}`}>
                    <Opening />
                </div>
            ) : (
                <div>
                    <HomeV2 />
                    <OFMIntroduction />
                    <JoinNow />
                    <Footer />
                </div>
            )}
        </>
    );
};

export default MainProvider;
