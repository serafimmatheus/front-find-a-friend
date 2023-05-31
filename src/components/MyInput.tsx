import { InputHTMLAttributes } from "react";

interface InputIProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type?: string;
  placeholder: string;
}

export default function MyInput({
  label,
  placeholder,
  type = "text",
  ...rest
}: InputIProps) {
  return (
    <div className={`flex flex-col mt-4`}>
      <label className="font-nunito text-base text-gray-400 font-semibold mb-2">
        {label}
      </label>
      <input
        className="font-nunito text-base text-gray-400 font-semibold bg-gray-50 h-16 border border-gray-75 rounded-lg px-4 outline-gray-400 outline-1 placeholder:opacity-40"
        type={type}
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
}
