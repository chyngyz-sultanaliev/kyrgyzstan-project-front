"use client";

import Review from "./Review";

const Detail = () => {
  return (
    <>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10">
        {/* ===== TOP ===== */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* IMAGE */}
          <div className="md:w-1/2 bg-[#E5E5E5] rounded-2xl shadow flex items-center justify-center p-6">
            <div className="w-full max-w-[420px] aspect-[16/10] bg-gray-300 rounded-xl" />
          </div>

          {/* INFO */}
          <div className="md:w-1/2 bg-[#F1F1F1] rounded-2xl shadow p-6 flex flex-col justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold mb-2">
                Toyota Rav4
              </h1>

              <p className="text-sm text-gray-600 mb-6">
                Ыңгайлуу жана ишенимдүү кроссовер шаарда жана жолдон тышкары
                айдоо үчүн
              </p>

              <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600">
                <span>Fuel: Petrol</span>
                <span>Transmission: Automatic</span>
                <span>Seats: 4</span>
                <span>Year: 2020</span>
                <span>Engine: 2.5L</span>
                <span>Drive: 4WD</span>
                <span className="col-span-2">Minimum driver age: 18 years</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-8">
              <span className="text-xl font-semibold">5500 som / day</span>
              <button className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition">
                Book now
              </button>
            </div>
          </div>
        </div>

        {/* ===== DESCRIPTION ===== */}
        <div className="mt-14 max-w-3xl">
          <h2 className="text-lg font-semibold mb-3">Description</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Toyota Rav4 — бул шаарда да, тоолуу аймактарда да ишенимдүү
            колдонууга ылайыкташкан универсал кроссовер. Кең салону, үнөмдүү
            күйүүчү май керектөөсү жана 4WD системасы аны үй-бүлөлүк саякаттар
            жана узак жолдор үчүн мыкты тандоо кылат.
          </p>
        </div>

        {/* ===== GALLERY ===== */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold mb-4">Gallery</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-gray-300 rounded-xl" />
            ))}
          </div>
        </div>

        {/* ===== RENTAL COST ===== */}
        <div className="mt-14 max-w-xl">
          <h2 className="text-lg font-semibold mb-4">Rental cost</h2>

          <div className="border rounded-lg overflow-hidden text-sm">
            <div className="flex justify-between px-4 py-2 bg-gray-100 font-medium">
              <span>Period</span>
              <span>Price / day</span>
            </div>

            {["1–2 days", "3–6 days", "7–14 days", "from 26 days"].map(
              (label) => (
                <div
                  key={label}
                  className="flex justify-between px-4 py-2 border-t"
                >
                  <span>{label}</span>
                  <span>1100 som</span>
                </div>
              )
            )}
          </div>
        </div>

        {/* ===== INCLUDED / NOT INCLUDED ===== */}
        <div className="mt-14 grid sm:grid-cols-2 gap-10 max-w-3xl">
          <div>
            <h3 className="font-medium mb-3">Included</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>✔ Insurance</li>
              <li>✔ Child seat</li>
              <li>✔ Free cancellation</li>
              <li>✔ 24/7 support</li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-3">Not included</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>✖ Fuel</li>
              <li>✖ Driver services</li>
              <li>✖ штрафтар</li>
            </ul>
          </div>
        </div>

        {/* ===== CONDITIONS ===== */}
        <div className="mt-14 max-w-3xl">
          <h2 className="text-lg font-semibold mb-4">Rental conditions</h2>

          <ul className="text-sm text-gray-600 space-y-2">
            <li>• Passport or ID required</li>
            <li>• Deposit: 10 000 som</li>
            <li>• Fuel policy: same level</li>
            <li>• Daily mileage limit: 300 km</li>
            <li>• Smoking in car is prohibited</li>
          </ul>
        </div>

        {/* ===== TRUST ===== */}
        <div className="mt-16 bg-gray-100 rounded-2xl p-6 text-center">
          <p className="text-sm text-gray-700">
            ✔ 120+ successful rentals &nbsp; • &nbsp; ✔ Verified owner &nbsp; •
            &nbsp; ✔ Support 24/7
          </p>
        </div>

        {/* ===== BID FORM ===== */}
        <div className="mt-20 text-center">
          <h2 className="text-lg font-semibold">Bid</h2>
          <p className="text-sm text-gray-500 mt-2 mb-8">
            Leave a request and we will contact you
          </p>

          <div className="max-w-md mx-auto space-y-4">
            {["Name", "+996 ___ ___ ___", "Number of people"].map(
              (placeholder) => (
                <input
                  key={placeholder}
                  placeholder={placeholder}
                  className="
                w-full
                border
                rounded-full
                px-5 py-3
                text-sm
                outline-none
                focus:ring-2 focus:ring-teal-500
              "
                />
              )
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                placeholder="Entry"
                className="w-full border rounded-full px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-teal-500"
              />
              <input
                placeholder="Departure"
                className="w-full border rounded-full px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <button className="w-full bg-teal-600 text-white py-3 rounded-full hover:bg-teal-700 transition">
              Leave a request
            </button>
          </div>
        </div>
      </div>
      <Review />
    </>
  );
};

export default Detail;
