import { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore"; // yeni importlar eklendi reiss
import { db } from "../Firebase/Firebase"; 
import Delete from "../../images/delete.svg";
import Modal from "react-modal";
import Close from "../../images/closeWhite.svg";


const FeaturedMain = () => {
    const [featuredUsers, setFeaturedUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [userId, setUserId] = useState("");
    const [username, setUsername] = useState("");
    const [userInstagram, setUserInstagram] = useState("");
    const [userPhone, setUserPhone] = useState("");
    const [userJoinedAt, setUserJoinedAt] = useState("");
    const [userConvertedDate, setConvertedDate] = useState("");
    const [userMail,setUserMail] = useState("");
    const [keepMoney, setKeepMoney] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [phoneResetKeyState,setPhoneResetKeyState] = useState("");

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
        const fetchFeaturedUsers = async () => {
            try {
                const featuredCollectionRef = collection(db, "featuredUsers");
                const featuredSnapshot = await getDocs(featuredCollectionRef);

                let idList = [];

                featuredSnapshot.docs.forEach(docSnap => {
                    const data = docSnap.data();

                    if (data?.id) {
                        idList.push(data.id);
                    } else {
                        idList.push(docSnap.id);
                    }
                });

                console.log("Toplanan id'ler aq:", idList);

                const earlyAccessPromises = idList.map(async (id) => {
                    const userDocRef = doc(db, "earlyAccessUsers", id);
                    const userDocSnap = await getDoc(userDocRef);

                    if (userDocSnap.exists()) {
                        return { id: userDocSnap.id, ...userDocSnap.data() };
                    } else {
                        console.warn("earlyAccess'te bulunamadı kanka:", id);
                        return null;
                    }
                });

                const earlyAccessUsersData = await Promise.all(earlyAccessPromises);
                const validUsers = earlyAccessUsersData.filter(user => user !== null);

                // Burda idList'i de saklıyoruz çünkü featuredUsers'da lazım olacak
                const featuredWithCheckStatus = validUsers.map((user, index) => ({
                    ...user,
                    featuredDocId: featuredSnapshot.docs[index].id, // o featuredUsers koleksiyonundaki doküman ID'si
                    isChecked: featuredSnapshot.docs[index].data()?.isChecked || false,
                }));

                setFeaturedUsers(featuredWithCheckStatus);
            } catch (error) {
                console.error("Veri çekilirken sıçtık pampa:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedUsers();
    }, []);

    const handleDelete = async (featuredDocId) => {
        try {
            await deleteDoc(doc(db, "featuredUsers", featuredDocId));
            setFeaturedUsers(prevUsers => prevUsers.filter(user => user.featuredDocId !== featuredDocId));
            console.log("Silindi kanka");
        } catch (error) {
            console.error("Silerken sıçtık reis:", error);
        }
    };

    const handleCheckboxChange = async (featuredDocId, checked) => {
        try {
            const userDocRef = doc(db, "featuredUsers", featuredDocId);
            await updateDoc(userDocRef, {
                isChecked: checked
            });

            setFeaturedUsers(prevUsers =>
                prevUsers.map(user =>
                    user.featuredDocId === featuredDocId ? { ...user, isChecked: checked } : user
                )
            );

            console.log("Checkbox durumu güncellendi pamppa:", checked);
        } catch (error) {
            console.error("Checkbox güncellenirken sıçtık aq:", error);
        }
    };

    if (loading) return <div className="text-white">Loading...</div>;

    return (
        <div className="flex w-full flex-col items-center">
          <Modal style={customStyles} isOpen={modalOpen}>
                <div className="flex flex-col">
                    <div className="flex justify-end">
                        <img src={Close} alt="Close Button" className="w-[45px]" onClick={() => setModalOpen(!modalOpen)} />
                    </div>
                    <div className="flex flex-col">
                        <p className="inter-400 text-white">ID: <span className="inter-700"> {userId}</span></p>
                        <p className="inter-400 text-white">Kullanıcı Adı: <span className="inter-700"> {username}</span></p>
                        <p className="inter-400 text-white">Instagram: <span className="inter-700"> {userInstagram}</span></p>
                        <p className="inter-400 text-white">E-Posta: <span className="inter-700"> {userMail}</span></p>
                        <p className="inter-400 text-white">phoneResetKey: <span className="inter-700"> {phoneResetKeyState}</span></p>
                        <p className="inter-400 text-white">Telefon Numarası: <span className="inter-700"> {userPhone}</span></p>
                        <p className="inter-400 text-white">
                            Şu kadar parasını ayırabilir:{" "}
                            <span className="inter-700">
                                {keepMoney ? `${keepMoney.label}` : "Veri henüz kaydedilmedi"}
                            </span>
                        </p>
                    </div>
                </div>
            </Modal>
            <div className="w-[600px]">
              <p className="text-2xl inter-600 text-white text-center my-4 mb-8">Özel kullanıcılar</p>
                {featuredUsers.length > 0 ? (
                    featuredUsers.map(user => (
                        <div
                            key={user.featuredDocId}
                            className="flex border border-amber-600 rounded-lg justify-between px-5 items-center w-full select-none my-2"
                        >
                            <p className="my-3 inter-500 text-white sm:text-xl">
                                {user.name ?? "İsim yok aq"}
                            </p>
                            <div className="flex items-center gap-4">
                                <img
                                    src={Delete}
                                    onClick={() => handleDelete(user.featuredDocId)}
                                    className="bg-red-500 hover:bg-red-600 p-2 rounded-lg transition-all duration-300 w-[40px] cursor-pointer"
                                    alt="Delete"
                                />
                                <input
                                    type="checkbox"
                                    checked={user.isChecked || false}
                                    onChange={(e) => handleCheckboxChange(user.featuredDocId, e.target.checked)}
                                    className="mr-2 w-[25px] h-[25px] rounded-2xl outline-0 cursor-pointer"
                                />
                                <button onClick={() => {setModalOpen(!modalOpen);
                                                        setUsername(user.name);
                                                        setUserId(user.id);
                                                        setUserInstagram(user.instagram);
                                                        setUserPhone(user.phone);
                                                        setUserJoinedAt(user.subscribedAt);
                                                        setKeepMoney(user.moneyKeep || "");
                                                        setUserMail(user.email)
                                                        setPhoneResetKeyState(user.phoneResetKey || "Bu kullanıcı eski, anahtar verilmedi.")}} className="bg-amber-500 py-1 rounded-lg text-white px-3 inter-500 outline-0">
                                    ...
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-white">Hiç kullanıcı bulunamadı</p>
                )}
            </div>
        </div>
    );
};

export default FeaturedMain;
