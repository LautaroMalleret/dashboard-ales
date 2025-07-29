import React from "react";

type Props = {
  checked: boolean;
  onChange: () => void;
};

const CheckboxDestacado: React.FC<Props> = ({ checked, onChange }) => {
  return (
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      Destacado
    </label>
  );
};

export default CheckboxDestacado;
