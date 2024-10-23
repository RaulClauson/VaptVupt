import { IoFilterSharp } from "react-icons/io5";
import './Oficina_titulo_filtro.css';


const Oficina_titulo_filtro = () => {
    return (
        <>
            <h2>Oficinas</h2>
            <button type="button" aria-label="Abrir filtros"><IoFilterSharp /></button>
        </>
    )
}

export default Oficina_titulo_filtro