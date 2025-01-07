import { ChangeEventHandler } from "react";

const Inputs = ({
      id,
      label,
      type,
      value,
      onchange,
}: {
      id: string;
      label: string;
      type: string;
      value: string | number | string[];
      onchange: ChangeEventHandler<HTMLInputElement>;
}) => {
      return (
            <div className="flex flex-col gap-3 items-start">
                  <label htmlFor={id}>{label}</label>
                  <input
                        type={type}
                        id={id}
                        value={value}
                        onChange={onchange}
                  />
            </div>
      );
};

export default Inputs;