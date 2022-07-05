import { FC, PropsWithChildren } from "react";

const Button: FC<
  PropsWithChildren<{ onClick?: () => void; className?: string }>
> = ({ onClick, className, children }) => {
  return (
    <button
      onClick={onClick}
      className={`flex justify-between items-center gap-2 px-6 py-4 rounded-md 
      bg-orange-600 text-gray-800 font-semibold transition hover:scale-95
      ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
