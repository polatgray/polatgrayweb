import Logo from "../../images/logo3.svg"

const siteBlocked = () => {
    return(
        <>
            <div className="flex fixed justify-center items-center h-screen w-full gap-8 bg-white">
                <img src={Logo} className="w-[80px]" alt="Seku Software Logo" />
                <div className="bg-gray-900 w-[3px] rounded-lg h-[60px]"></div>
                <div className="flex flex-col gap-3">
                    <p className="inter-600 text-3xl">Bu siteye erişim şu anda mevcut değil.</p>
                    <p className="inter-500 text-2xl">Access to this site is currently unavailable.</p>
                </div>
            </div>
        </>
    )
}

export default siteBlocked