import React from "react";

type Props = {
  tipo: string;
  tipoPrenda: string;
  onTipoChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onTipoPrendaChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const SelectTipoProducto: React.FC<Props> = ({
  tipo,
  tipoPrenda,
  onTipoChange,
  onTipoPrendaChange,
}) => {
  const opcionesTipo = ["ropa", "calzado", "accesorio"];
  const opcionesPrenda = ["Remera", "Pantalón", "Buzo", "Campera", "Ropa interior"];

  return (
    <div className="space-y-4">
      <label className="block">
        Tipo de producto:
        <select
          value={tipo}
          onChange={onTipoChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Seleccionar tipo</option>
          {opcionesTipo.map((op) => (
            <option key={op} value={op}>
              {op.charAt(0).toUpperCase() + op.slice(1)}
            </option>
          ))}
        </select>
      </label>

      {tipo === "ropa" && (
        <label className="block">
          Tipo de prenda:
          <select
            value={tipoPrenda}
            onChange={onTipoPrendaChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Seleccionar tipo de prenda</option>
            {opcionesPrenda.map((op) => (
              <option key={op} value={op}>
                {op.charAt(0).toUpperCase() + op.slice(1)}
              </option>
            ))}
          </select>
        </label>
      )}
    </div>
  );
};

export default SelectTipoProducto;
