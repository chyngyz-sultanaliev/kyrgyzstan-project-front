const Welcome = () => {
  return (
    <section className="bg-slate-400 relative min-h-[80vh] py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        <div className="relative w-full h-[350px] sm:h-[450px] md:h-[500px] lg:h-[600px] flex items-start lg:items-center">
          <img
            src="https://i.pinimg.com/originals/83/34/ae/8334aee26e027fb348be0a0253452784.jpg"
            alt="img"
            className="w-full h-full object-cover rounded-3xl shadow-[2px_-2px_21px_0_rgba(146,247,0,0.29)]"
          />

          <div
            className="absolute top-6 sm:top-10 md:top-12 lg:top-16 xl:top-20
                          left-1/2 transform -translate-x-1/2 lg:left-16 lg:translate-x-0
                          flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-6
                          text-amber-50 text-center lg:text-left px-4 sm:px-6 lg:px-0
                          rounded-xl py-4 max-w-xl"
          >
            <h1 className="font-roboto font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-snug">
              Your extreme hike <br />
              to Asian Patagonia
            </h1>
            <h3 className="font-roboto font-medium text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-snug mt-2">
              Discover untouched mountains, <br />
              crystal lakes, and the hospitality of <br />
              Central Asia’s hidden gem.
            </h3>
            <button className="font-roboto font-medium text-sm sm:text-base md:text-lg lg:text-xl w-36 sm:w-44 md:w-52 lg:w-60 h-10 sm:h-12 md:h-14 rounded-2xl bg-[#D9D9D940] mt-3 sm:mt-4 mx-auto lg:mx-0">
              Plan Your Trip
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
