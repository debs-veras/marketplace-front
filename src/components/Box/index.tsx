import { useAutoAnimate } from '@formkit/auto-animate/react';
import clsx from 'clsx';
import Loading from '../Loading';
import { ReactNode } from 'react';

type Props = {
  className?: string;
  children?: React.ReactNode;
};

export const BoxContainer = ({ children, className }: Props) => {
  const [autoAnimateRef] = useAutoAnimate();

  return (
    <div
      ref={autoAnimateRef}
      className={clsx('flex gap-4 flex-col', className)}
    >
      {children}
    </div>
  );
};

type PropsBox = {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  loading?: boolean;
};

export default function Box(props: PropsBox): ReactNode {
  const { className, children, style, loading } = props;

  return (
    <div
      className={clsx( 'bg-base-100 p-4 shadow flex rounded-lg gap-y-2 flex-col',
        className
      )}
      style={style}
    >
      {children}

      {loading && <Loading />}
    </div>
  );
}
