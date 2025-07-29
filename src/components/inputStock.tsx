import React from "react";

type Props = {
  value: number | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputStock: React.FC<Props> = ({ value, onChange }) => {
  return (
    <label className="block">
      Stock disponible:
      <input
        type="number"
        value={value === undefined ? "" : value}
        onChange={onChange}
        className="w-full p-2 border rounded"
        placeholder="Stock disponible"
        min={0}
        required
      />
    </label>
  );
};

export default InputStock;
