import "../../css/Opening.css";

const Opening = () => {
    return (
        <div className="fixed w-full h-full bg-black z-20 flex items-center justify-center">
            <div className="relative flex flex-col items-center justify-center">
                <p className="animated-text text-9xl pg-text ">PG</p>
                <p className="dm-serif-text-regular text-white sm:text-2xl text-lg animated-text animated-text-opening-label text-center">The Best <strong> Charismatic Millionaire </strong> in the World</p>
            </div>
        </div>
    );
};

export default Opening;
