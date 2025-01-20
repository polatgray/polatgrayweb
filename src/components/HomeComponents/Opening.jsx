import "../../css/Opening.css";
import { LanguageContext } from "../../Context/LanguageContext";
import { useContext } from "react";

const Opening = () => {

    const {language} = useContext(LanguageContext)

    return (
        <div className="fixed w-full h-full bg-black z-20 flex items-center justify-center">
            <div className="relative flex flex-col items-center justify-center">
                {/* <p className="animated-text sm:text-9xl text-7xl pg-text ">PG</p> */}
                <div class="container">
                    <div class="box">
                        <div class="title">
                            <span class="block"></span>
                            <h1 className="animated-text sm:text-9xl text-7xl pg-text">PG</h1>
                        </div>
                    </div>
                </div>
                <p className="dm-serif-text-regular text-white text-xl px-2 animated-text animated-text-opening-label text-center mt-5">{language == "en" ? "World’s Best Charismatic Millionaire" : "Dünyanın En Karizmatik Milyoneri"}</p>
            </div>
        </div>
    );
};

export default Opening;
