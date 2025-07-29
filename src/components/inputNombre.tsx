import React from "react";

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputNombre: React.FC<Props> = ({ value, onChange }) => {
  return (
    <label className="block">
      Nombre:
      <input
        type="text"
        placeholder="Nombre"
        value={value}
        onChange={onChange}
        className="w-full p-2 border rounded"
        required
      />
    </label>
  );
};

export default InputNombre;
