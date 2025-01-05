import { Children, createContext, useState } from "react";

const LoadingContext = createContext();

const LoadingProvider = ({ children }) => {
        const [loadingFinally,setLoadingFinally] = useState(false)


    return(
        <LoadingContext.Provider value={{loadingFinally,setLoadingFinally}}>
            {children}
        </LoadingContext.Provider>    
    )

}


export {LoadingProvider,LoadingContext}