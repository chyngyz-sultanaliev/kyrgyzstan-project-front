import Image from "next/image";
import Map from "../../../../public/footer_logo.png";
import insta from "../../../../public/icon_ista.svg";
import fac from "../../../../public/icon_fac.svg";
import wk from "../../../../public/Main.svg";
import em from "../../../../public/undefined.png";

export default function Footer() {
  return (
    <footer className="text-white py-8 bg-gradient-to-r from-[#3C5F63] via-[#5B9096] to-[#3B8C95]">
      <div className="container mx-auto px-4 grid grid-cols-1 grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
        {/* Logo + Social + Map */}
        <div className="space-y-6">
          <h1 className="text-3xl sm:text-4xl font-semibold leading-tight">
            Kyrgyzstan <br /> Tourism <br /> Industry
          </h1>

          {/* Соц. сети */}
          <div className="flex gap-4">
            <Image src={insta} alt="Instagram" width={30} height={30} />
            <Image src={fac} alt="Facebook" width={30} height={30} />
            <Image src={wk} alt="Whatsapp" width={30} height={30} />
            <Image src={em} alt="Email" width={30} height={30} />
          </div>

          {/* Карта/логотип */}
          <div className="w-full max-w-[200px]">
            <Image src={Map} alt="Kyrgyzstan map" className="w-full h-auto" />
          </div>
        </div>

        {/* Tour */}
        <div>
          <h3 className="font-semibold text-2xl mb-4">Tour</h3>
          <ul className="space-y-2 text-lg sm:text-xl">
            <li>Horseback riding</li>
            <li>Group tours</li>
            <li>Excursions</li>
            <li>Mountaineering</li>
          </ul>
        </div>

        {/* Car */}
        <div>
          <h3 className="font-semibold text-2xl mb-4">Car</h3>
          <ul className="space-y-2 text-lg sm:text-xl">
            <li>Passenger car</li>
            <li>Off-Road car</li>
            <li>Minibus car</li>
            <li>Bus car</li>
          </ul>
        </div>

        {/* Hotel */}
        <div>
          <h3 className="font-semibold text-2xl mb-4">Hotel</h3>
          <ul className="space-y-2 text-lg sm:text-xl">
            <li>Family and cozy</li>
            <li>Bestsellers</li>
            <li>For weddings</li>
            <li>Swimming pool</li>
            <li>Sauna</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
