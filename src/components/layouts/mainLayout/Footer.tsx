import Image from "next/image";
import Map from "../../../../public/footer_logo.png";
import insta from "../../../../public/icon_ista.svg";
import fac from "../../../../public/icon_fac.svg";
import wk from "../../../../public/Main.svg";
import em from "../../../../public/undefined.png";

export default function Footer() {
  return (
    <footer className="text-white py-8 bg-[linear-gradient(90deg,#3C5F63_19.23%,#5B9096_63.46%,#3B8C95_100%)]">
      <div className="container relative max-full mx-auto grid grid-cols-1 md:grid-cols-4 gap-60">
        <div className="w-90">
          <div className="flex gap-10 items-end">
            <h1 className="text-4xl font-semibold leading-tight mb-4">
              Kyrgyzstan <br /> Tourism <br /> Industry
            </h1>
            <div className="flex gap-4  mb-6">
              <Image src={insta} alt="Kyrgyzstan map" />
              <Image src={fac} alt="Kyrgyzstan map" />
              <Image src={wk} alt="Kyrgyzstan map" />
              <Image src={em} alt="Kyrgyzstan map" />
            </div>
          </div>
          <div>
            <Image src={Map} alt="Kyrgyzstan map" />
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-2xl mb-4">Tour</h3>
          <ul className="space-y-2 text-xl">
            <li>Horseback riding </li>
            <li>Group tours </li>
            <li>Excursions</li>
            <li>Mountaineering</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-2xl mb-4">Car</h3>
          <ul className="space-y-2 text-xl">
            <li>Passenger car</li>
            <li>Off-Road car</li>
            <li>Minibus car</li>
            <li>Bus car</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-2xl mb-4">Hotel</h3>
          <ul className="space-y-2 text-xl">
            <li>Family and cozy</li>
            <li>Bestsellers</li>
            <li>For weddings </li>
            <li>Swimming pool</li>
            <li>Sauna</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
