import { useState, useEffect } from "react";
import Home from "./Home";
import JoinNow from "./JoinNow";
import MyLife from "./MyLife";
import OFMIntroduction from "./OFMIntroduction";
import Opening from "./Opening";

const MainProvider = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Sayfanın yükleme durumu
        const checkLoad = () => {
            if (document.readyState === "complete") {
                setIsLoaded(true); // Sayfa tamamen yüklendiğinde
            } else {
                setTimeout(checkLoad, 100); // Sayfa hala yükleniyorsa her 100ms'de kontrol et
            }
        };

        checkLoad(); // Sayfa durumu kontrol edilmeye başlar

    }, []);

    return (
        <>
            {!isLoaded && <Opening />}  {/* Sayfa yüklenene kadar Opening göster */}
            {isLoaded && (
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
