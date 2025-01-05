import { useState, useEffect } from "react";
import Home from "./Home";
import JoinNow from "./JoinNow";
import MyLife from "./MyLife";
import OFMIntroduction from "./OFMIntroduction";
import Opening from "./Opening";

const MainProvider = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Sayfa yükleme durumunu kontrol et
        const checkLoad = () => {
            if (document.readyState === "complete") {
                console.log("x")
                setIsLoaded(true); // Sayfa tamamen yüklendiğinde
            } else {
                console.log("y")
                setTimeout(checkLoad, 200); // 200ms sonra tekrar kontrol et
            }
        };

        checkLoad(); // Sayfa durumu kontrol edilmeye başlar

    }, []);

    return (
        <>
            {!isLoaded ? (
                <Opening /> // Sayfa yüklenene kadar Opening göster
            ) : (
                <>
                    <Home />
                    <OFMIntroduction />
                    <JoinNow />
                    <MyLife />
                </>
            )}
        </>
    );
};

export default MainProvider;
