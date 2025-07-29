import { TALLE_CALZADO, TALLE_ROPA } from "../utils/talles";

interface Props {
  tipo: "ropa" | "calzado";
  tallesSeleccionados: string[];
  toggleTalle: (talle: string) => void;
}

const tallesRopa = TALLE_ROPA;
const tallesCalzado = TALLE_CALZADO;

export default function SelectorTalles({ tipo, tallesSeleccionados, toggleTalle }: Props) {
  const talles = tipo === "ropa" ? tallesRopa : tipo === "calzado" ? tallesCalzado : [];

  return (
    <div>
      <label className="block">Talles disponibles:</label>
      <div className="flex flex-wrap gap-2">
        {talles.map((t) => (
          <label key={t} className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={tallesSeleccionados.includes(t)}
              onChange={() => toggleTalle(t)}
            />
            {t}
          </label>
        ))}
      </div>
    </div>
  );
}
