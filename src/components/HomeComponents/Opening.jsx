import "../../css/Opening.css";

const Opening = () => {
    return (
        <div className="fixed w-full h-full bg-black z-20 flex items-center justify-center">
            <div className="relative flex flex-col items-center justify-center">
                <p className="animated-text sm:text-9xl text-7xl pg-text ">PG</p>
                <p className="dm-serif-text-regular text-white sm:text-2xl text-2xl px-2 animated-text animated-text-opening-label text-center">World’s Best Charismatic Millionaire</p>
            </div>
        </div>
    );
};

export default Opening;
