import Button from "@/components/ui/Button/Button";

const Admin = () => {
  return (
    <div className="p-4 sm:p-6 mx-auto h-[87vh] overflow-y-auto hide-scrollbar">
      {/* Profile Card */}
      <div className="relative bg-white border border-gray-300 rounded-lg overflow-hidden">
        {/* Cover Image */}
        <div className="h-32 sm:h-44 bg-gray-200"></div>

        {/* Profile Info */}
        <div className="px-4 sm:px-5 pt-16 sm:pt-20 pb-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="ml-0 sm:ml-36 md:ml-44 flex flex-col text-lg sm:text-xl">
            Имя Пользователя
            <span className="text-gray-500 font-light text-sm sm:text-base">
              Роль
            </span>
          </h1>
          <Button variant="primary" className="w-full sm:w-auto">
            Редактировать
          </Button>
        </div>

        {/* Avatar */}
        <div className="absolute left-4 sm:left-5 top-20 sm:top-28 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-gray-200 rounded-full border-4 border-white"></div>
      </div>

      {/* Favorites Section */}
      <div className="mt-8 sm:mt-12 md:mt-20 p-4 sm:p-5 border border-gray-300 rounded-lg space-y-4 sm:space-y-5">
        <div className="bg-[#0A8791] text-white rounded-xl text-sm sm:text-md p-2 w-fit px-4">
          Избранные
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Button
            variant="secondary"
            className="px-3 sm:px-4 py-2 rounded-full border text-sm sm:text-base"
          >
            TOUR
          </Button>
          <Button
            variant="secondary"
            className="px-3 sm:px-4 py-2 rounded-full border text-sm sm:text-base"
          >
            CAR
          </Button>
          <Button
            variant="secondary"
            className="px-3 sm:px-4 py-2 rounded-full border text-sm sm:text-base"
          >
            HOTEL
          </Button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          <div className="bg-white border border-gray-300 rounded-lg p-3 h-48 min-h-[12rem]"></div>
          <div className="bg-white border border-gray-300 rounded-lg p-3 h-48 min-h-[12rem]"></div>
          <div className="bg-white border border-gray-300 rounded-lg p-3 h-48 min-h-[12rem]"></div>
          <div className="bg-white border border-gray-300 rounded-lg p-3 h-48 min-h-[12rem]"></div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
