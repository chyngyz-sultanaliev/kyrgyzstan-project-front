import Link from "next/link";
import Image from "next/image";
import Img from "../../../../public/footer_logo.png";
import Button from "@/components/ui/Button/Button";

const Header = () => {
  return (
    <header className="bg-[linear-gradient(90deg,#3C5F63_19.23%,#5B9096_63.46%,#3B8C95_100%)] py-4">
      <div className="container flex justify-between items-center">
        <div className="flex items-center gap-16 text-white">
          <div className="flex items-center gap-2 ">
            <Image src={Img} alt="Logo" width={100} height={80} />
            <h1 className="text-2xl font-semibold mb-2">
              Kyrgyzstan Tourism Industry
            </h1>
          </div>
          <Link className="text-white text-[20px]" href="/">
            Main
          </Link>
          <Link className="text-white text-[20px]" href="/tour">
            Tour
          </Link>
          <Link className="text-white text-[20px]" href="/car">
            Car
          </Link>
          <Link className="text-white text-[20px]" href="/hotel">
            Hotel
          </Link>
        </div>
        <Button variant="primary">Войти</Button>
      </div>
    </header>
  );
};

export default Header;
