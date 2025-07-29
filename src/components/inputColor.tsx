import React from "react";

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputColor: React.FC<Props> = ({ value, onChange }) => {
  return (
    <label className="block">
      Colores disponibles:
      <input
        type="text"
        placeholder="Color"
        value={value}
        onChange={onChange}
        className="w-full p-2 border rounded"
        required
      />
    </label>
  );
};

export default InputColor;
