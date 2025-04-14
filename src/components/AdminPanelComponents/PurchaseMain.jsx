import { useEffect, useState } from "react"
import { getDocs, collection } from "firebase/firestore";
import { db } from "../Firebase/Firebase";
import toast from "react-hot-toast";
import Close from "../../images/closeWhite.svg";
import Modal from 'react-modal';


const PurchaseMain = ({purchaseTrigger}) => {

    const [paymentsData,setPaymentsData] = useState(null);
    const [loading,setLoading] = useState("0,0,0");
    const [modalOpen, setModalOpen] = useState(false);

    const [name,setName] = useState(null);
    const [email,setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    const [packageState,setPackageState] = useState(null);
    const [createdAt,setCreatedAt] = useState(null);




    useEffect(() => {
        if(purchaseTrigger != 0 ){
            getPayments();
        }
    }, [purchaseTrigger])

    const getPayments = async () => {
        setLoading("0,0,1")
        try {
            const querySnapshot = await getDocs(collection(db, "paymentsOk"));
            setLoading("0,1,1")
            const paymentsData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            }));
            setLoading("1,1,1")
            setPaymentsData(paymentsData);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching payments: ", error);
            toast.error("Üyeler çekilemedi, lütfen geliştiriciye danışın.")
        }
    };


    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    return(
        <>
             <Modal style={customStyles} isOpen={modalOpen}>
                <div className="flex flex-col">
                    <div className="flex justify-end">
                        <img src={Close} alt="Close Button" className="w-[45px]" onClick={() => setModalOpen(!modalOpen)} />
                    </div>
                    <div className="flex flex-col">
                        <p className="inter-400 text-white">E-Posta: <span className="inter-700"> {email}</span></p>
                        <p className="inter-400 text-white">Şifre: <span className="inter-700"> {password}</span></p>
                        <p className="inter-400 text-white">Satın Alınan Paket: <span className="inter-700"> {packageState}</span></p>
                        <p className="inter-400 text-white">Şu tarihte alındı: <span className="inter-700"> {createdAt}</span></p>
                    </div>
                </div>
            </Modal>
            {loading == "0,0,0" ? 
            <>
                    <div className="fixed h-screen w-screen bg-black flex items-center justify-center z-10">
                            <div className="w-[300px] h-[5px] rounded-lg bg-gray-800">
                                <div className={`h-full transition-all rounded-lg bg-amber-500 duration-300 ${loading == "0,0,0" ? "w-[0px]" : loading == "0,0,1" ? "w-1/3" : loading == "0,1,1" ? "w-2/3" : loading == "1,1,1" ? "w-full" : "w-1/2"}`}>
                                </div>
                            </div>
                    </div>
            </> :  
            <div className="flex flex-col items-center gap-5">
                <p className="inter-600 text-white text-4xl text-2xl sm:text-start text-center my-6 mb-12">Satın Alım Üyeleri</p>
                {paymentsData && paymentsData.map((user,key) => (
                    <div className="flex border border-amber-600 rounded-lg justify-between px-5 items-center  select-none sm:w-[600px] w-[330px]" key={key}>
                        <p className="my-3 inter-500 text-white sm:text-xl">{user.name}</p>
                        <div className="flex items-center">
                            <button
                                className="bg-amber-500 py-1 rounded-lg text-white px-3 inter-500 outline-0"
                                onClick={() => {
                                    setEmail(user.email);
                                    setPassword(user.password);
                                    setPackageState(user.package);
                                    setCreatedAt(user.createdAt);
                                    setName(user.name)
                                    setModalOpen(!modalOpen)
                                }}
                            >
                                ...
                            </button>
                        </div>
                    </div>
                ))}
            </div>}
        </> 
    )
}

export default PurchaseMain