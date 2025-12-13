"use client";

const Detail = () => {
  const fake = {
    name: "Toyota Rav4",
    image: "/car.png",
    seats: 4,
    withDriver: false,
    description:
      "Ошол мынча красивыйга көзү түшүп, дептир у жигит — ооой тэб не пошутылся",
    details: {
      engine: "Petrol",
      transmission: "Automatic",
      places: "4 places",
      year: "2020 year",
      volume: "2.3L",
      drive: "4WD",
      minAge: 18,
      price: 5500,
    },
    rental: [
      { period: "1-2 days", price: "1180 som" },
      { period: "3-6 days", price: "1180 som" },
      { period: "7-14 days", price: "1180 som" },
      { period: "From 25 days", price: "1180 som" },
    ],
  };

  return (
    <div className="w-full flex flex-col gap-16 p-6 md:p-14">

      {/* TOP SECTION */}
      <div className="flex flex-wrap gap-6 justify-center md:justify-between w-full">

        {/* Left Image */}
        <div className="w-[500px] h-[300px] bg-white rounded-xl shadow-xl overflow-hidden flex items-center justify-center">
          <img
            src={fake.image}
            alt={fake.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Info */}
        <div className="w-[500px] bg-white rounded-xl shadow-xl p-6 flex flex-col gap-4">
          <h2 className="text-xl font-semibold">{fake.name}</h2>
          <p className="text-gray-600 text-sm">{fake.description}</p>

          <div className="text-sm grid grid-cols-2 gap-y-1 mt-3">
            <p>{fake.details.engine}</p>
            <p className="text-right">{fake.details.transmission}</p>

            <p>{fake.details.places}</p>
            <p className="text-right">{fake.details.year}</p>

            <p>{fake.details.volume}</p>
            <p className="text-right">{fake.details.drive}</p>

            <p>Min driver age: {fake.details.minAge}</p>
          </div>

          <p className="font-semibold mt-3">
            {fake.details.price} som/per day
          </p>

          <button className="w-full bg-teal-700 text-white py-2 rounded-xl mt-2">
            Book
          </button>
        </div>
      </div>

      {/* Rental Cost Table */}
      <div className="w-full max-w-4xl mx-auto">
        <h3 className="font-semibold text-lg mb-3">{fake.name} Rental Cost</h3>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Rental period</th>
              <th className="text-right py-2">Price per day</th>
            </tr>
          </thead>
          <tbody>
            {fake.rental.map((row, i) => (
              <tr key={i} className="border-b">
                <td className="py-2">{row.period}</td>
                <td className="py-2 text-right">{row.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bid Form */}
      <div className="w-full max-w-xl mx-auto flex flex-col items-center gap-6">
        <h3 className="text-xl font-semibold">Bid</h3>
        <p className="text-gray-500 text-center text-sm">
          Submit a request for selection and reduce your search time
        </p>

        <input
          type="text"
          placeholder="Name"
          className="w-full border rounded-full py-3 px-5 text-sm"
        />

        <input
          type="text"
          placeholder="+996 ___ __ __ __"
          className="w-full border rounded-full py-3 px-5 text-sm"
        />

        <input
          type="number"
          placeholder="Number of people"
          className="w-full border rounded-full py-3 px-5 text-sm"
        />

        <div className="flex w-full gap-4">
          <input
            type="text"
            placeholder="Entry"
            className="w-1/2 border rounded-full py-3 px-5 text-sm"
          />
          <input
            type="text"
            placeholder="Departure"
            className="w-1/2 border rounded-full py-3 px-5 text-sm"
          />
        </div>

        <button className="bg-teal-700 text-white py-3 px-10 rounded-full text-sm">
          Leave a request
        </button>
      </div>
    </div>
  );
};

export default Detail;
