import Button from "@/components/ui/Button/Button";

const Setting = () => {
  return (
    <div className="p-6">
      <div className="bg-white border border-gray-300 rounded-lg p-5 space-y-4">
        <h1 className="text-2xl font-semibold">Настройки</h1>
        <div className="flex justify-between items-center">
          <span>Пункт 1</span>
          <Button variant="secondary">Действие</Button>
        </div>

        <div className="flex justify-between items-center">
          <span>Пункт 2</span>
          <Button variant="secondary">Действие</Button>
        </div>

        <div className="flex justify-between items-center">
          <span>Пункт 3</span>
          <Button variant="secondary">Действие</Button>
        </div>

        <div className="flex justify-between items-center">
          <span>Пункт 4</span>
          <Button variant="secondary">Действие</Button>
        </div>
      </div>
    </div>
  );
};

export default Setting;
