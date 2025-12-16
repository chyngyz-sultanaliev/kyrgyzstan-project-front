import Image from "next/image";
import Link from "next/link";
import insta from "../../../../public/icon_ista.svg";
import fac from "../../../../public/icon_fac.svg";
import wk from "../../../../public/Main.svg";
import em from "../../../../public/undefined.png";

export default function Footer() {
  const tourLinks = [
    { name: "Horseback riding", href: "/tour/horseback" },
    { name: "Group tours", href: "/tour/group" },
    { name: "Excursions", href: "/tour/excursions" },
    { name: "Mountaineering", href: "/tour/mountaineering" },
  ];

  const carLinks = [
    { name: "Passenger car", href: "/car/passenger" },
    { name: "Off-Road car", href: "/car/offroad" },
    { name: "Minibus car", href: "/car/minibus" },
    { name: "Bus car", href: "/car/bus" },
  ];

  const hotelLinks = [
    { name: "Family and cozy", href: "/hotel/family" },
    { name: "Bestsellers", href: "/hotel/bestsellers" },
    { name: "For weddings", href: "/hotel/weddings" },
    { name: "Swimming pool", href: "/hotel/pool" },
    { name: "Sauna", href: "/hotel/sauna" },
  ];

  const socialLinks = [
    { icon: insta, alt: "Instagram", href: "https://instagram.com" },
    { icon: fac, alt: "Facebook", href: "https://facebook.com" },
    { icon: wk, alt: "WhatsApp", href: "https://whatsapp.com" },
    { icon: em, alt: "Email", href: "mailto:info@kyrgyzstan-tourism.kg" },
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#3C5F63] via-[#5B9096] to-[#3B8C95]">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="relative container mx-auto px-4 py-6 sm:py-10">
        <div className="grid grid-cols-1 grid-cols-1 grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 ">
          {/* Logo + Social + Map */}
          <div className="space-y-6 lg:space-y-8">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-white mb-2">
                Kyrgyzstan
                <br />
                Tourism
                <br />
                Industry
              </h1>
              <p className="text-white/80 text-sm mt-3">
                Discover the beauty of Kyrgyzstan
              </p>
            </div>

            {/* Social Media */}
            <div>
              <p className="text-white/90 text-sm font-medium mb-3 uppercase tracking-wider">
                Follow Us
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.alt}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110 group"
                  >
                    <Image
                      src={social.icon}
                      alt={social.alt}
                      width={20}
                      height={20}
                      className="opacity-90 group-hover:opacity-100"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Tour */}
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6">
              Tour
            </h3>
            <ul className="space-y-3">
              {tourLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-white text-base sm:text-lg transition-colors inline-flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-white transition-all mr-0 group-hover:mr-2"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Car */}
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6">
              Car
            </h3>
            <ul className="space-y-3">
              {carLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-white text-base sm:text-lg transition-colors inline-flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-white transition-all mr-0 group-hover:mr-2"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hotel */}
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6">
              Hotel
            </h3>
            <ul className="space-y-3">
              {hotelLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-white text-base sm:text-lg transition-colors inline-flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-white transition-all mr-0 group-hover:mr-2"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 pt-6 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-white/70 text-sm">
            <p>© 2024 Kyrgyzstan Tourism Industry. All rights reserved.</p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
