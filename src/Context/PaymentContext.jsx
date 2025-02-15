import { Children, createContext, useState } from "react";

const PaymentContext = createContext();

const PaymentProvider = ({ children }) => {

    const [payOk,setPayOk] = useState(null)

    return(
        <PaymentContext.Provider value={{payOk,setPayOk}}>
            {children}
        </PaymentContext.Provider>    
    )

}


export {PaymentProvider,PaymentContext}