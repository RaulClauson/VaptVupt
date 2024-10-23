import { LuSearch } from "react-icons/lu";
import "./Oficina_Barra_Busca.css";

const Oficina_Barra_Busca = () => {
  return (
    <>
      <form id="Oficina_Barra_Busca" aria-label="Buscar Oficinas">
        <label className="label_barra_busca" htmlFor="Busca">
          <LuSearch />
          <input type="text" id="Busca" placeholder="Busque"></input>
        </label>
      </form>
    </>
  );
};

export default Oficina_Barra_Busca;
