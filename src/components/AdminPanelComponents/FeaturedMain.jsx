import { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase/Firebase"; // db import doğru olcak reis
import Delete from "../../images/delete.svg"


const FeaturedMain = () => {
    const [featuredUsers, setFeaturedUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeaturedUsers = async () => {
            try {
                const featuredCollectionRef = collection(db, "featuredUsers");
                const featuredSnapshot = await getDocs(featuredCollectionRef);

                // Belirli id'leri toplayacağımız array
                let idList = [];

                featuredSnapshot.docs.forEach(docSnap => {
                    const data = docSnap.data();

                    if (data?.id) {
                        // Eğer dökümanın içinde 'id' fieldı varsa onu al
                        idList.push(data.id);
                    } else {
                        // Yoksa döküman adını kullan
                        idList.push(docSnap.id);
                    }
                });

                console.log("Toplanan id'ler aq:", idList);

                // Şimdi earlyAccessUsers'dan bu id'leri çekelim
                const earlyAccessPromises = idList.map(async (id) => {
                    const userDocRef = doc(db, "earlyAccessUsers", id);
                    const userDocSnap = await getDoc(userDocRef);

                    if (userDocSnap.exists()) {
                        console.log(userDocSnap.data())
                        return { id: userDocSnap.id, ...userDocSnap.data() };
                    } else {
                        console.warn("earlyAccess'te bulunamadı kanka:", id);
                        return null;
                    }
                });

                const earlyAccessUsersData = await Promise.all(earlyAccessPromises);
                const validUsers = earlyAccessUsersData.filter(user => user !== null);

                setFeaturedUsers(validUsers);
            } catch (error) {
                console.error("Veri çekilirken sıçtık pampa:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedUsers();
    }, []);

    if (loading) return <div className="text-white">Loading...</div>;

    return (
        <div>
  {featuredUsers.length > 0 ? (
    featuredUsers.map(user => (
      <div
        key={user.id}
        className="flex border border-amber-600 rounded-lg justify-between px-5 items-center w-full select-none my-2"
      >
        <p className="my-3 inter-500 text-white sm:text-xl">
          {user.name ?? "İsim yok aq"}
        </p>
        <div className="flex items-center gap-4">
          {/* Delete ikon */}
          <img
            src={Delete}
            className="bg-red-500 hover:bg-red-600 p-2 rounded-lg transition-all duration-300 w-[40px]"
            alt="Delete"
          />
          {/* Checkbox */}
          <input
            type="checkbox"
            checked={user.isChecked || false}
            className="mr-2 w-[25px] h-[25px] rounded-2xl outline-0"
          />
          {/* Detay butonu */}
          <button
            className="bg-amber-500 py-1 rounded-lg text-white px-3 inter-500 outline-0"
          >
            ...
          </button>
        </div>
      </div>
    ))
  ) : (
    <p className="text-white">Hiç kullanıcı bulunamadı amk...</p>
  )}
</div>

    );
};

export default FeaturedMain;
