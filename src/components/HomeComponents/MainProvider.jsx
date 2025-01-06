import { useState, useEffect, useContext } from "react";
import Home from "./Home";
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
        ), 3200);
    }, []);

    return (
        <>
            {!aniEnd ? (
                <div  className={`transition-all duration-300 ${opacityState ? "opacity-0" : "opacity-100"}`}>
                    <Opening /> // Sayfa yüklenene kadar Opening göster
                    <Home />
                </div>
            ) : (
                <Home />
            )}
        </>
    );
};

export default MainProvider;
