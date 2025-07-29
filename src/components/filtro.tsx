// src/components/FiltroProductos.tsx
import React from "react";

interface Props {
  filtroTipo: string;
  setFiltroTipo: (tipo: string) => void;
  filtroPrenda: string;
  setFiltroPrenda: (prenda: string) => void;
}

const FiltroProductos: React.FC<Props> = ({
  filtroTipo,
  setFiltroTipo,
  filtroPrenda,
  setFiltroPrenda,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-4">
      <select
        value={filtroTipo}
        onChange={(e) => {
          setFiltroTipo(e.target.value);
          setFiltroPrenda(""); // Resetear si cambia el tipo
        }}
        className="p-2 border rounded"
      >
        <option value="">Todos los tipos</option>
        <option value="ropa">Ropa</option>
        <option value="calzado">Calzado</option>
        <option value="accesorio">Accesorio</option>
      </select>

      {filtroTipo === "ropa" && (
        <select
          value={filtroPrenda}
          onChange={(e) => setFiltroPrenda(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Todas las prendas</option>
          <option value="remera">Remeras</option>
          <option value="buzo">Buzos</option>
          <option value="campera">Camperas</option>
          <option value="pantalón">Pantalones</option>
          <option value="ropa interior">Ropa interior</option>
        </select>
      )}
    </div>
  );
};

export default FiltroProductos;
