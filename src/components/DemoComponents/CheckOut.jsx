import { useEffect, useState,useContext } from "react"
import toast from "react-hot-toast"
import { data, useLocation, useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid';
import { Cookies, useCookies } from "react-cookie";
import loadingLoop from "../../images/loading-loop.svg"
import loadingLoopWhite from "../../images/loadingLoopWhite.svg"
import { PaymentContext } from "../../Context/PaymentContext";
import { db } from "../Firebase/Firebase"; 
import { collection, addDoc } from "firebase/firestore";
import CryptoJS from "crypto-js";
import {  getDocs, query, where } from "firebase/firestore";
import USDT from "../../images/usdt.png"
import BTC from "../../images/btc.svg"
import {LanguageContext} from "../../Context/LanguageContext"

const CheckOut = () => {

    const [cryptoPay, setCryptoPay] = useState(null)
    const [serverStatusState,setServerStatusState] = useState(null)
    const [cryptoPayActive,setCryptoPayActive] = useState(true)
    const [processLoading,setProcessLoading] = useState(false);
    const [purchaseAlreadyHave,setPurchaseAlreadyHave] = useState(false);

    const [SendAddress,setSendAddress] = useState("");
    const [paymentStatus,setPaymentStatus] = useState("");
    const [paymentIDState,setPaymentIDState] = useState("");
    const [payAmount,setPayAmount] = useState("");
    const [userPurchaseAlready,setUserPurchaseAlready] = useState(null);
    const [beforeBuy,setBeforeBuy] = useState(null);
    const [loginStatus,setLoginStatus] = useState(false);
    const [loginLoading,setLoginLoading] = useState(false);
    const [cryptoType,setCryptoType] = useState("noValue")
    const [cryptoStart,setCryptoStart] = useState(null);
    const [finishLoading,setFinishLoading] = useState(false)

    const [alreadyCookie,setAlreadyCookie] = useState(null);
    const [jwtkeyapi,setJwtkeyapi] = useState("");

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("");

    const navigate = useNavigate();

    const {payOk,setPayOk} = useContext(PaymentContext);

    const [cookies, setCookie, removeCookie] = useCookies(["paymentData"]);


    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    
    const paymentQuery = queryParams.get('package');

    const {language} = useContext(LanguageContext)
  
    if (!paymentQuery) {
        navigate("/CheckPlan")
    }

    const checkServerStatus = async () => {
        try{
            const response = await fetch('https://api.nowpayments.io/v1/status')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setServerStatusState(true);
                if(data.message != "OK"){
                    toast.error("Our crypto payment processing is currently not working. Please try again later.")
                    setServerStatusState(false)
                }
            })
        }
        catch(error){
            console.log(error)
        }
    }

    const savePayments = async () => {
        try {
          const docRef = await addDoc(collection(db, "paymentsOk"), {
            email,
            password,
            package: paymentQuery == 1 ? "package1" : "not_Saved",
            createdAt: new Date()
          });
      
          console.log("Belge eklendi, ID:", docRef.id);
        } catch (error) {
          console.error("Hata oluştu:", error);
        }
      };

    const detectUsers = async () => {
        setLoginLoading(true);
        try {
            const q = query(
              collection(db, "paymentsOk"),
              where("email", "==", email),
              where("password", "==", password)
            );
      
            const querySnapshot = await getDocs(q);
            
            if (querySnapshot.empty) {
              setBeforeBuy(false); 
              setLoginLoading(false);
              return;
            }
      
            setBeforeBuy(true)
            setLoginLoading(false);
          } catch (err) {
            console.error(err.message); 
            setLoginLoading(false);
          }
    }

    const saveAndLogin = () => {
        if(!email || !password){
            toast.error("Bilgiler boş bırakılamaz!")
        }
        else{
            detectUsers();
            setLoginStatus(true);
            setCryptoPay(true);
        }
    }
    

    useEffect(() => {
        checkServerStatus();
    }, [])

    const decryptData = (ciphertext) => {
        const secretKey = process.env.REACT_APP_SECRETKEY; 
        const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
        console.log(JSON.parse(bytes.toString(CryptoJS.enc.Utf8)));
        setAlreadyCookie(JSON.parse(bytes.toString(CryptoJS.enc.Utf8)));
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    };

    useEffect(() => {
        if(cookies.paymentData){
            decryptData(cookies.paymentData)
        }
    }, [])

    useEffect(() => {   
        console.log("crypto type consoled,", cryptoType)
        if(alreadyCookie && alreadyCookie.paymentMethod == cryptoType){
            console.log("if ok", cryptoType)
            setPurchaseAlreadyHave(true);
            setPaymentIDState(cookies.paymentID)
        }
    }, [cryptoType])
 
    useEffect(() => {
        console.log(cryptoPay)
        if(serverStatusState){
            console.warn("cryptoPay cryptoStart", purchaseAlreadyHave)
            if(alreadyCookie && alreadyCookie.paymentMethod == cryptoType){
                console.log("if ok", cryptoType)
                setPurchaseAlreadyHave(true);
                setPaymentIDState(alreadyCookie.paymentID)
                checkPayment(alreadyCookie.paymentID);
            }
            else{
                createPayment();
            }
        }
    }, [cryptoPay,cryptoStart])

    useEffect(() => {
        if(paymentStatus == "finished"){
            setPayOk(true)
            savePayments();
            transferWEB();
            removeCookie("paymentData", {path: "/"})
            navigate("/SuccessPayment")
        }
    }, [paymentStatus])

    const runAfterAuth = async (dataToken) => {
        try{
            const response = await fetch('https://api.nowpayments.io/v1/sub-partner/transfer', {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization": `Bearer ${dataToken}`
                },
                body: JSON.stringify({
                    // currency: cryptoType == "usdt" ? "USDT" : "BTC",
                    // amount: language == "en" ? "60" : "600",
                    // from_id: "4132087042",
                    // to_id: "4132087042",
                    currency: "USDTARB",
                    amount: "0.50",
                    from_id: "6097719148",
                    to_id: "1721050575"
                })
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
            })
        }
        catch(error){
            console.error(error);
        }
    }

    const getTransferUsers = async (dataToken) => {
        try{
            const response = await fetch('https://api.nowpayments.io/v1/sub-partner', {
                headers:{
                    "Authorization": `Bearer ${dataToken}`
                } 
            })
            .then((response) => {
                return response.JSON();
            })
            .then((data) => {
                console.log(data);
            })
        }
        catch(error){
            console.error(error);
        }
    }

    const getUserBalance = async (dataId) => {
        try{
            const response = await fetch(`https://api.nowpayments.io/v1/sub-partner/balance/1721050575`, {
                headers:{
                    "x-api-key" : process.env.REACT_APP_NOWPAYMENTSKEY
                }
            })
            .then((response) => {
                return response.JSON();
            })
            .then((data) => {
                console.log(data)
            })
        }
        catch(error){
            console.error(error)
        }
    }

    const createUsers = async (dataToken) => {
        try{
            const response = await fetch('https://api.nowpayments.io/v1/sub-partner/balance', {
                method: "POST",
                headers:{
                    "Content-Type" : "application/json",
                    "Authorization": `Bearer ${dataToken}`
                },
                body: JSON.stringify({
                    "name": "sekullarx"
                })
            })
            .then((response) => {
                return response.JSON();
            })
            .then((data) => {
                console.log(data);
            })
        }
        catch(error){
            console.error(error);
        }
    }


    const transferSubpartner = async (dataToken) => {
       try{
            const response = await fetch(`https://api.nowpayments.io/v1/sub-partner/payment`, {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                    "x-api-key" : process.env.REACT_APP_NOWPAYMENTSKEY,
                    "Authorization" : `Bearer  ${dataToken}`
                },
                body: JSON.stringify({
                    currency: cryptoType == "usdt" ? "USDT" : "BTC",
                    amount: paymentQuery == 1 ? cryptoType == "usdt" ? language == "en" ? 60 : 20 : language == "en" ? 0.00061 : 0.00017 : "",
                    currency: "USDTARB",
                    amount: 0.77,
                    sub_partner_id: "1721050575",
                    "is_fixed_rate": false,
                    "is_fee_paid_by_user":false,
                })
            })
            .then((response) => {
                return response.JSON();
            })
            .then((data) => {
                console.log(data);
            })
       }    
       catch(error){
            console.error(error);
       }
    }

    const transferWEB = async () => {
        try{
            const response = await fetch('https://api.nowpayments.io/v1/auth', {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify({
                    "email": process.env.REACT_APP_MAILADDRESS,
                    "password": process.env.REACT_APP_PASSWORD
                })
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                // runAfterAuth(data.token);
                // getTransferUsers(data.token);
                // createUsers(data.token);
                // getUserBalance();
                transferSubpartner();

            })
        }
        catch(error){
            console.error(error)
        }
    }

    const createPayment = async () => {
        setProcessLoading(true);
        setFinishLoading(true);
        const orderId = `order_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
        if(cryptoPay && serverStatusState != null && serverStatusState != false && cryptoStart){
            try{
                console.log("Sending...")
                console.log(jwtkeyapi)
                const response = await fetch('https://api.nowpayments.io/v1/payment', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': process.env.REACT_APP_NOWPAYMENTSKEY
                    },
                    body: JSON.stringify({
                        price_amount: paymentQuery == 1 ? language == "en" ? "599" : "5999" : "",          
                        price_currency: language == "en" ? "USD" : "TRY",       
                        pay_currency: cryptoType == "usdt" ? "USDTTRC20" : "BTC",     
                        is_fee_paid_by_user: true,         
                        order_id: orderId, 
                        success_url: 'https://yourwebsite.com/success', 
                        cancel_url: 'https://yourwebsite.com/cancel'   
                      })
              
                })
                .then((response) => {
                    console.log("check 1")
                    setProcessLoading(true);
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    console.log("check 2")
                    setPurchaseAlreadyHave(true);
                    setSendAddress(data.pay_address);
                    setPaymentStatus(data.payment_status);
                    setPaymentIDState(data.payment_id);
                    setPayAmount(data.pay_amount);
                    setFinishLoading(false);
                    console.log("check 3")
                    const paymentData = { paymentID: data.payment_id, packageID:paymentQuery, paymentMethod: cryptoType };
                    console.log("3.5")
                    const secretKey = process.env.REACT_APP_SECRETKEY; 
                    const encryptedData = CryptoJS.AES.encrypt(
                        JSON.stringify(paymentData),
                        secretKey
                    ).toString();
                    console.log("check 4")
                    setProcessLoading(true);
                    setCookie("paymentData",encryptedData,{path: "/"})
                    setFinishLoading(false);
                    setCryptoPay(true);
                    console.log("check 5")
                    // if(data.payment_status == "waiting" || data.payment_status == "confirming" || data.payment_status == "confirmed" || data.payment_status == "sending" || data.payment_status == "partially_paid" || data.payment_status == "finished"){
                    //     setTimeout(() => {
                    //         checkPayment();
                    //     }, 7500)
                    // }
                })
            }
            catch(error){
                toast.error("Something went wrong!")
                console.error(error)
                setCryptoPay(false)
            }
        }   
       
    }

    useEffect(() => {
        console.log(processLoading,"proccess")
    }, [processLoading])

    const handleKeyDownSaveAndLogin = (e) => {
        if (e.key === "Enter") {
          
        }
      };


    const checkPayment = async (paymentIDParam) => {
        console.log("check 6")
        console.log(paymentIDState)
        setPurchaseAlreadyHave(true)
        console.log("check 7")
        console.log("Kanka buraya kadar gelip çalışmıosan ananı sikiyim", purchaseAlreadyHave)
        if(purchaseAlreadyHave){
            try{
                console.log("Sending check...")
                const response = await fetch(`https://api.nowpayments.io/v1/payment/${paymentIDParam}` ,{
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': process.env.REACT_APP_NOWPAYMENTSKEY
                    },
                })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    setPurchaseAlreadyHave(true);
                    setSendAddress(data.pay_address);
                    setPaymentStatus(data.payment_status);
                    setPaymentIDState(data.payment_id);
                    setPayAmount(data.pay_amount);
                    setFinishLoading(false);
                    if(data.payment_status == "waiting" || data.payment_status == "confirming" || data.payment_status == "confirmed" || data.payment_status == "sending" || data.payment_status == "partially_paid" ){
                        setTimeout(() => {
                            checkPayment(alreadyCookie.paymentID);
                        }, 7500)
                    } 
                })

            }
            catch(error){
                toast.error("Something went wrong!")
                console.error(error);
            }
        }

    }

    useEffect(() => {
        if(purchaseAlreadyHave){
            if(alreadyCookie){
                checkPayment(alreadyCookie.paymentID);
            }
        }
    }, [purchaseAlreadyHave])


    return(
        <>
            <div className="flex mt-12 justify-around lg:flex-row flex-col lg:items-start items-center">
                <div className="flex flex-col items-center sm:mb-0 mb-12">
                    <p className="animated-text text-5xl sm:text-9xl">PG</p>
                </div>
                <div className="flex flex-col sm:px-0 px-4">
                    
                    <div className="flex items-center gap-3 sm:flex-row flex-col sm:border-0 border-b pb-4 border-amber-500">
                        <button className={`${cryptoPayActive ? serverStatusState == null || false ? "opacity-50" : "bg-amber-500" : ""} hover:bg-amber-600 text-white transition-all duration-300 px-4 py-2 rounded-lg outline-0 inter-500 sm:w-auto w-[320px]`} onClick={() => setCryptoPayActive(true)}>{language == "en" ? "Crypto payment" : "Kripto ödemesi"}</button>
                        <button className={`${!cryptoPayActive ? "bg-amber-500" : ""} hover:bg-amber-600 text-white transition-all duration-300 px-4 py-2 rounded-lg outline-0 inter-500 sm:w-auto w-[320px]`} onClick={() => setCryptoPayActive(false)}>{language == "en" ? "Credit Card Payment" : "Kredi Kartı ile ödeme"}</button>
                    </div>
                    <div>
                        {cryptoPayActive ?
                            cryptoPay ? 
                                !processLoading ? 
                                <>
                                    <div className="flex justify-center mt-12">
                                        <img src={loadingLoop} alt="Loop"  className="w-[50px]"/>
                                    </div>
                                </> :
                                <>
                                    {loginStatus ? 
                                    <> 
                                        {cryptoStart ? 
                                            finishLoading ? 
                                            <>
                                                <div className="flex justify-center">
                                                    <img src={loadingLoop} className="w-[35px] mt-12" />
                                                </div>
                                            </>
                                            :
                                            <>
                                            {paymentQuery == "1" ? "PDF Paketi kripto ödemesi" : ""}
                                            <p className="text-white inter-500 text-lg select-none ">{language == "en" ? "Amount to be paid:" : "Ödenecek olan tutar: "}<br className="sm:hidden block"/>{payAmount} {cryptoType == "usdt" ? "USDT TRC20" : "BTC"}</p>
                                            <p className="text-white inter-500 text-lg flex sm:flex-row flex-col my-4 sm:items-center">{language == "en" ? "The address you need to send to is:" : "Göndermeniz gereken adres:"} <span className="sm:text-base text-sm">{SendAddress}</span></p>
                                            <p className="text-white inter-500 text-lg flex items-center select-none">{language == "en" ? "Payment Status" : "Ödeme durumu:"} {paymentStatus == "waiting" ? 
                                                <>
                                                {paymentStatus == "waiting" ? 
                                                <div className="flex items-center ms-2">
                                                    <img src={loadingLoop} alt="Loading" className="w-[25p]"/>
                                                    <p className="text-amber-500 inter-500 text-lg">{language == "en" ? "Waiting" : "Bekleniyor"}</p>
                                                </div> :   
                                                paymentStatus == "confirming" ? 
                                                <div className="flex items-center ms-2">
                                                    <img src={loadingLoopWhite} alt="Loading" className="w-[25p]"/>
                                                    <p className="text-green-600 inter-500 text-lg">{language == "en" ? "Confirming" : "Onaylanıyor"}</p>
                                                </div> :
                                                paymentStatus == "confirmed" ?
                                                <div className="flex items-center ms-2">
                                                    <img src={loadingLoopWhite} alt="Loading" className="w-[25p]"/>
                                                    <p className="text-green-500 inter-500 text-lg">{language == "en" ? "Approved, sending to wallet..." : "Onaylandı, cüzdana gönderiliyor..."}</p>
                                                </div> :
                                                paymentStatus == "sending" ? 
                                                <div className="flex items-center ms-2">
                                                    <img src={loadingLoopWhite} alt="Loading" className="w-[25p]"/>
                                                    <p className="text-green-600 inter-500 text-lg">{language == "en" ? "Sending" : "Gönderiliyor"}</p>
                                                </div>:
                                                paymentStatus == "partially_paid" ? 
                                                <div className="flex items-center ms-2">
                                                    <img src={loadingLoop} alt="Loading" className="w-[25p]"/>
                                                    <p className="text-amber-500 inter-500 text-lg">{language == "en" ? "The missing amount has been paid, the rest is awaited..." : "Eksik miktar ödendi, devamı bekleniyor..."}</p>
                                                </div>:
                                                paymentStatus == "finished" ?
                                                <div className="flex items-center ms-2">
                                                    <p className="text-green-400 inter-500 text-lg">{language == "en" ? "Payment completed!" : "Ödeme tamamlandı!"}</p>
                                                </div>:
                                                paymentStatus == "failed" ? 
                                                <div className="flex items-center ms-2">
                                                    <p className="text-red-400 inter-500 text-lg">{language == "en" ? "Payment Failed" : "İşlem başarısız"}</p>
                                                </div>:
                                                paymentStatus == "refunded" ?
                                                <div className="flex items-center ms-2">
                                                    <p className="text-red-400 inter-500 text-lg">{language == "en" ? "Payment Refunded" : "Ücret iade edildi"}</p>
                                                </div>:
                                                ""
                                                }
                                                </> 
                                                :
                                                <>
                                                    <p>{language == "en" ? "Processing" : "Bilinmiyor"}</p>
                                                </>}
                                            </p>
                                            {/* <button className="bg-amber-500 hover:bg-amber-600 transition-all rounded-lg px-4 py-2 text-white my-3" onClick={() => checkPayment()}>Kontrol et</button> */}
                                            <p className="text-white inter-500 text-lg flex sm:flex-row flex-col">Payment ID: {paymentIDState}</p> 
                                            </>
                                        : 
                                            <>
                                                {cryptoType != "noValue" ? "" : 
                                                <div className="flex flex-col justify-center">
                                                    <div className="flex items-center justify-center gap-4 mt-3 bg-amber-500 rounded-lg py-2 cursor-pointer" onClick={() => {setCryptoType("usdt"); setCryptoStart(true)}}>
                                                        <img src={USDT} alt="USDT" className="w-[35px]" />
                                                        <p className="inter-500 text-white text-lg">{language == "en" ? "Pay in USDT" : "USDT olarak öde"}</p>
                                                    </div>
                                                    <div className="flex items-center justify-center gap-4 mt-3 bg-amber-500 rounded-lg py-2 cursor-pointer" onClick={() => {setCryptoType("btc"); setCryptoStart(true)}}>
                                                        <img src={BTC} alt="USDT" className="w-[35px]" />
                                                        <p className="inter-500 text-white text-lg">{language == "en" ? "Pay in BTC" : "BTC olarak öde"}</p>
                                                    </div>
                                                </div>} 
                                            </>
                                        }
                                    </> : 
                                    ""
                                    }
                                </>
                            :  
                        <>
                            {loginLoading ? 
                            <div className="flex justify-center">
                                <img src={loadingLoop} className="mt-12 " alt="Loading" />
                            </div> : 
                            <div className="flex flex-col border border-amber-500 p-6 rounded-lg mt-8 gap-5">
                                <div className="flex flex-col">
                                    <p className="text-white inter-500 mb-2">{language == "en" ? "E-Mail Address" : "E-Posta"}</p>
                                    <input type="text" onKeyDown={handleKeyDownSaveAndLogin} onChange={(e) => setEmail(e.target.value)} className="bg-black p-2 border-amber-500 focus:border-amber-300 transition-all outline-0 duration-2000 rounded-lg text-white border" placeholder={`${language == "en" ? "E-Mail Address" : "E-Posta"}`}/>
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-white inter-500 mb-2">{language == "en" ? "Password" : "Şifre"}</p>
                                    <input type="password" onKeyDown={handleKeyDownSaveAndLogin} onChange={(e) => setPassword(e.target.value)} className="bg-black p-2 border-amber-500 focus:border-amber-300 outline-0 transition-all duration-300 rounded-lg text-white border" placeholder={`${language == "en" ? "Password" : "Şifre"}`}/>
                                </div>
                                <button className="bg-amber-500 hover:bg-amber-600  transition-all duration-300 px-4 py-2 rounded-lg text-white inter-500" onClick={() => {saveAndLogin();}}>{language == "en" ? "Save" : "Kaydet"}</button>
                            </div>}
                            {/* <div className="flex flex-col items-center">
                                <button className="bg-amber-500 hover:bg-amber-600 text-white inter-500 rounded-lg text-xl px-4 py-2 mt-4 outline-0" onClick={() => setCryptoPay(true)}>Ödeme linki oluştur</button>
                            </div> */}
                        </>  :
                        <>
                            <div className="flex flex-col items-center">
                                <p className="text-white inter-500 text-xl w-[300px] text-center mt-6">{language == "en" ? "Credit card payments will be active after the first purchase." : "Kredi kartı ödemeleri ilk alımdan sonra aktif olacaktır."}</p>
                            </div>
                        </>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default CheckOut