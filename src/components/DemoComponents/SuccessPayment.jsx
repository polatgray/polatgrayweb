import { useContext } from "react"
import { PaymentContext } from "../../Context/PaymentContext"

const SuccessPayment = () => {

    const {payOk,setPayOk} = useContext(PaymentContext);

    return(
        <>
           {payOk ?  <div className="flex w-full h-screen justify-center items-center flex-col">
                <p className="animated-text text-5xl py-2">Ödeme işlemi tamamlandı</p>
                <p className="inter-500 text-lg text-white">Aşağıdaki butona tıklayarak PDF'i indirebilirsin.</p>
                <p className="inter-500 text-lg text-white">Aynı zamanda bu PDF'i mail hesabına göndermiş olacağız.</p>
            </div> : 
            <>
                <div className="flex h-screen w-full justify-center items-center">
                    <p className="animated-text text-5xl py-2">Burada ne arıyorsun?</p>
                </div>
            </>}
        </>
    )
}

export default SuccessPayment