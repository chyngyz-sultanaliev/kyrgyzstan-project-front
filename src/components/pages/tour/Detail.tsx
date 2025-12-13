"use client";
import { notFound, useParams } from "next/navigation";
import { SlArrowUp, SlArrowDown } from "react-icons/sl";
import { useState } from "react";
import ReviewForm from "./Review";

interface Tour {
  id: number;
  category: string;
  url: string;
  name: string;
  description: string;
  price: number;
  location?: string;
  metres?: string;
  walk?: string;
  car?: string;
  days?: string;
  seaLevel?: string;
  cost?: string;
}

const tourCategory = [
  // Group tours
  {
    id: 1,
    category: "Group tours",
    url: "https://silkwaytrips.com/wp-content/uploads/2025/01/Kel-Suu-lake-in-Kyrgyzstan-1.webp",
    name: "Kyrgyzstan Group Highlights",
    description:
      "Kyrgyzstan group highlights focus on immersive nomadic culture, stunning Tian Shan mountain landscapes, and Silk Road history, featuring experiences like staying in yurts, horseback riding, meeting eagle hunters, visiting Issyk-Kul Lake and Tash Rabat caravanserai, trekking to alpine lakes (Ala Kul), exploring ancient sites like Burana Tower, and engaging with local communities for authentic cultural immersion in vibrant markets and traditional homes",
    location: "Naryn, Kel-Suu Lake",
    metres: "3200 meters above sea level",
    walk: "3 km walk",
    car: "10 km by car",
    days: "2 Days",
    cost: "145.00 $",
    seaLevel: "345 km",
    price: 6000,
  },
  {
    id: 2,
    category: "Group tours",
    url: "https://kgcountry.com/wp-content/uploads/photo_5188163860861928453_w-600x700.jpg",
    name: "Central Kyrgyzstan Explorer",
    description:
      "Central Kyrgyzstan Explorer typically describes a tour or journey delving into the heart of Kyrgyzstan's stunning, mountainous landscapes, featuring highlights like ancient Silk Road sites (Burana Tower), nomadic culture in yurt camps at alpine lakes (Song-Kul), unique geology (Mars Canyon), historic caravanserai (Tash Rabat), and vibrant cities like Karakol, offering a mix of history, nature (Issyk-Kul), and authentic local experiences, often focusing on adventure and cultural immersion. ",
    location: "Chüy Region, Kegeti",
    metres: "2600 meters above sea level",
    walk: "4 km walk",
    car: "8 km by car",
    days: "2 Days",
    seaLevel: "345 km",
    cost: "150.00 $",
    price: 6000,
  },
  {
    id: 3,
    category: "Group tours",
    url: "https://kyrgyzguides.com/wp-content/uploads/2022/02/Supara.jpeg",
    name: "Cultural & Nature Group Tour",
    description:
      "Cultural & Nature Group Tour immerses travelers in a region's unique heritage and stunning landscapes, blending historical sites (ancient cities, temples, museums) with natural wonders (mountains, canyons, wildlife) through guided experiences like hikes, safaris, local workshops, and cultural performances, offering a balanced adventure with expert insights and small-group connections. These tours aim for authentic immersion, moving beyond tourist spots to experience local life, cuisine, traditions, and conservation efforts, often led by knowledgeable local guides for deeper understanding. ",
    location: "Osh Region, Supara",
    metres: "1800 meters above sea level",
    walk: "2 km walk",
    car: "5 km by car",
    days: "1 Day",
    seaLevel: "345 km",
    cost: "95.00 $",
    price: 6000,
  },
  {
    id: 4,
    category: "Group tours",
    url: "https://ecotour.kg/wp-content/uploads/toursbydate_slide_011.jpg",
    name: "Family Group Adventure",
    description:
      "A Family Group Adventure is a shared journey or activity where families travel or participate in exciting, often outdoor, experiences together, typically with other like-minded families, fostering bonding through age-appropriate challenges like hiking, kayaking, cultural exploration, or wildlife spotting, led by guides and designed for fun, connection, and creating lasting memories, often during school breaks. ",
    metres: "2300 meters above sea level",
    walk: "1 km walk",
    car: "7 km by car",
    days: "1 Day",
    seaLevel: "345 km",
    cost: "120.00 $",
    price: 6000,
  },

  // Horseback riding
  {
    id: 5,
    category: "Horseback riding",
    url: "https://yellowwoodadventures.com/storage/media/images/general/square_768/jabb7zex-653162586ecc5.jpeg",
    name: "Nomad Horseback Adventure",
    description:
      "A Nomad Horseback Adventure offers an immersive cultural and wilderness experience, typically in Central Asia (Kyrgyzstan, Mongolia) or Morocco, where you ride sturdy local horses through stunning landscapes (mountains, lakes, steppes, canyons) while staying in traditional yurts or with local families, exploring authentic nomadic life, ancient Silk Road routes, and enjoying hearty meals with English-speaking guides and local horsemen, suitable for various skill levels. ",
    location: "Naryn, Ak-Tal",
    metres: "2800 meters above sea level",
    walk: "1 km walk",
    car: "3 km by car",
    days: "1 Day",
    seaLevel: "345 km",
    cost: "85.00 $",
    price: 6000,
  },
  {
    id: 6,
    category: "Horseback riding",
    url: "https://www.equus-journeys.com/photos/1800x1200/kirghisztan-celestian-mountains-horseback-trails-equus-journeys-16-10801.jpg",
    name: "Mountain Trails Horseback",
    description:
      "Mountain Trails Horseback riding involves navigating natural-looking obstacles like logs, water, bridges, and steep terrain, emphasizing partnership, trust, and control between horse and rider, making it a versatile equestrian sport for all ages and breeds, focusing on finesse and confidence over speed. It ranges from simple trail rides through scenic mountains to complex competitive courses with elaborate man-made obstacles, building skills for real-world trail challenges. ",
    location: "Chüy, Ala-Too",
    metres: "2500 meters above sea level",
    walk: "2 km walk",
    car: "6 km by car",
    days: "1 Day",
    seaLevel: "345 km",
    cost: "110.00 $",
    price: 6000,
  },
  {
    id: 7,
    category: "Horseback riding",
    url: "https://www.journalofnomads.com/wp-content/uploads/2022/11/Horse-Riding-Panda-Pass-Tash-Rabat-29.jpg",
    name: "Family Friendly Horse Tour",
    description:
      "Mountain Trails Horseback riding involves navigating natural-looking obstacles like logs, water, bridges, and steep terrain, emphasizing partnership, trust, and control between horse and rider, making it a versatile equestrian sport for all ages and breeds, focusing on finesse and confidence over speed. It ranges from simple trail rides through scenic mountains to complex competitive courses with elaborate man-made obstacles, building skills for real-world trail challenges. ",
    location: "Issyk-Kul, Tosor",
    metres: "2000 meters above sea level",
    walk: "1 km walk",
    car: "3 km by car",
    days: "1 Day",
    seaLevel: "345 km",
    cost: "70.00 $",
    price: 6000,
  },
  {
    id: 8,
    category: "Horseback riding",
    url: "https://doctourkyrgyz.com/wp-content/uploads/2025/01/Kyrgyz-horse-tours-1024x682-2.jpg",
    name: "Multi-Day Horseback Trek",
    description:
      "A multi-day horseback trek is an immersive journey through scenic landscapes (mountains, valleys) led by experienced guides, offering a blend of adventure and cultural immersion, often involving stays in traditional yurts, authentic meals with local families, and daily riding sessions through varied terrain, suitable for various experience levels, focusing on connecting with nature and nomadic life. ",
    location: "Naryn, Song-Kol Lake",
    metres: "3016 meters above sea level",
    walk: "2 km walk",
    car: "12 km by car",
    days: "3 Days",
    seaLevel: "345 km",
    cost: "220.00 $",
    price: 6000,
  },

  // Excursions
  {
    id: 9,
    category: "Excursions",
    url: "https://dynamic-media.tacdn.com/media/photo-o/2f/45/fa/7e/caption.jpg?w=1400&h=1000&s=1",
    name: "Historical Bishkek Excursion",
    description:
      "A multi-day horseback trek is an immersive journey through stunning landscapes (mountains, valleys, lakes) on horseback, often lasting 2-7+ days, offering a deep dive into local nomadic culture, with nights spent in yurts or rustic camps, featuring authentic cuisine, local guides, and varying difficulty suitable for beginners to advanced riders, blending adventure with cultural connection. ",
    location: "Bishkek city center",
    metres: "800 meters above sea level",
    walk: "5 km walk",
    car: "4 km car",
    days: "1 Day",
    seaLevel: "345 km",
    cost: "40.00 $",
    price: 6000,
  },
  {
    id: 10,
    category: "Excursions",
    url: "https://www.russiadiscovery.ru/storage/images/resized/content_gallery_images/18652/img_64e7356542de9_1920.jpg",
    name: "Kol Tor & Traditions",
    description:
      "Kol Tor (or Kel-Tor) is a stunning, turquoise alpine lake in Kyrgyzstan's Kegety Gorge, known for its vibrant color from glacial melt, surrounded by fir forests, spruce, alpine meadows, and stark peaks, accessible via a moderate hike offering raw, natural beauty with local legends and wildlife, perfect for day trips or overnight camping, requiring sturdy boots and preparedness for rapid weather changes. ",
    location: "Chüy, Tokmok",
    metres: "1800 meters above sea level",
    walk: "3 km walk",
    car: "10 km by car",
    days: "1 Day",
    seaLevel: "345 km",
    cost: "55.00 $",
    price: 6000,
  },
  {
    id: 11,
    category: "Excursions",
    url: "https://resize.tripster.ru/30_U0ObMHnkEG_DVz76u-kw4xC4=/fit-in/1200x1000/filters:no_upscale()/https://cdn.tripster.ru/photos/7c439163-6067-4483-9569-b41685a7d805.jpg",
    name: "Ala-Archa National Park Excursion",
    description:
      "An Ala-Archa National Park excursion offers breathtaking day trips from Bishkek, featuring stunning Tian Shan mountain scenery, alpine forests, and glacial rivers, with customizable hikes from easy riverside strolls to challenging treks to the Ak-Sai Glacier or Broken Heart Stone, allowing you to explore waterfalls, feed local squirrels and birds, and enjoy picnics amidst pristine nature, often including traditional Kyrgyz food at a restaurant before returning to the city",
    location: "Chüy, Ala-Archa Gorge",
    metres: "2100 meters above sea level",
    walk: "4 km walk",
    car: "2 km by car",
    days: "1 Day",
    seaLevel: "345 km",
    cost: "65.00 $",
    price: 6000,
  },
  {
    id: 12,
    category: "Excursions",
    url: "https://central-asia.live/_next/image?url=https%3A%2F%2Fcentral-asia.live%2Fuploads%2Fchunkurchak-gorge.jpg&w=3840&q=75",
    name: "Cultural Villages Tour",
    description:
      " Cultural Villages Tour offers an immersive experience into local traditions, featuring authentic homesteads, storytelling, traditional dances, music, crafts, and local cuisine, allowing visitors to connect with history and daily life, often showcasing diverse tribes and their unique heritage through guided walks and interactive performances, providing a rich, educational, and entertaining glimpse into a community's soul. ",
    location: "Chüy, Chunkurchak",
    metres: "2200 meters above sea level",
    walk: "2 km walk",
    car: "7 km by car",
    seaLevel: "345 km",
    days: "1 Day",
    cost: "60.00 $",
    price: 6000,
  },

  // Mountaineering
  {
    id: 13,
    category: "Mountaineering",
    url: "https://triptokyrgyzstan.com/sites/default/files/styles/modal/public/media/image/c_tina_grach.jpg?itok=g5Iq3ZHV",
    name: "Peak Climbing Ala-Too",
    description:
      "Peak climbing in Kyrgyzstan's Ala-Too Range, especially around Ala-Archa National Park, offers diverse challenges from beginner treks to technical ascents on peaks like Korona (4800m) and Uchitel (4550m), featuring glaciers, snowfields, rocky sections, and stunning Tian Shan views, requiring crampons, ice axes, and proper gear for rapidly changing alpine weather. Routes vary greatly in difficulty (1B to 6B), with options for glacier travel, rock climbing, and multi-day expeditions from base camps like the Ratsek Hut. ",
    location: "Ala-Too Mountains",
    metres: "3800 meters above sea level",
    walk: "8 km walk",
    car: "3 km by car",
    seaLevel: "345 km",
    days: "2 Days",
    cost: "180.00 $",
    price: 6000,
  },
  {
    id: 14,
    category: "Mountaineering",
    url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/22/2c/af/24/jyrgalan-valley.jpg?w=900&h=500&s=1",
    name: "Trekking Jyrgalan Valley",
    description:
      "Trekking in Jyrgalan Valley, Kyrgyzstan, offers stunning Tian Shan mountain scenery with turquoise lakes, alpine forests, glaciers, and traditional shepherd life (jailoos), suitable for all levels with options from easy day hikes to multi-day loops like Turnaluu Kol (crane lake) or Kok-Bel Waterfall, featuring vibrant valleys, challenging passes, and rich local culture, perfect for summer trekking, biking, or horseback riding",
    location: "Issyk-Kul, Jyrgalan",
    metres: "2500 meters above sea level",
    walk: "10 km walk",
    car: "4 km by car",
    seaLevel: "345 km",
    days: "2 Days",
    cost: "160.00 $",
    price: 6000,
  },
  {
    id: 15,
    category: "Mountaineering",
    url: "https://madisonmountaineering.com/wp-content/uploads/2025/06/PHOTO-2025-06-25-12-00-35-1.jpg",
    name: "Lenin Peak Base Camp Trek",
    description:
      "The Lenin Peak Base Camp Trek in Kyrgyzstan's Pamir Mountains offers stunning views of 7,134m Lenin Peak, combining challenging high-altitude trekking with cultural immersion in the Alay Valley, featuring alpine lakes, glaciers, yurt stays, and glimpses into mountaineering life, with options for short explorations (3 days) or longer, more demanding routes. Trekkers experience diverse scenery, from meadows to icy summits, often staying in yurts or comfortable camps with amenities like hot showers, while acclimatizing for potential summit attempts or just enjoying the breathtaking landscapes. ",
    location: "Osh, Lenin Peak",
    metres: "4400 meters above sea level",
    walk: "14 km walk",
    car: "6 km by car",
    days: "4 Days",
    seaLevel: "345 km",
    cost: "250.00 $",
    price: 6000,
  },
  {
    id: 16,
    category: "Mountaineering",
    url: "https://images.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvMTEzMjAxMTcxL2MxZWNkMzIwMDU5ZGRiOWFkZDI4MTYxZWI2YTExOWIxLmpwZyIsImVkaXRzIjp7InRvRm9ybWF0Ijoid2VicCIsInJlc2l6ZSI6eyJ3aWR0aCI6NTAwLCJoZWlnaHQiOjUwMCwiZml0IjoiaW5zaWRlIn0sInJvdGF0ZSI6bnVsbCwianBlZyI6eyJ0cmVsbGlzUXVhbnRpc2F0aW9uIjp0cnVlLCJvdmVyc2hvb3REZXJpbmdpbmciOnRydWUsIm9wdGltaXNlU2NhbnMiOnRydWUsInF1YW50aXNhdGlvblRhYmxlIjozfX19",
    name: "Easy Hikes for Beginners",
    description:
      "Easy hikes for beginners are typically short, well-maintained trails with minimal elevation gain, often under 3-6 miles and 500 feet of climb, featuring clear paths, gentle terrain, and often offering cell service and views of civilization, making them accessible for most people in good health to enjoy nature without intense physical strain or complex navigation. They focus on getting comfortable with walking in natural environments, not extreme challenges, prioritizing enjoyment and gradual fitness building over endurance",
    location: "Chüy, Too-Ashuu",
    metres: "2200 meters above sea level",
    walk: "3 km walk",
    car: "5 km by car",
    days: "1 Day",
    seaLevel: "345 km",
    cost: "55.00 $",
    price: 6000,
  },
];

