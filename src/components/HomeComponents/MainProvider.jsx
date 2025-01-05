import { useState, useEffect, useContext } from "react";
import Home from "./Home";
import Opening from "./Opening";
import "../../css/Opening.css";
import { LoadingContext } from "../../Context/LoadingContext";

const MainProvider = () => {

    const {loadingFinally} = useContext(LoadingContext);

    useEffect(() => {
        // Fotoğraflar yüklendikten sonra Opening'i kaldırmak için
        if (loadingFinally) {
            // Burada resimler yüklendiğinde Opening ekranı kapanır
            console.log("All content loaded, removing opening screen.");
        }
    }, [loadingFinally]);

    return (
        <>
            {!loadingFinally ? (
                <div>
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
