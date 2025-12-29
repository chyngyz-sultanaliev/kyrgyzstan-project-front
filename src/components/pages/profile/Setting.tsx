import Button from "@/components/ui/Button/Button";
import { User, Bell, Lock, Globe, Moon, Mail } from "lucide-react";

const settingsItems = [
  {
    icon: User,
    title: "Профиль",
    description: "Управление личной информацией",
    action: "Редактировать",
  },
  {
    icon: Bell,
    title: "Уведомления",
    description: "Настройка оповещений и уведомлений",
    action: "Настроить",
  },
  {
    icon: Lock,
    title: "Безопасность",
    description: "Пароль и двухфакторная аутентификация",
    action: "Изменить",
  },
  {
    icon: Globe,
    title: "Язык и регион",
    description: "Выбор языка и часового пояса",
    action: "Выбрать",
  },
  {
    icon: Moon,
    title: "Тема оформления",
    description: "Светлая или тёмная тема",
    action: "Переключить",
  },
  {
    icon: Mail,
    title: "Email подписки",
    description: "Управление email рассылками",
    action: "Управлять",
  },
];

const Setting = () => {
  return (
    <div className="p-4 sm:p-6 mx-auto h-[87vh] overflow-y-auto hide-scrollbar">
      <div className="bg-white border border-gray-300 rounded-lg p-4 sm:p-6 space-y-1">
        <h1 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Настройки</h1>
        
        {settingsItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4 py-4 border-b border-gray-200 last:border-none hover:bg-gray-50 transition-colors px-2 sm:px-3 rounded-lg"
            >
              <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <Icon size={20} className="text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-medium text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                    {item.description}
                  </p>
                </div>
              </div>
              <Button 
                variant="secondary" 
                className="w-full sm:w-auto whitespace-nowrap"
              >
                {item.action}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Setting;