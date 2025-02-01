import { useEffect, useState,useContext } from "react"
import toast from "react-hot-toast"
import { useLocation, useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid';
import { Cookies, useCookies } from "react-cookie";
import loadingLoop from "../../images/loading-loop.svg"
import loadingLoopWhite from "../../images/loadingLoopWhite.svg"
import { PaymentContext } from "../../Context/PaymentContext";

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

    const navigate = useNavigate();

    const {payOk,setPayOk} = useContext(PaymentContext);

    const [cookies, setCookie, removeCookie] = useCookies(["paymentID"]);

    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    
    const paymentQuery = queryParams.get('package');
  
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

    useEffect(() => {
        checkServerStatus();
    }, [])

    useEffect(() => {
        if(cookies.paymentID){
            setPurchaseAlreadyHave(true);
            setPaymentIDState(cookies.paymentID)
            console.log(cookies.paymentID)
        }
    }, [])

    useEffect(() => {
        if(serverStatusState){
            if(purchaseAlreadyHave){
                checkPayment();
            }
            else{
                createPayment();
            }
        }
    }, [cryptoPay])

    useEffect(() => {
        if(paymentStatus == "finished"){
            setPayOk(true)
            navigate("/SuccessPayment")
        }
    }, [paymentStatus])

    const createPayment = async () => {
        const orderId = `order_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
        if(cryptoPay && serverStatusState != null && serverStatusState != false){
            try{
                console.log("Sending...")
                const response = await fetch('https://api.nowpayments.io/v1/payment', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': process.env.REACT_APP_NOWPAYMENTSKEY
                    },
                    body: JSON.stringify({
                        price_amount: paymentQuery == 1 ? "40" : "100",          
                        price_currency: 'USD',       
                        pay_currency: 'BTC',     
                        is_fee_paid_by_user: true,         
                        order_id: orderId, 
                        success_url: 'https://yourwebsite.com/success', // Ödeme başarılı olursa yönlendirme URL'si
                        cancel_url: 'https://yourwebsite.com/cancel'   // İptal edilirse yönlendirme URL'si
                      })
              
                })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    setCookie("paymentID",data.payment_id, {path: "/", maxAge: 3600 })
                    setPurchaseAlreadyHave(true);
                    setSendAddress(data.pay_address);
                    setPaymentStatus(data.payment_status);
                    setPaymentIDState(data.payment_id);
                    setPayAmount(data.pay_amount);
                    if(data.payment_status == "waiting" || data.payment_status == "confirming" || data.payment_status == "confirmed" || data.payment_status == "sending" || data.payment_status == "partially_paid" || data.payment_status == "finished"){
                        setTimeout(() => {
                            checkPayment();
                        }, 7500)
                    }
                })
            }
            catch(error){
                toast.error("Something went wrong!")
                console.error(error)
                setCryptoPay(false)
            }
        }   
       
    }

    const checkPayment = async () => {
        console.log(paymentIDState)
        if(purchaseAlreadyHave){
            try{
                console.log("Sending check...")
                const response = await fetch(`https://api.nowpayments.io/v1/payment/${paymentIDState}` ,{
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
                    if(data.payment_status == "waiting" || data.payment_status == "confirming" || data.payment_status == "confirmed" || data.payment_status == "sending" || data.payment_status == "partially_paid" ){
                        setTimeout(() => {
                            checkPayment();
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


    return(
        <>
            <div className="flex mt-12 justify-around">
                <div className="flex flex-col items-center">
                    <p className="animated-text text-9xl">PG</p>
                </div>
                <div className="flex flex-col">
                    <div className="flex items-center gap-3">
                        <button className={`${cryptoPayActive ? serverStatusState == null || false ? "opacity-50" : "bg-amber-500" : ""} hover:bg-amber-600 text-white transition-all duration-300 px-4 py-2 rounded-lg outline-0 inter-500`} onClick={() => setCryptoPayActive(true)}>Kripto ödemesi</button>
                        <button className={`${!cryptoPayActive ? "bg-amber-500" : ""} hover:bg-amber-600 text-white transition-all duration-300 px-4 py-2 rounded-lg outline-0 inter-500`} onClick={() => setCryptoPayActive(false)}>Kredi Kartı ile ödeme</button>
                    </div>
                    <div>
                        {cryptoPayActive ? cryptoPay ? processLoading ? 
                        <>
                            <div className="flex justify-center">
                                <img src={loadingLoop} alt="Loop"  className="w-[50px]"/>
                            </div>
                        </> :
                        purchaseAlreadyHave ?
                        <>
                            {paymentQuery == "1" ? "PDF Paketi kripto ödemesi" : ""}
                            <p className="text-white inter-500 text-lg select-none">Ödenecek olan BTC tutarı: {payAmount} BTC</p>
                            <p className="text-white inter-500 text-lg">Göndermeniz gereken adres: {SendAddress}</p>
                            <p className="text-white inter-500 text-lg flex items-center select-none">Ödeme durumu: {paymentStatus == "waiting" ? 
                                <>
                                    {paymentStatus == "waiting" ? 
                                    <div className="flex items-center ms-2">
                                        <img src={loadingLoop} alt="Loading" className="w-[25p]"/>
                                        <p className="text-amber-500 inter-500 text-lg">Bekleniyor</p>
                                    </div> :   
                                paymentStatus == "confirming" ? 
                                <div className="flex items-center ms-2">
                                    <img src={loadingLoopWhite} alt="Loading" className="w-[25p]"/>
                                    <p className="text-green-600 inter-500 text-lg">Onaylanıyor</p>
                                </div> :
                                paymentStatus == "confirmed" ?
                                <div className="flex items-center ms-2">
                                    <img src={loadingLoopWhite} alt="Loading" className="w-[25p]"/>
                                    <p className="text-green-500 inter-500 text-lg">Onaylandı, cüzdana gönderiliyor...</p>
                                </div> :
                                paymentStatus == "sending" ? 
                                <div className="flex items-center ms-2">
                                    <img src={loadingLoopWhite} alt="Loading" className="w-[25p]"/>
                                    <p className="text-green-600 inter-500 text-lg">Gönderiliyor</p>
                                </div>:
                                paymentStatus == "partially_paid" ? 
                                <div className="flex items-center ms-2">
                                    <img src={loadingLoop} alt="Loading" className="w-[25p]"/>
                                    <p className="text-amber-500 inter-500 text-lg">Eksik miktar ödendi, devamı bekleniyor...</p>
                                </div>:
                                paymentStatus == "finished" ?
                                <div className="flex items-center ms-2">
                                    <p className="text-green-400 inter-500 text-lg">Ödeme tamamlandı!</p>
                                </div>:
                                paymentStatus == "failed" ? 
                                <div className="flex items-center ms-2">
                                    <p className="text-red-400 inter-500 text-lg">İşlem başarısız</p>
                                </div>:
                                paymentStatus == "refunded" ?
                                <div className="flex items-center ms-2">
                                    <p className="text-red-400 inter-500 text-lg">Ücret iade edildi</p>
                                </div>:
                                ""
                                }
                                </> 
                                :
                                <>
                                    <p>Bilinmiyor</p>
                                </>}
                            </p>
                            <p className="text-white inter-500 text-lg">Payment ID: {paymentIDState}</p>
                        </>
                        :
                        <>
                            {paymentQuery == "1" ? "PDF Paketi kripto ödemesi" : ""}
                            <p className="text-white inter-500 text-lg select-none">Ödenecek olan BTC tutarı: {payAmount} BTC</p>
                            <p className="text-white inter-500 text-lg">Göndermeniz gereken adres: {SendAddress}</p>
                            <p className="text-white inter-500 text-lg flex items-center select-none">Ödeme durumu: {paymentStatus == "waiting" ? 
                                <>
                                    {paymentStatus == "waiting" ? 
                                    <div className="flex items-center ms-2">
                                        <img src={loadingLoop} alt="Loading" className="w-[25p]"/>
                                        <p className="text-amber-500 inter-500 text-lg">Bekleniyor</p>
                                    </div> :   
                                paymentStatus == "confirming" ? 
                                <div className="flex items-center ms-2">
                                    <img src={loadingLoopWhite} alt="Loading" className="w-[25p]"/>
                                    <p className="text-green-600 inter-500 text-lg">Onaylanıyor</p>
                                </div> :
                                paymentStatus == "confirmed" ?
                                <div className="flex items-center ms-2">
                                    <img src={loadingLoopWhite} alt="Loading" className="w-[25p]"/>
                                    <p className="text-green-500 inter-500 text-lg">Onaylandı, cüzdana gönderiliyor...</p>
                                </div> :
                                paymentStatus == "sending" ? 
                                <div className="flex items-center ms-2">
                                    <img src={loadingLoopWhite} alt="Loading" className="w-[25p]"/>
                                    <p className="text-green-600 inter-500 text-lg">Gönderiliyor</p>
                                </div>:
                                paymentStatus == "partially_paid" ? 
                                <div className="flex items-center ms-2">
                                    <img src={loadingLoop} alt="Loading" className="w-[25p]"/>
                                    <p className="text-amber-500 inter-500 text-lg">Eksik miktar ödendi, devamı bekleniyor...</p>
                                </div>:
                                paymentStatus == "finished" ?
                                <div className="flex items-center ms-2">
                                    <p className="text-green-400 inter-500 text-lg">Ödeme tamamlandı!</p>
                                </div>:
                                paymentStatus == "failed" ? 
                                <div className="flex items-center ms-2">
                                    <p className="text-red-400 inter-500 text-lg">İşlem başarısız</p>
                                </div>:
                                paymentStatus == "refunded" ?
                                <div className="flex items-center ms-2">
                                    <p className="text-red-400 inter-500 text-lg">Ücret iade edildi</p>
                                </div>:
                                ""
                                }
                                </> 
                                :
                                <>
                                <p>Bilinmiyor</p>
                                </>}
                            </p>
                            <p className="text-white inter-500 text-lg">Payment ID: {paymentIDState}</p>

                        </> 
                            :  
                        <>
                            <div className="flex flex-col items-center">
                                <button className="bg-amber-500 hover:bg-amber-600 text-white inter-500 rounded-lg text-xl px-4 py-2 mt-4 outline-0" onClick={() => setCryptoPay(true)}>Ödeme linki oluştur</button>
                            </div>
                        </>  :
                        <>
                            <div className="flex flex-col items-center">
                                <p className="text-white inter-500 text-xl w-[300px] text-center mt-6">Kredi kartı ödemeleri şu anda desteklemiyor.</p>
                            </div>
                        </>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default CheckOut