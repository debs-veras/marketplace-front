import { RxChevronRight, RxChevronLeft } from 'react-icons/rx';
import Button from '../Button';
import { ReactNode } from 'react';

type Props = {
  page: number;
  totalPage: number;
  totalRegister: number;
  registerForPage: number;
  onClickPaginaPrev: Function;
  onClickPageNext: Function;
  onClickPage: Function;
  className?: string;
  loading: boolean;
};

export default function PageTable(props: Props): ReactNode {
  const {
    page,
    totalPage,
    totalRegister,
    registerForPage,
    onClickPaginaPrev,
    onClickPageNext,
    onClickPage,
    className,
    loading,
  } = props;

  const registroInicialAtual = page * registerForPage + 1;
  const registroFinalAtual =
    (page + 1) * registerForPage > totalRegister
      ? totalRegister
      : (page + 1) * registerForPage;

  const renderBotaoPaginaAnterior = (
    posicao: number,
    onClickPagina: Function
  ): ReactNode => (
    <Button
      text={(page - posicao + 1).toString()}
      onClick={() => onClickPagina(page - posicao)}
      className="bg-white disabled:cursor-wait disabled:bg-gray-100 border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
      disabled={loading}
    />
  );

  const renderBotaoPaginaPosterior = (posicao, onClickPagina) => (
    <Button
      text={page + posicao + 1}
      disabled={loading}
      onClick={() => onClickPagina(page + posicao)}
      className="bg-white disabled:cursor-wait disabled:bg-gray-100 border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
    />
  );

  return (
    <div
      className={`select-none -mx-4 px-4 pt-4 flex items-center border-t border-gray-200 justify-between rounded-b-lg ${className}`}
    >
      <div className="flex-1 flex justify-between sm:hidden">
        {page > 0 && (
          <Button
            text="Anterior"
            onClick={() => onClickPaginaPrev()}
            className="relative disabled:cursor-wait disabled:bg-gray-100 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            disabled={loading}
          />
        )}

        {page + 1 < totalPage && (
          <Button
            text="Próximo"
            onClick={() => onClickPageNext()}
            className="relative disabled:cursor-wait disabled:bg-gray-100 inline-flex items-center ml-auto px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            disabled={loading}
          />
        )}
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Mostrando
            <span className="font-medium">
              {registroFinalAtual ? registroInicialAtual : 0}
            </span>
            até <span className="font-medium">{registroFinalAtual}</span> de{' '}
            <span className="font-medium">{totalRegister}</span> resultados
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            {page > 0 && (
              <Button
                text="Anterior"
                onClick={() => onClickPaginaPrev()}
                className="relative disabled:cursor-wait disabled:bg-gray-100 inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                icon={<RxChevronLeft className="h-5 w-5" aria-hidden="true" />}
                classNameText="sr-only"
                disabled={loading}
              />
            )}

            {page > 1 && (
              <Button
                text="1"
                onClick={() => onClickPage(0)}
                className="bg-white disabled:cursor-wait disabled:bg-gray-100 border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                disabled={loading}
              />
            )}
            {page > 2 && (
              <span className="relative inline-flex rounded-md items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                ...
              </span>
            )}

            {page > 0 && renderBotaoPaginaAnterior(1, onClickPage)}
            <span className="z-10 bg-blue-50 rounded-md border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
              {page + 1}
            </span>
            {page + 1 < totalPage && renderBotaoPaginaPosterior(1, onClickPage)}

            {page + 3 < totalPage && (
              <span className="relative inline-flex rounded-md items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                ...
              </span>
            )}
            {page + 2 < totalPage && (
              <Button
                text={totalPage.toString()}
                onClick={() => onClickPage(totalPage - 1)}
                className="bg-white disabled:cursor-wait disabled:bg-gray-100 border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                disabled={loading}
              />
            )}

            {page + 1 < totalPage && (
              <Button
                text="Proximo"
                onClick={() => onClickPageNext()}
                className="relative inline-flex disabled:cursor-wait disabled:bg-gray-100 items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                classNameText="sr-only"
                icon={<RxChevronRight className="h-5 w-5" aria-hidden="true" />}
                disabled={loading}
              />
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}
