/* eslint-disable @next/next/no-img-element */
const Welcome = () => {
  return (
    <section className="relative w-full h-[60vh] md:h-[90vh] bg-slate-400 py-8">
      <div className="container mx-auto h-full px-4 sm:px-6 lg:px-16">
        <div className="relative h-full w-full rounded-3xl overflow-hidden shadow-[2px_-2px_21px_0_rgba(146,247,0,0.29)]">

          {/* Background image */}
          <img
            src="https://i.pinimg.com/originals/83/34/ae/8334aee26e027fb348be0a0253452784.jpg"
            alt="Asian Patagonia"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-center px-4 sm:px-8 lg:px-16 text-amber-50 max-w-2xl">
            <h1 className="font-roboto font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight">
              Your extreme hike <br />
              to Asian Patagonia
            </h1>

            <p className="font-roboto font-medium text-sm sm:text-base md:text-lg lg:text-xl mt-4 leading-relaxed">
              Discover untouched mountains, <br />
              crystal lakes, and the hospitality of <br />
              Central Asia’s hidden gem.
            </p>

            <button className="mt-6 w-40 sm:w-48 lg:w-60 h-10 sm:h-12 rounded-xl 
                               bg-white/30 hover:bg-white/40 transition 
                               text-sm sm:text-base lg:text-lg font-medium backdrop-blur">
              Plan Your Trip
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Welcome;
