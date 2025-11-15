interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "success" | "danger";
}

export function Button({
  onClick,
  children,
  variant = "primary",
}: ButtonProps) {
  const baseStyles =
    "px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg";
  const variantStyles = {
    primary:
      "bg-[#860038] text-white hover:bg-[#6d002d] border-2 border-transparent hover:border-[#fdbb30] transition",
    secondary:
      "bg-[#041e42] text-white hover:bg-[#03172e] border-2 border-transparent hover:border-[#fdbb30] transition",
    success: "bg-green-600 text-white hover:bg-green-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };
  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]}`}
    >
      {children}
    </button>
  );
}
