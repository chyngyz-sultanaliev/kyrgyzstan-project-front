// src/components/ui/Button/Button.tsx
import { ButtonHTMLAttributes, ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/components/utils/cn";

type ButtonVariant = "primary" | "secondary" | "gradient";
type IconPosition = "left" | "right";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  icon?: ReactNode;
  iconPosition?: IconPosition;
  className?: string;
  fullWidth?: boolean;
  loading?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  icon,
  iconPosition = "left",
  className = "",
  fullWidth = false,
  loading = false,
  disabled = false,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-xl text-md  font-medium hover:scale-105 transition-transform duration-300   active:scale-95 transition-transform duration-150";

  const variants: Record<ButtonVariant, string> = {
    primary: "bg-[#0A8791] text-white border-2 border-white",
    secondary: "bg-white border-1 border-[#0A8791] text-[#0A8791] ",
    gradient:
      "bg-gradient-to-r from-[#0A8791] to-[#00C9D1] text-white text-[10px] sm:text-[18px]",
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        fullWidth ? "w-full h-[25px] sm:h-[58px]" : "px-4 py-2",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {!loading && icon && iconPosition === "left" && (
        <span className="mr-2">{icon}</span>
      )}
      {children}
      {!loading && icon && iconPosition === "right" && (
        <span className="ml-2">{icon}</span>
      )}
    </button>
  );
}
