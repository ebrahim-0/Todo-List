import { InputHTMLAttributes } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

type SupportedFields = "username" | "email" | "password";

type SupportedPath<T extends FieldValues> = Path<T> | SupportedFields;

interface IProps<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  control: Control<T>;
  name: SupportedPath<T>;
  rules?: Record<string, unknown>;
  placeholder: string;
}

const InputController = <T extends FieldValues>({
  control,
  name,
  rules,
  ...rest
}: IProps<T>) => {
  return (
    <Controller
      control={control}
      name={name as Path<T>}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <div>
          <input
            className="border-[1px] border-gray-300 shadow-lg focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-lg px-3 py-3 text-md w-full bg-transparent"
            {...field}
            {...rest}
          />
          {error && (
            <span className="block text-red-700 font-semibold text-sm">
              {error?.message}
            </span>
          )}
        </div>
      )}
    />
  );
};

export default InputController;

// import { InputHTMLAttributes } from "react";
// import { Control, Controller } from "react-hook-form";

// type SupportedFields = "username" | "email" | "password";

// interface IProps extends InputHTMLAttributes<HTMLInputElement> {
//   control: Control;
//   name: SupportedFields;
//   rules?: Record<string, unknown>;
//   placeholder: string;
// }

// const InputController = ({ control, name, rules, ...rest }: IProps) => {
//   return (
//     <Controller
//       control={control}
//       name={name}
//       rules={rules}
//       render={({ field, fieldState: { error } }) => (
//         <>
//           <input
//             className="border-[1px] border-gray-300 shadow-lg focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-lg px-3 py-3 text-md w-full bg-transparent"
//             {...field}
//             {...rest}
//           />
//           {error && (
//             <span className="block text-red-700 font-semibold text-sm">
//               {error?.message}
//             </span>
//           )}
//         </>
//       )}
//     />
//   );
// };

// export default InputController;
