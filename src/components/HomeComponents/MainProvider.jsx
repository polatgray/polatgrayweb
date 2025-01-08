import { useState, useEffect, useContext } from "react";
import Home from "./Home";
import OFMIntroduction from "./OFMIntroduction"
import JoinNow from "./JoinNow"
import MyLife from "./MyLife"
import Opening from "./Opening";
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
                    <Home />
                    <OFMIntroduction />
                    <JoinNow />
                    <MyLife />
                </div>
            )}
        </>
    );
};

export default MainProvider;
