import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../Firebase/Firebase";
import toast from "react-hot-toast";
import Modal from 'react-modal';
import Close from "../../images/closeWhite.svg";
import "../../css/Loading.css";
import "../../css/AdminPanel.css";

const Main = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);

    const [userId, setUserId] = useState("");
    const [username, setUsername] = useState("");
    const [userInstagram, setUserInstagram] = useState("");
    const [userPhone, setUserPhone] = useState("");
    const [userJoinedAt, setUserJoinedAt] = useState("");
    const [userConvertedDate, setConvertedDate] = useState("");
    const [keepMoney, setKeepMoney] = useState("");

    useEffect(() => {
        fetchEarlyAccessUsers();
    }, []);

    useEffect(() => {
        if (userJoinedAt !== "") {
            const date = new Date(userJoinedAt);
            const formattedDate = new Intl.DateTimeFormat('tr-TR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            }).format(date);
            setConvertedDate(formattedDate);
        }
    }, [userJoinedAt]);

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

    const fetchEarlyAccessUsers = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "earlyAccessUsers"));
            const usersList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setUsers(usersList);
            setLoading(false);
        } catch (error) {
            console.error(error);
            toast.error("Veriler çekilirken bir sorun oluştu, lütfen geliştirici ile iletişime geçin");
        }
    };

    const handleCheckboxChange = async (userId, isChecked) => {
        try {
            const userRef = doc(db, "earlyAccessUsers", userId);
            await updateDoc(userRef, {
                isChecked: !isChecked,
            });
            fetchEarlyAccessUsers(); // Verileri yeniden çek
        } catch (error) {
            console.error("Checkbox durumu güncellenirken hata oluştu: ", error);
        }
    };

    return (
        <>
            <Modal style={customStyles} isOpen={modalOpen}>
                <div className="flex flex-col">
                    <div className="flex justify-end">
                        <img src={Close} alt="Close Button" className="w-[45px]" onClick={() => setModalOpen(!modalOpen)} />
                    </div>
                    <div className="flex flex-col">
                        <p className="inter-400 text-white">ID: <span className="inter-700"> {userId}</span></p>
                        <p className="inter-400 text-white">Kullanıcı Adı: <span className="inter-700"> {username}</span></p>
                        <p className="inter-400 text-white">Instagram: <span className="inter-700"> {userInstagram}</span></p>
                        <p className="inter-400 text-white">Telefon Numarası: <span className="inter-700"> {userPhone}</span></p>
                        <p className="inter-400 text-white">
                            Şu kadar parasını ayırabilir:{" "}
                            <span className="inter-700">
                                {keepMoney ? `${keepMoney.label}` : "Veri henüz kaydedilmedi"}
                            </span>
                        </p>
                        <p className="inter-400 text-white">{userConvertedDate}'de katıldı.</p>
                    </div>
                </div>
            </Modal>
            <div className="flex flex-col p-5 w-full items-center">
                <p className="inter-600 text-white text-4xl text-2xl sm:text-start text-center">Erken erişim üyeleri</p>
                <div className="flex flex-col gap-4 mt-5 items-center sm:w-[600px] w-[330px] h-spec-admin overflow-auto">
                    {loading ? (
                        <div className="loader"></div>
                    ) : users && users.length > 0 ? (
                        users
                            .sort((a, b) => (b.subscribedAt || 0) - (a.subscribedAt || 0))
                            .map((user) => (
                                <div
                                    className="flex border border-amber-600 rounded-lg justify-between px-5 items-center w-full select-none"
                                    key={user.id}
                                >
                                    <p className="my-3 inter-500 text-white sm:text-xl">{user.name}</p>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={user.isChecked || false}
                                            onChange={() => handleCheckboxChange(user.id, user.isChecked)}
                                            className="mr-2 w-[25px] h-[25px] rounded-2xl outline-0"
                                        />
                                        <button
                                            className="bg-amber-500 py-1 rounded-lg text-white px-3 inter-500 outline-0"
                                            onClick={() => {
                                                setModalOpen(!modalOpen);
                                                setUsername(user.name);
                                                setUserId(user.id);
                                                setUserInstagram(user.instagram);
                                                setUserPhone(user.phone);
                                                setUserJoinedAt(user.subscribedAt);
                                                setKeepMoney(user.moneyKeep || "");
                                            }}
                                        >
                                            ...
                                        </button>
                                    </div>
                                </div>
                            ))
                    ) : (
                        <p className="text-white">Henüz kullanıcı bulunamadı.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Main;