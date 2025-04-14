import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../Firebase/Firebase";
import Modal from 'react-modal';
import Close from "../../images/closeWhite.svg";


const SupportMain = ({supportTriggerInner}) => {

    const [loading,setLoading] = useState("0,0,0");
    const [supportDataState,setSupportDataState] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const [createdAt,setCreatedAt] = useState(null);
    const [mail,setMail] = useState(null);
    const [message,setMessage] = useState(null);
    const [phoneNumber,setPhoneNumber] = useState(null);
    const [title,setTitle] = useState(null);

    const getTickets = async () => {
        setLoading(true)
        try {
            const querySnapshot = await getDocs(collection(db, "support"));
            const supportData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            }));
            setSupportDataState(supportData);
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

    useEffect(() => {
        if(supportTriggerInner != 0 ){
            getTickets();
        }
    }, [supportTriggerInner])

    return(
        <>
            <Modal style={customStyles} isOpen={modalOpen}>
                <div className="flex flex-col">
                    <div className="flex justify-end">
                        <img src={Close} alt="Close Button" className="w-[45px]" onClick={() => setModalOpen(!modalOpen)} />
                    </div>
                    <div className="flex flex-col">
                        <p className="inter-400 text-white">E-Posta: <span className="inter-700"> {mail}</span></p>
                        <p className="inter-400 text-white">Telefon: <span className="inter-700"> {phoneNumber}</span></p>
                        <p className="inter-400 text-white">Konu: <span className="inter-700"> {title}</span></p>
                        <p className="inter-400 text-white">Mesaj: <span className="inter-700"> {message}</span></p>
                        <p className="inter-400 text-white">Şu tarihte gönderildi: <span className="inter-700"> {createdAt}</span></p>
                    </div>
                </div>
            </Modal>
            <div className="flex flex-col items-center">
                    <div className="flex flex-col items-center mt-6">
                        <p className="inter-600 text-white text-4xl text-2xl sm:text-start text-center">Destek Biletleri</p>
                    </div>
                    {loading == "0,0,0" ? 
                        <>
                            <div className="fixed h-screen w-screen bg-black flex items-center justify-center z-10">
                                    <div className="w-[300px] h-[5px] rounded-lg bg-gray-800">
                                        <div className={`h-full transition-all rounded-lg bg-amber-500 duration-300 ${loading == "0,0,0" ? "w-[0px]" : loading == "0,0,1" ? "w-1/3" : loading == "0,1,1" ? "w-2/3" : loading == "1,1,1" ? "w-full" : "w-1/2"}`}>
                                        </div>
                                    </div>
                            </div>
                        </> : 
                        <>
                            <div className="flex flex-col gap-4 mt-10">
                                {supportDataState && supportDataState.map((user,key) => (
                                        <div className="flex border border-amber-600 rounded-lg justify-between px-5 items-center  select-none sm:w-[600px] w-[330px]" key={key}>
                                            <p className="my-3 inter-500 text-white sm:text-xl">{user.mail}</p>
                                            <div className="flex items-center">
                                                <button
                                                    className="bg-amber-500 py-1 rounded-lg text-white px-3 inter-500 outline-0"
                                                    onClick={() => {
                                                        setModalOpen(!modalOpen);
                                                        setTitle(user.title);
                                                        setMail(user.mail);
                                                        setMessage(user.message);
                                                        setPhoneNumber(user.phoneNumber);
                                                        setCreatedAt(user.createdAt);
                                                    }}
                                                >
                                                    ...
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </>
                    }
            </div>
        </>
    )
}

export default SupportMain