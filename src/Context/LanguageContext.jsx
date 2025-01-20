import { Children, createContext, useState } from "react";

const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
        const [language,setLanguage] = useState("");


    return(
        <LanguageContext.Provider value={{language,setLanguage}}>
            {children}
        </LanguageContext.Provider>    
    )

}


export {LanguageProvider,LanguageContext}