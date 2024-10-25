import { IoFilterSharp } from "react-icons/io5";
import "./Oficina_titulo_filtro.css";

interface OficinaTituloFiltroProps {
  searchTerm: string;
}

const Oficina_titulo_filtro: React.FC<OficinaTituloFiltroProps> = ({
  searchTerm,
}) => {
  return (
    <>
      <h2>Resultados p/ {searchTerm}</h2>
      <button type="button" aria-label="Abrir filtros">
        <IoFilterSharp />
      </button>
    </>
  );
};

export default Oficina_titulo_filtro;
