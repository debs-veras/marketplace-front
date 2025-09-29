import clsx from 'clsx';
import React, { forwardRef, ReactNode } from 'react';

type Props = {
  id?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  loading?: boolean;
  disabled?: boolean;
  type?: 'erro' | 'sucesso' | 'padrao' | 'aviso' | 'informacao';
  text?: string | ReactNode;
  icon?: ReactNode;
  className?: string;
  classNameText?: string;
  children?: ReactNode | ReactNode[] | string;
};

const Button = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const {
    id,
    onClick,
    loading = false,
    disabled = false,
    type,
    text,
    icon,
    className = '',
    classNameText = '',
    children,
  } = props;

  // Mapeamento de tipo para classe do DaisyUI
  const typeClass = clsx({
    'btn btn-primary': type === 'sucesso',
    'btn btn-error': type === 'erro',
    'btn btn-outline': type === 'padrao',
    'btn btn-warning': type === 'aviso',
    'btn btn-info': type === 'informacao',
  });

  return (
    <button
      ref={ref}
      id={id}
      type="button"
      onClick={onClick}
      disabled={loading || disabled}
      className={clsx(
        'flex gap-2 items-center justify-center rounded-md text-sm font-medium disabled:cursor-not-allowed',
        typeClass,
        className
      )}
    >
      {loading ? (
        <svg
          className="animate-spin h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : (
        icon
      )}
      {!!text && <span className={clsx(classNameText, '')}>{text}</span>}
      {children}
    </button>
  );
});

export default Button;
