const Welcome = () => {
  return (
    <section className="w-full bg-slate-400 relative min-h-[300px] sm:min-h-[700px]  py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        <div className="relative w-full h-[390px] flex items-start lg:items-center">
          <img
            src="https://i.pinimg.com/originals/83/34/ae/8334aee26e027fb348be0a0253452784.jpg"
            alt="img"
            className="w-full h-full md:h-[630px] bottom-7 md:mt-60 object-cover rounded-3xl shadow-[2px_-2px_21px_0_rgba(146,247,0,0.29)]"
          />

          <div
            className="absolute top-40 left-5 md:mr-[50px] sm:ml-[60px] md:mt-[50px]
                   flex flex-col items-start gap-1 sm:gap-4 md:gap-5 
                   text-amber-50"
          >
            <h1 className="font-roboto font-semibold text-xl sm:text-xl md:text-3xl lg:text-5xl xl:text-6xl leading-snug">
              Your extreme hike <br />
              to Asian Patagonia
            </h1>
            <h3 className="font-roboto font-medium text-[10px] sm:text-xl md:text-sm lg:text-xl xl:text-2xl leading-snug mt-2">
              Discover untouched mountains, <br />
              crystal lakes, and the hospitality of <br />
              Central Asia’s hidden gem.
            </h3>
            <button className="font-roboto font-medium text-sm sm:text-base md:text-[12] ml-1 lg:text-xl w-36 sm:w-44 md:w-37 lg:w-60 h-[22px] sm:h-12 md:h-12 rounded-xl bg-[#d9d9d97e] sm:bg-[#d9d9d950] mt-3 sm:mt-4 mx-auto">
              Plan Your Trip
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
