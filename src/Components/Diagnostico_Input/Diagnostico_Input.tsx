import { useRef, useState } from "react";
import { BiSolidSend } from "react-icons/bi";
import {
  useRive,
  useStateMachineInput,
  Layout,
  Fit,
  Alignment,
} from "@rive-app/react-canvas";
import "./Diagnostico_Input.css";

const Diagnostico_Input = () => {
  const spanRef = useRef<HTMLSpanElement>(null);
  const [response, setResponse] = useState<string | null>(null);
  const maxLength = 500;

  // Configuração da animação do Rive
  const { rive, RiveComponent } = useRive({
    src: "rive/Animation.riv", // Coloque o caminho correto da animação
    stateMachines: "State Machine 1", // Nome da máquina de estado que você configurou no Rive
    autoplay: true,
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.Center,
    }),
  });

  // Controles dos eventos boolean e trigger
  const clicouInputBoolean = useStateMachineInput(
    rive,
    "State Machine 1",
    "Clicou_Input_boolean"
  );
  const deuEnterTrigger = useStateMachineInput(
    rive,
    "State Machine 1",
    "Deu_Enter"
  );

  // Controla o evento de foco no span
  const handleContentChange = (event: React.FormEvent<HTMLSpanElement>) => {
    let newContent = event.currentTarget.textContent || "";
    if (newContent.length > maxLength) {
      newContent = newContent.slice(0, maxLength);
    }
    if (spanRef.current) {
      spanRef.current.textContent = newContent;
    }
  };

  // Define o evento boolean quando o campo é focado
  const handleFocus = () => {
    if (clicouInputBoolean) {
      clicouInputBoolean.value = true;
    }
  };

  // Define o evento boolean quando o campo perde o foco
  const handleBlur = () => {
    if (clicouInputBoolean) {
      clicouInputBoolean.value = false;
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Evita o envio do formulário padrão

    const userInput = spanRef.current?.textContent || "";
    if (userInput.trim() === "") return; // Verifica se o campo não está vazio

    try {
      const response = await fetch("http://127.0.0.1:5000/api/diagnostico", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: userInput }),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar o diagnóstico");
      }

      const data = await response.json();
      setResponse(data.result); // Atualiza o estado com a resposta do backend

      // Limpa o campo após envio
      if (spanRef.current) {
        spanRef.current.textContent = "";
      }

      // Ativa o trigger da animação ao enviar
      if (deuEnterTrigger) {
        deuEnterTrigger.fire();
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === "Enter") {
      if (deuEnterTrigger) {
        deuEnterTrigger.fire();
      }
      event.preventDefault();
      handleSubmit(event as unknown as React.FormEvent); // Casting the event
    }
  };

  return (
    <>
      <div id="Diagnostico_Input">
        {/* Exibe a animação do Rive */}
        <RiveComponent className="rive" />

        <form onSubmit={handleSubmit}>
          <label htmlFor="span_textarea">
            <span
              id="span_textarea"
              role="textbox"
              contentEditable
              ref={spanRef}
              aria-label="Digite sua pergunta aqui"
              onInput={handleContentChange}
              onFocus={handleFocus} // Ativa o evento ao focar
              onBlur={handleBlur} // Desativa o evento ao perder o foco
              onKeyDown={handleKeyDown}
            ></span>
            <button
              type="submit"
              id="enviar_diagnostico"
              aria-label="Enviar pergunta"
            >
              <BiSolidSend
                size={20}
                style={{ transform: "rotate(-45deg)" }}
                aria-hidden="true"
              />
            </button>
          </label>
        </form>
        {response && <p>{response}</p>}
        <script>
          <>{console.log(response)}</>
        </script>
      </div>
    </>
  );
};

export default Diagnostico_Input;
