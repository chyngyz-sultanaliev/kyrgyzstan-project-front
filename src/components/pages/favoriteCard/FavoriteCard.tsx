import Image from "next/image";
import { Heart } from "lucide-react";
import { Hotel } from "@/shared/api/hotelApi";
import { Car } from "@/shared/api/carApi";
import { Tour } from "@/shared/api/tourApi";

type Item = Hotel | Car | Tour;

interface Props {
  itemType: "HOTEL" | "TOUR" | "CAR";
  item: Item;
}

const FavoriteCard = ({ itemType, item }: Props) => {
  let image = "/placeholder.png";
  if (itemType === "HOTEL") {
    const hotel = item as Hotel;
    image = hotel.images?.[0]?.img || image;
  } else if (itemType === "CAR") {
    const car = item as Car;
    // image = car.image || image;
  } else if (itemType === "TOUR") {
    const tour = item as Tour;
    image = tour.image || image;
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden hover:shadow-md transition">
      <div className="relative h-32">
        <Image src={image} alt={item.title} fill className="object-cover" />
        <div className="absolute top-2 right-2 bg-white rounded-full p-1">
          <Heart className="w-4 h-4 text-red-500" />
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-medium text-sm line-clamp-1">{item.title}</h3>
        <p className="text-xs text-gray-500 mt-1">{itemType}</p>
      </div>
    </div>
  );
};

export default FavoriteCard;
