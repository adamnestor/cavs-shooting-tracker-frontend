interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "success" | "danger" | "inactive";
  type?: "button" | "submit" | "reset";
  size?: "normal" | "large";
}

export function Button({
  onClick,
  children,
  variant = "primary",
  type = "button",
  size = "normal",
}: ButtonProps) {
  const baseStyles =
    "rounded-lg font-semibold shadow-md hover:shadow-lg transition";
  const sizeStyles = {
    normal: "px-6 py-3",
    large: "px-16 py-8 text-xl font-bold",
  };
  const variantStyles = {
    primary:
      "bg-[#860038] text-white hover:bg-[#6d002d] border-2 border-transparent hover:border-[#fdbb30]",
    secondary:
      "bg-[#041e42] text-white hover:bg-[#03172e] border-2 border-transparent hover:border-[#fdbb30]",
    success: "bg-green-600 text-white hover:bg-green-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
    inactive:
      "bg-gray-300 text-gray-600 cursor-not-allowed border-2 border-transparent",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]}`}
    >
      {children}
    </button>
  );
}
