import Button from "@/components/ui/Button/Button";

const Profile = () => {
  return (
    <div className="p-6 mx-auto h-[87vh] overflow-y-auto hide-scrollbar">
      <div className="relative bg-white border border-gray-300 rounded-lg overflow-hidden h-75 ">
        <div className=" h-44 bg-gray-200"></div>
        <div className="px-5 pt-5 flex justify-between items-start">
          <h1 className="ml-44 flex flex-col text-xl">
            Имя Пользователя
            <span className="text-gray-500 font-light text-base">Роль</span>
          </h1>
          <Button variant="primary">Редактировать</Button>
        </div>

        <div className="absolute left-5 top-30 w-40 h-40 bg-gray-200 rounded-full border"></div>
      </div>
      <div className="mt-20 p-5 border border-gray-300 rounded-lg space-y-5">
        <div className="bg-[#0A8791] text-white border-2  rounded-xl text-md  p-2 w-27">
          Избранные
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          <Button variant="secondary" className="px-4 py-2 rounded-full border">
            TOUR
          </Button>
          <Button variant="secondary" className="px-4 py-2 rounded-full border">
            CAR
          </Button>
          <Button variant="secondary" className="px-4 py-2 rounded-full border">
            HOTEL
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          <div className="bg-white border border-gray-300 rounded-lg p-3 h-48"></div>
          <div className="bg-white border border-gray-300 rounded-lg p-3 h-48"></div>
          <div className="bg-white border border-gray-300 rounded-lg p-3 h-48"></div>
          <div className="bg-white border border-gray-300 rounded-lg p-3 h-48"></div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
