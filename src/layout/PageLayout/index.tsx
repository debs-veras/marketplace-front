import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import ScrollArea from '../../components/ScrollArea';
import Logo from '../../assets/logo_simples.png';
import Sidebar from '../Sidebar';
import clsx from 'clsx';
import {
  BiExit,
  BiMoon,
  BiSun,
  BiChevronLeft,
  BiChevronRight,
} from 'react-icons/bi';

export default function PageLayout() {
  const navigate = useNavigate();

  const [menuAberto, setMenuAberto] = useState<boolean>(() => {
    const v = localStorage.getItem('menuAberto');
    return v == null ? true : v === 'true';
  });

  useEffect(() => {
    localStorage.setItem('menuAberto', String(menuAberto));
  }, [menuAberto]);

  function handleSair(): void {
    navigate(`/login`);
  }

  return (
    <div className="overflow-hidden h-screen flex flex-col w-screen relative">
      <div className="w-full h-full flex flex-row gap-0">
        {/* SIDEBAR */}
        <aside
          className={clsx(
            'select-none shadow transition-all duration-300 focus:outline-none overflow-hidden',
            menuAberto ? 'w-[14vw] min-w-fit' : 'w-16',
            'h-full bg-base-200 flex flex-col gap-2'
          )}
        >
          <div
            className={clsx(
              'flex items-center transition-all duration-300 mt-5 mx-2 rounded-2xl p-2',
              menuAberto ? 'justify-between' : 'justify-center flex-col gap-2'
            )}
          >
            <img
              src={Logo}
              alt="Logo"
              className={clsx(
                'object-contain transition-all duration-300',
                menuAberto ? 'w-20' : 'w-8'
              )}
            />

            <button
              onClick={() => setMenuAberto(!menuAberto)}
              className="btn btn-ghost btn-sm btn-circle"
              id="botaoMenu"
            >
              {menuAberto ? (
                <BiChevronLeft className="h-6 w-6 text-gray-600" />
              ) : (
                <BiChevronRight className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>

          <ScrollArea paddingX="p-1">
            <Sidebar menuAberto={menuAberto} />
          </ScrollArea>
        </aside>

        <div className="w-full h-full">
          <div className="h-fit w-full flex gap-4 items-center justify-end bg-base-100 py-2 px-4">
            <div className="flex gap-2">
              <button className="btn btn-ghost btn-circle">
                <label className="swap swap-rotate">
                  <input
                    type="checkbox"
                    className="theme-controller"
                    value="dark"
                  />
                  <BiSun className="swap-off h-5 w-5 fill-current" />
                  <BiMoon className="swap-on h-5 w-5 fill-current" />
                </label>
              </button>

              <button onClick={handleSair} className="btn btn-soft btn-error">
                Sair
                <BiExit />
              </button>
            </div>
          </div>
          {/* MAIN */}
          <ScrollArea className="pb-14">
            <main className="flex flex-col gap-4 py-4">
              <Outlet />
            </main>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
