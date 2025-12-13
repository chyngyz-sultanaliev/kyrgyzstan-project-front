/* eslint-disable @next/next/no-img-element */
"use client";
import Button from "@/components/ui/Button/Button";
import Link from "next/link";
import { useState } from "react";

export const categories = [
  "categories",
  "Group tours",
  "Horseback riding",
  "Excursions",
  "Mountaineering",
];

interface Tour {
  id: number;
  category: string;
  url: string;
  name: string;
  description: string;
  price: number;
}

const tourCategory: Tour[] = [
  // Group tours
  {
    id: 1,
    category: "Group tours",
    url: "https://central-asia.guide/wp-content/uploads/2024/11/Kel_Suu_tour-1024x682.jpg",
    name: "Kyrgyzstan Group Highlights",
    description:
      "Visit major sights with a guided group tour. Easy and social.",
    price: 6000,
  },
  {
    id: 2,
    category: "Group tours",
    url: "https://kgcountry.com/wp-content/uploads/photo_5188163860861928453_w-600x700.jpg",
    name: "Central Kyrgyzstan Explorer",
    description: "A 2-day tour covering lakes, valleys, and nomadic villages.",
    price: 6000,
  },
  {
    id: 3,
    category: "Group tours",
    url: "https://kyrgyzguides.com/wp-content/uploads/2022/02/Supara.jpeg",
    name: "Cultural & Nature Group Tour",
    description:
      "Experience Kyrgyz culture, food, and nature in a friendly group.",
    price: 6000,
  },
  {
    id: 4,
    category: "Group tours",
    url: "https://ecotour.kg/wp-content/uploads/toursbydate_slide_011.jpg",
    name: "Family Group Adventure",
    description:
      "Designed for families with children, easy hikes and fun activities.",
    price: 6000,
  },
  // Horseback riding
  {
    id: 5,
    category: "Horseback riding",
    url: "https://yellowwoodadventures.com/storage/media/images/general/square_768/jabb7zex-653162586ecc5.jpeg",
    name: "Nomad Horseback Adventure",
    description:
      "Short, half-day, and multi-day horseback tours through scenic landscapes.",
    price: 6000,
  },
  {
    id: 6,
    category: "Horseback riding",
    url: "https://www.equus-journeys.com/photos/1800x1200/kirghisztan-celestian-mountains-horseback-trails-equus-journeys-16-10801.jpg",
    name: "Mountain Trails Horseback",
    description: "Trekking through Ala-Too mountains, 3-5 hours.",
    price: 6000,
  },
  {
    id: 7,
    category: "Horseback riding",
    url: "https://www.journalofnomads.com/wp-content/uploads/2022/11/Horse-Riding-Panda-Pass-Tash-Rabat-29.jpg",
    name: "Family Friendly Horse Tour",
    description: "Easy ride for families, picnic included.",
    price: 6000,
  },
  {
    id: 8,
    category: "Horseback riding",
    url: "https://doctourkyrgyz.com/wp-content/uploads/2025/01/Kyrgyz-horse-tours-1024x682-2.jpg",
    name: "Multi-Day Horseback Trek",
    description: "2-3 days adventure with yurt stays and cultural experiences.",
    price: 6000,
  },
  // Excursions
  {
    id: 9,
    category: "Excursions",
    url: "https://media.tacdn.com/media/attractions-splice-spp-360x240/10/d7/34/73.jpg",
    name: "Historical Bishkek Excursion",
    description: "City sightseeing and cultural excursions for all ages.",
    price: 6000,
  },
  {
    id: 10,
    category: "Excursions",
    url: "https://www.russiadiscovery.ru/storage/images/resized/content_gallery_images/18652/img_64e7356542de9_1920.jpg",
    name: "Kol Tor & Traditions",
    description: "Explore local markets, food, and traditional crafts.",
    price: 6000,
  },
  {
    id: 11,
    category: "Excursions",
    url: "https://resize.tripster.ru/30_U0ObMHnkEG_DVz76u-kw4xC4=/fit-in/1200x1000/filters:no_upscale()/https://cdn.tripster.ru/photos/7c439163-6067-4483-9569-b41685a7d805.jpg",
    name: "Ala-Archa National Park Excursion",
    description: "Short hike and picnic in the beautiful Ala-Archa valley.",
    price: 6000,
  },
  {
    id: 12,
    category: "Excursions",
    url: "https://central-asia.live/_next/image?url=https%3A%2F%2Fcentral-asia.live%2Fuploads%2Fchunkurchak-gorge.jpg&w=3840&q=75",
    name: "Cultural Villages Tour",
    description: "Visit traditional villages and experience Kyrgyz customs.",
    price: 6000,
  },
  // Mountaineering
  {
    id: 13,
    category: "Mountaineering",
    url: "https://triptokyrgyzstan.com/sites/default/files/styles/modal/public/media/image/c_tina_grach.jpg?itok=g5Iq3ZHV",
    name: "Peak Climbing Ala-Too",
    description:
      "Challenging climbs with guides, suitable for experienced hikers.",
    price: 6000,
  },
  {
    id: 14,
    category: "Mountaineering",
    url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/22/2c/af/24/jyrgalan-valley.jpg?w=900&h=500&s=1",
    name: "Trekking Jyrgalan Valley",
    description: "Moderate hike through scenic mountains, overnight camping.",
    price: 6000,
  },
  {
    id: 15,
    category: "Mountaineering",
    url: "https://madisonmountaineering.com/wp-content/uploads/2025/06/PHOTO-2025-06-25-12-00-35-1.jpg",
    name: "Lenin Peak Base Camp Trek",
    description: "Adventure for experienced climbers with breathtaking views.",
    price: 6000,
  },
  {
    id: 16,
    category: "Mountaineering",
    url: "https://images.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvMTEzMjAxMTcxL2MxZWNkMzIwMDU5ZGRiOWFkZDI4MTYxZWI2YTExOWIxLmpwZyIsImVkaXRzIjp7InRvRm9ybWF0Ijoid2VicCIsInJlc2l6ZSI6eyJ3aWR0aCI6NTAwLCJoZWlnaHQiOjUwMCwiZml0IjoiaW5zaWRlIn0sInJvdGF0ZSI6bnVsbCwianBlZyI6eyJ0cmVsbGlzUXVhbnRpc2F0aW9uIjp0cnVlLCJvdmVyc2hvb3REZXJpbmdpbmciOnRydWUsIm9wdGltaXNlU2NhbnMiOnRydWUsInF1YW50aXNhdGlvblRhYmxlIjozfX19",
    name: "Easy Hikes for Beginners",
    description: "Introductory mountain hikes suitable for newcomers.",
    price: 6000,
  },
];

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTours =
    selectedCategory === "categories"
      ? tourCategory
      : tourCategory.filter((tour) => tour.category === selectedCategory);

  return (
    <section className="container mx-auto sm:px-5  p-11">
      <div className="flex items-center justify-around text-2xl mb-10 hidden sm:flex md:text-xl border-b pb-3  ">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`${
              selectedCategory === cat ? "font-bold border-b-2" : ""
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="block sm:hidden mb-6">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full border rounded-lg p-2 text-sm"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap gap-8 justify-center mt-6">
        {filteredTours.map((tour) => (
          <div
            key={tour.id}
            className="flex flex-col rounded-3xl justify-center w-[394px] h-[435px] md:w-[290px] md:h-[300px] bg-white shadow-md p-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:bg-[#f5f5f5]"
          >
            <img
              src={tour.url}
              alt={tour.name}
              className="w-[340px] h-[265px] object-cover rounded-2xl ml-3 md:ml-[1] md:pt-[4] md:w-[275px] md:h-[165px]"
            />
            <div className="ml-3 mt-2">
              <h2 className="font-szemibold">{tour.name}</h2>
              <h2>Price: {tour.price}</h2>
              <h2>{tour.category}</h2>
            </div>
            <Link href={`/tour/${tour.id}`}>
              <button className="bg-[#5B9096] w-[120px] h-[43px] md:w-[81px] md:h-[33px] md:text-[10px] md:ml-[181px] text-amber-50 text-sm rounded-xl  ml-60">
                Plan Your Trip
              </button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Category;
