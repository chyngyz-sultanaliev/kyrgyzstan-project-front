// src/components/ui/StatusMessage/StatusMessage.tsx
import { ReactNode } from "react";
import { Loader2, AlertCircle, Inbox } from "lucide-react";
import Button from "../Button/Button";

type StatusVariant = "loading" | "error" | "empty";

interface StatusMessageProps {
  variant: StatusVariant;
  message?: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: "primary" | "secondary" | "gradient" | "delete";
  };
  icon?: ReactNode;
}

export default function StatusMessage({
  variant,
  message,
  action,
  icon,
}: StatusMessageProps) {
  let defaultIcon: ReactNode;
  let defaultMessage: string;

  switch (variant) {
    case "loading":
      defaultIcon = <Loader2 className="h-6 w-6 animate-spin text-gray-500" />;
      defaultMessage = message || "Загрузка...";
      break;
    case "error":
      defaultIcon = <AlertCircle className="h-6 w-6 text-red-500" />;
      defaultMessage = message || "Произошла ошибка";
      break;
    case "empty":
      defaultIcon = <Inbox className="h-6 w-6 text-gray-400" />;
      defaultMessage = message || "Данных нет";
      break;
    default:
      defaultIcon = null;
      defaultMessage = "";
  }

  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 text-center gap-4">
      {icon || defaultIcon}
      <p className="text-gray-600 text-sm md:text-base">{defaultMessage}</p>
      {action && (
        <Button
          onClick={action.onClick}
          variant={action.variant || "primary"}
          className="mt-2"
        >
          {action.label}
        </Button>
      )}
    </div>
  );
}