const days = [
  {
    title: "Day 1",
    content:
      "Аэропорт Манас – Бишкек (35км)\n\nПо прибытию группу встретит гид на комфортабельном транспорте из/в международный аэропорт Бишкек/Манас, трансфер в Бишкек (35км), размещение в гостевом доме.\n\nРазмещение в отеле Питание: без питания",
  },
  {
    title: "Day 2",
    content: "Здесь будет описание Day 2...",
  },
  {
    title: "Day 3",
    content: "Здесь будет описание Day 3...",
  },
  {
    title: "Day 4",
    content: "Здесь будет описание Day 3...",
  },
  {
    title: "Day 5",
    content: "Здесь будет описание Day 3...",
  },
  {
    title: "Day 6",
    content: "Здесь будет описание Day 3...",
  },
];

const Detail = () => {
  const [modal, setModal] = useState(false);
  const [openDay, setOpenDay] = useState<number | null>(null);
  const [chair, setChair] = useState(false);

  const { id } = useParams();
  if (!id) return notFound();

  const tour = tourCategory.find((t) => t.id === Number(id));
  if (!tour) return notFound();

  return (
    <>
      <section className="container px-6 md:px-12 py-8">
        <div className="flex flex-col md:flex-row gap-6 md:gap-12">
          <div className="">
            <img
              src={tour.url}
              alt={tour.name}
              className=" w-[300px]           
      h-[460px]
      md:w-[420px]        
      md:h-[300px]
      lg:w-[900px]         
      lg:h-[370px]
      object-cover
      rounded-2xl
      mt-5 md:mt-0"
              style={{ boxShadow: "0px 1px 4px 4px rgba(146, 247, 0, 0.28)" }}
            />
          </div>

          <div
            className="flex flex-col p-4 md:p-6 rounded-2xl w-full md:w-[420px] mr-[130px] h-[290px] md:h-80 mt-6 md:mt-12 text-gray-500 "
            style={{ boxShadow: "2px -2px 21px 0px rgba(34, 60, 80, 0.29)" }}
          >
            <h1 className="text-2xl md:text-xl mb-2">
              Location: {tour.location}
            </h1>
            <h2 className="text-lg md:text-base font-medium">{tour.metres}</h2>
            <div className="w-full h-px bg-gray-500 my-2"></div>
            <div className="flex justify-between">
              <div className="flex flex-col gap-2">
                <span>{tour.walk}</span>
                <span>{tour.car}</span>
              </div>
              <div className="w-px bg-gray-500"></div>
              <div className="flex flex-col gap-2 ">
                <span>{tour.days}</span>
                <span className="text-[#C29D38] font-semibold">
                  {tour.cost}
                </span>
              </div>
            </div>
            <h2 className="mt-4 text-lg md:text-base">
              Sea Level: {tour.seaLevel}
            </h2>

            <button
              onClick={() => setModal(true)}
              className="mt-5 w-full md:w-[270px] h-10 bg-[#5B9096] text-white rounded-lg font-medium hover:bg-[#5b909693] transition"
            >
              Submit a request for this selection
            </button>
          </div>
        </div>

        {/* Modal */}
        {modal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setModal(false)}
            ></div>

            <div className="relative z-10 bg-white w-[90%] md:w-[620px] p-6 rounded-2xl flex items-center justify-center flex-col gap-4">
              <h1 className="text-2xl font-semibold">
                Application for selection
              </h1>
              <p>Submit a request for selection and reduce your search time</p>
              <input
                type="text"
                placeholder="Name"
                className="w-120 border-[1.5px] border-gray-400 py-2 px-4 rounded-xl"
              />
              <input
                type="text"
                placeholder="+996-___-___"
                className="w-120 border-[1.5px] border-gray-400 py-2 px-4 rounded-xl"
              />
              <input
                type="text"
                placeholder="Your criteria for a cottage"
                className="w-120 border-[1.5px] border-gray-400 py-4 px-4 rounded-xl"
              />
              <button
                onClick={() => {
                  setModal(false), setChair(true);
                }}
                className="bg-[#5B9096] w-50 h-12 text-white py-2 px-4 rounded-xl font-medium hover:bg-cyan-100 hover:text-gray-600 transition"
              >
                Submit a request
              </button>
            </div>
          </div>
        )}
        {chair && (
          <div className="fixed  inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setChair(false)}
            ></div>
            <div className="relative z-10 bg-white w-110 h-70 p-6 rounded-2xl flex flex-col  items-center justify-center gap-7">
              <h1 className="text-3xl">Application sent!</h1>
              <p className="text-xl text-center">
                A specialist will contact you within 15 minutes and provide
                advice.
              </p>

              <button
                onClick={() => setChair(false)}
                className="w-40 h-13 rounded-2xl bg-[#0A8791] text-amber-50 text-2xl"
              >
                close
              </button>
            </div>
          </div>
        )}

        {/* Description */}
        <div className="mt-12 flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <h1 className="text-2xl mb-2">Description:</h1>
            <p>{tour.description}</p>
          </div>

          {/* Route */}
          <div className="flex-1">
            <h1 className="text-2xl mb-2">Route</h1>
            <div className="flex flex-col gap-2">
              {days.map((day, index) => (
                <div key={index} className="">
                  <h2
                    onClick={() => setOpenDay(openDay === index ? null : index)}
                    className="flex justify-between items-center bg-gray-300 p-2 cursor-pointer"
                  >
                    {day.title}
                    {openDay === index ? <SlArrowUp /> : <SlArrowDown />}
                  </h2>
                  {openDay === index && (
                    <p className="bg-gray-100 p-2 text-sm">{day.content}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <ReviewForm />
    </>
  );
};

export default Detail;
