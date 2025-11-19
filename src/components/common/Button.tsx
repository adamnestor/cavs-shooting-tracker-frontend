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
    normal: "px-6 py-3 text-base",
    large: "px-10 py-5 md:px-16 md:py-8 text-lg md:text-xl font-bold",
  };
  const variantStyles = {
    primary:
      "bg-[#6F263D] text-white hover:bg-[#8A324E] border-2 border-transparent hover:border-[#FFB300]",
    secondary:
      "bg-[#121212] text-white hover:bg-[#1E1E1E] border-2 border-transparent hover:border-[#FFB300]",
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
