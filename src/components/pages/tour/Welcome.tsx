import Image from "next/image";
import aska from "../../../../public/images/touraska.png";

const Welcome = () => {
  return (
    <section className="bg-slate-400  h-202">
      <div className="relative flex items-center justify-center ">
        <div
          className=" absolute mr-175 mt-80 flex flex-col gap-4 text-amber-50  object-cover rounded-xl 
           transition-transform duration-500 ease-in-out 
           hover:rotate-y-12 hover:rotate-x-6 z-auto"
        >
          <h1 className="font-roboto font-medium text-[54px] leading-none tracking-normal">
            Your extreme hike <br />
            to Asian Patagonia
          </h1>
          <h3 className="font-['Roboto'] font-medium text-[30px] leading-[100%] tracking-[0%]">
            Discover untouched mountains, <br />
            crystal lakes, and the hospitality of <br />
            Central Asia’s hidden gem.
          </h3>
          <button className="font-['Roboto'] font-medium text-[30px] leading-[100%] tracking-[0%] w-60 h-15 rounded-2xl bg-[#D9D9D940] ">
            Plan Your Trip
          </button>
        </div>
        <Image
          src={aska}
          alt="img"
          className="w-321 h-180  object-cover rounded-3xl transform transition-transform duration-700 ease-in-out hover:rotate-y-3 hover:scale-105"
        />
      </div>
    </section>
  );
};

export default Welcome;
