import "./Cabecalho.css";

interface Propriedades {
  titulo: string;
}

const Cabecalho = (props: Propriedades) => {
  return (
    <>
      <div id="cabecalho" role="banner">
        <h1>{props.titulo}</h1>
      </div>
    </>
  );
};

export default Cabecalho;
