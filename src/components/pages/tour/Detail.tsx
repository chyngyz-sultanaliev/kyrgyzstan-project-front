"use client";
import { notFound, useParams } from "next/navigation";
import { SlArrowUp } from "react-icons/sl";
import { SlArrowDown } from "react-icons/sl";
import { PiTelegramLogo } from "react-icons/pi";

import { useState } from "react";

interface Tour {
  id: number;
  category: string;
  url: string;
  name: string;
  description: string;
  price: number;
}
const tourCategory = [
  // Group tours
  {
    id: 1,
    category: "Group tours",
    url: "https://central-asia.guide/wp-content/uploads/2024/11/Kel_Suu_tour-1024x682.jpg",
    name: "Kyrgyzstan Group Highlights",
    description:
      "Kyrgyzstan group highlights focus on immersive nomadic culture, stunning Tian Shan mountain landscapes, and Silk Road history, featuring experiences like staying in yurts, horseback riding, meeting eagle hunters, visiting Issyk-Kul Lake and Tash Rabat caravanserai, trekking to alpine lakes (Ala Kul), exploring ancient sites like Burana Tower, and engaging with local communities for authentic cultural immersion in vibrant markets and traditional homes",
    location: "Naryn, Kel-Suu Lake",
    metres: "3200 meters above sea level",
    walk: "3 km walk",
    car: "10 km by car",
    days: "2 Days",
    cost: "145.00 $",
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
    cost: "220.00 $",
    price: 6000,
  },

  // Excursions
  {
    id: 9,
    category: "Excursions",
    url: "https://media.tacdn.com/media/attractions-splice-spp-360x240/10/d7/34/73.jpg",
    name: "Historical Bishkek Excursion",
    description:
      "A multi-day horseback trek is an immersive journey through stunning landscapes (mountains, valleys, lakes) on horseback, often lasting 2-7+ days, offering a deep dive into local nomadic culture, with nights spent in yurts or rustic camps, featuring authentic cuisine, local guides, and varying difficulty suitable for beginners to advanced riders, blending adventure with cultural connection. ",
    location: "Bishkek city center",
    metres: "800 meters above sea level",
    walk: "5 km walk",
    car: "4 km car",
    days: "1 Day",
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

  const { id } = useParams();

  if (!id) return notFound();

  const tour = tourCategory.find((t: Tour) => t.id === Number(id));

  if (!tour) return notFound();

  return (
    <section className="p-10">
      <div className="flex   w-[1399px] h-[450px]   gap-8 bg-[#357087] text-amber-50">
        <div className=" ml-5">
          <img
            src={tour.url}
            alt={tour.name}
            className="w-170 h-100 object-cover rounded-sm shadow-lg mt-6"
          />
        </div>
        <div className="md:w-1/2 flex flex-col gap-5">
          <h1 className="text-4xl mt-10 ">Location: {tour.location}</h1>

          <div className="flex ">
            <div className="flex flex-col gap-7 mt-3 ">
              <h2 className="font-roboto font-medium text-[32px] leading-[100%] tracking-normal">
                {tour.metres}
              </h2>
              <h2 className="font-roboto font-medium text-[32px] leading-[100%] tracking-normal">
                {tour.walk}
              </h2>
              <h2 className="font-roboto font-medium text-[32px] leading-[100%] tracking-normal">
                {tour.car}
              </h2>
              <h2 className="font-roboto font-medium text-[32px] leading-[100%] tracking-normal">
                {tour.days}
              </h2>
            </div>
            <h2 className="flex items-end ml-28  font-roboto font-medium text-[30px] leading-[100%] tracking-[0] text-[#C29D38]">
              {tour.cost}
            </h2>
          </div>

          <button
            onClick={() => setModal(true)}
            className="mt-5 w-[150px] h-[45px] bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition"
          >
            Order
          </button>
        </div>
      </div>

      <div className=" flex items-start mt-6  gap-9">
        <div className=" flex flex-col gap-2">
          <h1 className="text-2xl">Description:</h1>
          <p className="w-140">{tour.description}</p>
        </div>

        <div className="">
          <h1>Route</h1>
          <div className="flex flex-col gap-4 mt-5">
            {days.map((day, index) => (
              <div key={index} className="w-200">
                <h2
                  onClick={() => setOpenDay(openDay === index ? null : index)}
                  className="flex items-center justify-between bg-[#D9D9D9] w-200 h-10 pl-5 pr-5 cursor-pointer"
                >
                  {day.title}
                  {openDay === index ? <SlArrowUp /> : <SlArrowDown />}
                </h2>

                {openDay === index && (
                  <p className="bg-[#EFEFEF] p-3 text-[14px] leading-4">
                    {day.content}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="">
        {modal && (
          <div className="fixed inset-0 z-50 flex justify-center items-center">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${tour.url})` }}
            ></div>

            <div className="absolute  inset-0 bg-black/20 backdrop-blur-sm"></div>

            <div className="flex flex-col items-center justify-center relative z-10 w-[650px] h-170 bg-[#5d5b5b5e] rounded-2xl border border-[#570979]  backdrop-blur-xl">
              <h2 className="flex gap-4 text-[#080E7D] text-2xl mb-4">
                Order Number: <span className="text-[#FFFFFF]">24006</span>
              </h2>

              <div className="flex flex-col gap-5 text-white">
                <p
                  className="flex gap-20 font-roboto font-medium text-2xl leading-[100%] tracking-[0]
 text-[#080E7D]"
                >
                  Name Tour:{" "}
                  <span className=" text-xl text-[#FFFFFF]">{tour.name}</span>
                </p>
                <p
                  className=" flex gap-35 font-roboto font-medium text-2xl leading-[100%] tracking-[0]
 text-[#080E7D]"
                >
                  Price:{" "}
                  <span className="text-xl text-[#FFFFFF]">{tour.cost}</span>
                </p>

                <div className="flex flex-col gap-3 mt-6">
                  <span className="">
                    <h3>Your Name</h3>
                    <input className="w-110 h-11 rounded bg-white/70" />
                  </span>

                  <span>
                    <h3>Your Number</h3>
                    <input className="w-110 h-11 rounded bg-white/70" />
                  </span>

                  <span>
                    <h3>Your Message</h3>
                    <textarea className="w-110  rounded bg-white/70 h-24" />
                  </span>
                </div>

                <div className="flex items-center gap-22">
                  <h4>Please indicate the number of people.</h4>

                  <h3 className="flex items-center pl-2 w-18 h-8 text-[#000000] text-xl rounded-xl bg-[#D9D9D9]">
                    2<div className="w-0.5 h-8 bg-[#5d5b5b5e] ml-7"></div>
                    <span className="text-[#21272A] text-sm ml-1">
                      <SlArrowUp />
                      <SlArrowDown />
                    </span>
                  </h3>
                </div>

                <button
                  onClick={() => setModal(false)}
                  className=" w-30 py-3 bg-blue-600 rounded-lg text-white mt-5 ml-40 flex justify-center items-center gap-2"
                >
                  Send <PiTelegramLogo />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Detail;
