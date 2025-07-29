import React from "react";

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputDescripcion: React.FC<Props> = ({ value, onChange }) => {
  return (
    <label className="block">
      Descripción:
      <input
        type="text"
        placeholder="Descripción"
        value={value}
        onChange={onChange}
        className="w-full p-2 border rounded"
        required
      />
    </label>
  );
};

export default InputDescripcion;
