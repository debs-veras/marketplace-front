import { useAutoAnimate } from "@formkit/auto-animate/react";
import React, { ReactNode, createContext, useContext } from "react";
import ScrollArea from "../ScrollArea";
import clsx from "clsx";
import { RxFileText } from "react-icons/rx";
import { FaArrowDown } from "react-icons/fa";

export type tamanhoTitulo = "grande" | "normal" | "pequeno";
export type densidadeTipo = "normal" | "compacta";

// Contexto para propagar a densidade para todas as colunas
const DensidadeContext = createContext<densidadeTipo>("normal");

type PropsTabela = {
  titulo: string;
  tamanhoTitulo?: tamanhoTitulo;
  descricao?: string;
  children: ReactNode[];
  botoes?: ReactNode | boolean | string;
  Header?: PropsHeader;
  Body?: PropsBody;
  icone?: ReactNode;
  densidade?: densidadeTipo;
};

type PropsHeader = {
  children: Array<ReactNode | boolean>;
  Coluna?: PropsColuna;
};

type PropsColuna = {
  children: ReactNode | string;
  alignText?: string;
};

type PropsBody = {
  children?: Array<ReactNode>;
  Linha?: PropsBodyLinha;
};

type PropsBodyLinha = {
  children: ReactNode;
  Coluna?: PropsBodyLinhaColuna;
};

type PropsBodyLinhaColuna = {
  children: ReactNode;
};

function Tabela({
  titulo,
  tamanhoTitulo = "grande",
  descricao,
  children,
  botoes,
  icone,
  densidade = "normal",
}: PropsTabela): ReactNode {
  return (
    <DensidadeContext.Provider value={densidade}>
      <>
        <div className="sm:flex mx-2 sm:items-center">
          <div className="sm:flex-auto">
            <div className="flex flex-row items-center gap-2">
              {icone && <>{icone}</>}
              <h1
                className={clsx(
                  "font-semibold text-primary-900",
                  tamanhoTitulo == "normal"
                    ? "text-lg"
                    : tamanhoTitulo == "pequeno"
                    ? "text-base"
                    : "text-2xl"
                )}
              >
                {titulo}
              </h1>
            </div>
            {descricao && (
              <span className="text-sm font-normal text-base-content/70">
                {descricao}
              </span>
            )}
          </div>
          <div className="flex flex-col lg:flex-row gap-4 mt-2 lg:mt-0">
            {botoes}
          </div>
        </div>
        <div className="flow-root">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden shadow grid ring-1 ring-base-300">
                <ScrollArea paddingX="px-1 lg:px-0">
                  <table className="min-w-full table divide-y divide-base-300">
                    {children}
                  </table>
                </ScrollArea>
              </div>
            </div>
          </div>
        </div>
      </>
    </DensidadeContext.Provider>
  );
}

const Header = ({ children }: PropsHeader): ReactNode => {
  return (
    <thead className="bg-base-200">
      <tr>{children}</tr>
    </thead>
  );
};

const Coluna = ({children, alignText = "text-left"}: PropsColuna): ReactNode => {
  const densidade = useContext(DensidadeContext);
  return (
    <th
      scope="col"
      className={clsx(
        "px-3 text-sm font-semibold text-base-content",
        alignText,
        densidade === "compacta" ? "py-2" : "py-3.5"
      )}
    >
      {children}
    </th>
  );
};

const Body = ({ children }: PropsBody): ReactNode => {
  const [autoAnimateRef] = useAutoAnimate();
  return (
    <tbody
      ref={autoAnimateRef}
      className="divide-y divide-base-300 bg-base-100"
    >
      {children}
    </tbody>
  );
};

const Linha = ({ children }) => {
  return (
    <>
      <tr className="odd:bg-base-100 even:bg-base-200">
        {React.Children.map(children, (child) => {
          return child;
        })}
      </tr>
    </>
  );
};

const ColunaBody = ({ children, alignText = "text-left", detalhesOpen = undefined, className = ""}) => {
  const densidade = useContext(DensidadeContext);
  return (
    <td
      className={clsx(
        "whitespace-nowrap max-w-sm truncate px-3 text-sm text-base-content/80",
        alignText,
        className,
        densidade === "compacta" ? "py-2" : "py-4"
      )}
    >
      <div
        className={clsx(detalhesOpen != undefined && "flex items-center gap-2")}
      >
        {detalhesOpen != undefined &&
          (detalhesOpen ? (
            <RxFileText className="w-5 h-5 text-error" />
          ) : (
            <FaArrowDown className="w-5 h-5 text-primary" />
          ))}
        {children}
      </div>
    </td>
  );
};


// Mapeamento para uso
Header.Coluna = Coluna;
Linha.Coluna = ColunaBody;
Body.Linha = Linha;
Tabela.Body = Body;
Tabela.Header = Header;

export default Tabela;
