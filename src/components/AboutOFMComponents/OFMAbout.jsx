import "../../css/LearnAboutOFM.css"
import { useContext } from "react"
import { LanguageContext } from "../../Context/LanguageContext"

const OFMAbout = () => {

    const {language} = useContext(LanguageContext);

    return(
        <>
        <div className="flex items-center justify-center relative">
            <div className="flex flex-col items-center sm:px-12 px-6">
                <div className="flex flex-col items-center lg:mt-0 mt-5  mt-320vw-spec">
                    <p className="inter-600 text-white text-6xl animate-open-text sm:text-start text-center">{language == "en" ? <>What's <span className="animated-text">OFM</span>?</> : <><span className="animated-text">OFM</span> nedir?</>}</p>
                    <p className="text-white 2xl:w-[1200px] xl:w-[900px] lg:w-[600px] md:w-[500px]  inter-500 mt-5 animate-open-text">{language == "en" ? "An OnlyFans Management (OFM) is a professional who handles the day-to-day management and growth of an OnlyFans content creator's account. From creating tailored content strategies to maximizing subscriber engagement, the OFM ensures that the creator's brand remains relevant and profitable. They oversee social media marketing, promote the creator across platforms like Instagram, Twitter, and TikTok, and manage subscriber interactions to maintain a loyal fan base. Additionally, OFMs handle financial aspects such as subscription pricing, revenue tracking, and tax management. In some cases, they may also arrange for professional studio setups, including sourcing the right equipment, creating optimal shooting environments, and coordinating with photographers, makeup artists, and other professionals to ensure high-quality content production. Ultimately, an OFM takes care of the logistical, marketing, and operational side of the business, allowing content creators to focus solely on their craft and creative output." : "Bir OnlyFans Menajeri (OFM), bir OnlyFans içerik üreticisinin hesabının günlük yönetimi ve büyümesinden sorumlu profesyoneldir. Özel içerik stratejileri oluşturmak ve abone etkileşimini en üst düzeye çıkarmaktan, OFM, içerik üreticisinin markasının güncel ve kârlı kalmasını sağlar. Sosyal medya pazarlamasını yönetir, içerik üreticisini Instagram, Twitter ve TikTok gibi platformlarda tanıtır ve sadık bir hayran kitlesi oluşturmak için abone etkileşimlerini yönetir. Ayrıca, OFM'ler abonelik fiyatlandırması, gelir takibi ve vergi yönetimi gibi finansal işleri de üstlenir. Bazı durumlarda, profesyonel stüdyo kurulumları düzenleyebilir, doğru ekipman temin eder, optimal çekim ortamları yaratır ve kaliteli içerik üretimini sağlamak için fotoğrafçılar, makyaj artistleri ve diğer profesyonellerle koordinasyon sağlar. Sonuç olarak, bir OFM işin lojistik, pazarlama ve operasyonel tarafını üstlenerek içerik üreticilerinin sadece eserlerine ve yaratıcı çıktılarının üzerine odaklanmalarını sağlar."}</p>
                </div> 
                <div className="flex flex-col items-center mt-24">
                    <p className="inter-600 text-white text-6xl animate-open-text sm:text-start text-center">{language == "en" ? <>Why choose <span className="animated-text">OFM</span>?</> : <>Neden <span className="animated-text">OFM</span>'i seçmelisin?</>}</p>
                    <p className="text-white 2xl:w-[1200px] xl:w-[900px] lg:w-[600px] md:w-[500px] md:mt-8 mt-12 inter-500 mt-5 animate-open-text">{language == "en" ? "In today's digital age, managing an OnlyFans account is not just about creating content; it's about building a brand, growing a loyal audience, and maximizing your income. This is where an OnlyFans Manager (OFM) comes in, offering the perfect solution to streamline your efforts. With an OFM, you can save valuable time and energy by letting a professional handle the operational side of things—content strategy, marketing, subscriber engagement, and even managing your finances. They provide high-quality studio setups, professional photographers, and social media promotions, ensuring your content stands out and attracts more subscribers. This modern business model makes it easier than ever to achieve success, allowing you to focus purely on your creative work while an OFM takes care of everything else. In a world where online success can transform your life, an OFM is the ultimate shortcut to turning your passion into a profitable and sustainable career." : "Bugünün dijital çağında, bir OnlyFans hesabı yönetmek sadece içerik oluşturmakla ilgili değil; bir marka oluşturmak, sadık bir izleyici kitlesi büyütmek ve gelirini en üst düzeye çıkarmakla ilgilidir. İşte burada bir OnlyFans Menajeri (OFM) devreye girer ve çabalarınızı daha verimli hale getirmek için mükemmel bir çözüm sunar. Bir OFM ile, işin operasyonel tarafını—içerik stratejisi, pazarlama, abone etkileşimi ve hatta finans yönetimi gibi—profesyonellere bırakarak değerli zaman ve enerjinizden tasarruf edebilirsiniz. Yüksek kaliteli stüdyo kurulumları, profesyonel fotoğrafçılar ve sosyal medya tanıtımları sağlar, böylece içeriğiniz öne çıkar ve daha fazla abone çeker. Bu modern iş modeli, başarıya ulaşmayı her zamankinden daha kolay hale getirir ve OFM her şeyi hallederken sadece yaratıcı çalışmanıza odaklanmanızı sağlar. Online başarının hayatınızı dönüştürebileceği bir dünyada, OFM tutkunuzu kârlı ve sürdürülebilir bir kariyere dönüştürmenin nihai kısayoludur."}</p>
                </div> 
                {/* <div className="flex flex-col items-center mt-24">
                    <p className="inter-600 text-white text-6xl animate-open-text sm:text-start text-center">Watch a video</p>
                    <div className="bg-gray-600 md:w-[600px] w-[300px] md:h-[300px] h-[150px] mt-5 rounded-lg flex justify-center items-center">
                        <p className="inter-500 text-white">Video area</p>
                    </div>
                </div> */}
            </div>
        </div>
        </>
    )
}

export default OFMAbout