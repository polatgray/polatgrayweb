import { useEffect, useState, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../Firebase/Firebase"; 
import { LanguageContext } from "../../Context/LanguageContext";
import toast from "react-hot-toast";

const CheckPhone = () => {
  const [searchParams] = useSearchParams();
  const phoneResetKey = searchParams.get("p");
  const navigate = useNavigate();
  const {language} = useContext(LanguageContext);
  const [newPhone, setNewPhone] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!phoneResetKey) {
      navigate("/");
    }
  }, []);

  const handleSave = async () => {
    if (!newPhone) {
      toast.error(language == "en" ? "The number cannot be empty.": "Numara boş kalamaz")
      return;
    }

    console.log(phoneResetKey)
    setLoading(true);
    try {
      const usersRef = collection(db, "earlyAccessUsers");
      const q = query(usersRef, where("phoneResetKey", "==", phoneResetKey));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log(querySnapshot)
        toast.error(language == "en" ? "There is a technical problem, please try again later." : "Teknik bir sorun var, lütfen sonra tekrar deneyin.")
        setLoading(false);
        return;
      }

      const userDoc = querySnapshot.docs[0];
      const userRef = userDoc.ref;

      await updateDoc(userRef, {
        phone: newPhone,
      });

      toast.success(language == "en" ? "Your number has been updated!" : "Numaran güncellendi!")
    } catch (err) {
      console.error(err);
      toast.error(language == "en" ? "There is a technical problem, please try again later." : "Teknik bir sorun var, lütfen sonra tekrar deneyin.")

    }
    setLoading(false);
  };

  return (
    <div className="flex h-screen w-full flex-col justify-center items-center bg-black text-white">
      <p className="text-2xl mb-4">Telefon numaranı buradan güncelleyebilirsin:</p>
      <input
        type="text"
        value={newPhone}
        onChange={(e) => setNewPhone(e.target.value)}
        className="p-2 rounded-lg border bg-black border-amber-400 my-4 w-64 text-center"
        placeholder="Yeni Telefon Numaran"
      />
      <button
        onClick={handleSave}
        disabled={loading}
        className="px-6 py-3 rounded-lg bg-amber-500 text-xl disabled:opacity-50"
      >
        {loading ? "Kaydediliyo..." : "Kaydet"}
      </button>
    </div>
  );
};

export default CheckPhone;
