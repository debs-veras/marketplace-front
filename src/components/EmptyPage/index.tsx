import { ReactNode } from 'react';
import clsx from 'clsx';
import Button from '../Button';

type Props = {
  texto?: string;
  acao?: Function;
  iconeBotao?: ReactNode;
  botao?: boolean;
  textoBotao?: string;
  classNameTexto?: string;
};

export default function EmptyPage(props: Props): ReactNode {
  const {
    texto,
    acao,
    botao,
    textoBotao = 'Adicionar',
    classNameTexto,
    iconeBotao,
  } = props;
  return (
    <div className="relative block w-full py-8 text-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
      <span
        className={clsx(
          'mt-6 mb-8 block text-md font-medium text-primary-900',
          classNameTexto
        )}
      >
        {texto}
      </span>
      {botao && (
        <Button
          onClick={() => acao && acao()}
          text={textoBotao}
          icon={iconeBotao}
          className={'inline-flex items-center'}
          type={'informacao'}
        />
      )}
    </div>
  );
}
