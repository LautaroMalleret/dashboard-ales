import React from "react";

type Props = {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputPrecio: React.FC<Props> = ({ value, onChange }) => {
  return (
    <label className="block">
      Precio:
      <input
        type="number"
        placeholder="Precio"
        value={value}
        onChange={onChange}
        className="w-full p-2 border rounded"
        required
        min={0}
      />
    </label>
  );
};

export default InputPrecio;
