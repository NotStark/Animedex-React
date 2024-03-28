import { HtmlHTMLAttributes } from "react";

type ButtonProps = HtmlHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  isDisabled?: boolean;
};

export default function Button({
  className,
  isDisabled,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={isDisabled}
      className={`relative px-6 py-2 text-primary border-2 border-primary rounded-full bg-transparent font-semibold transition-all duration-300 ease-out overflow-hidden before:content-[''] before:absolute before:inset-0 before:m-auto before:w-12 before:h-12 before:rounded-full before:scale-0 before:z-[-1] before:bg-primary before:transition-all before:duration-[600ms] before:ease-out hover:before:scale-[4] hover:scale-110 hover:text-white hover:shadow-md hover:shadow-primary/40 active:scale-100 text-[.7rem] sm:text-sm ${isDisabled && 'opacity-50'} ${className && className}`}
    />
  );
}
