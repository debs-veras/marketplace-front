import clsx from 'clsx';
import {
  BiHome,
  BiTrendingUp,
  BiUser,
  BiCog,
  BiChart,
  BiChevronLeft,
  BiChevronRight,
  BiExit,
  BiMoon,
  BiSun,
} from 'react-icons/bi';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import * as Tooltip from '@radix-ui/react-tooltip';
import LogoSimples from '../../assets/logo_simples.png';
import LogoCompleta from '../../assets/logo_completa.png';
import { useEffect, useState } from 'react';
import ScrollArea from '../../components/ScrollArea';

export default function Sidebar() {
  const [menuAberto, setMenuAberto] = useState<boolean>(() => {
    const v = localStorage.getItem('menuAberto');
    return v == null ? true : v === 'true';
  });

  const [tema, setTema] = useState<'light' | 'dark'>('light');
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: <BiHome className="w-6 h-6" />, label: 'Dashboard', path: '/' },
    {
      icon: <BiTrendingUp className="w-6 h-6" />,
      label: 'Analytics',
      path: '/analytics',
    },
    {
      icon: <BiChart className="w-6 h-6" />,
      label: 'Reports',
      path: '/reports',
    },
    {
      icon: <BiUser className="w-6 h-6" />,
      label: 'Profile',
      path: '/profile',
    },
    {
      icon: <BiCog className="w-6 h-6" />,
      label: 'Settings',
      path: '/settings',
    },
  ];

  useEffect(() => {
    localStorage.setItem('menuAberto', String(menuAberto));
  }, [menuAberto]);

  function toggleTema() {
    const novoTema = tema === 'light' ? 'dark' : 'light';
    setTema(novoTema);
    document.documentElement.setAttribute('data-theme', novoTema); // DaisyUI compatível
  }

  function handleLogout() {
    navigate('/login');
  }

  return (
    <aside
      className={clsx(
        'select-none shadow-md transition-all duration-300 h-full bg-base-100 flex flex-col',
        menuAberto ? 'w-[15vw] min-w-[220px]' : 'w-20'
      )}
    >
      {/* Header */}
      <div
        className={clsx(
          'flex items-center transition-all duration-300 mt-5 rounded-2xl px-3 py-2 flex-shrink-0',
          menuAberto ? 'justify-between' : 'justify-center flex-col gap-3'
        )}
      >
        <img
          src={menuAberto ? LogoCompleta : LogoSimples}
          alt="Logo"
          className={clsx(
            'object-contain transition-all duration-300',
            menuAberto ? 'w-32' : 'w-12'
          )}
        />

        <button
          onClick={() => setMenuAberto(!menuAberto)}
          className="btn btn-ghost btn-circle btn-sm hover:bg-primary/15 transition-colors flex-shrink-0"
          id="botaoMenu"
        >
          {menuAberto ? (
            <BiChevronLeft className="w-6 h-6  text-primary" />
          ) : (
            <BiChevronRight className="w-6 h-6 text-primary" />
          )}
        </button>
      </div>

      {/* Scroll Area apenas para conteúdo vertical */}
      <div className="flex-1 min-h-0 py-3">
        <ScrollArea paddingX="px-2">
          <nav className="space-y-1">
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.path;

              return (
                <Tooltip.Provider key={index} delayDuration={200}>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <div className="w-full">
                        <NavLink
                          to={item.path}
                          className={clsx(
                            'group relative flex items-center transition-all duration-200 rounded-lg w-full',
                            'hover:bg-primary/15',
                            menuAberto
                              ? 'px-3 py-2 gap-3 justify-start'
                              : 'p-2 justify-center',
                            isActive &&
                              'bg-primary/10 border-l-4 border-primary'
                          )}
                        >
                          <div
                            className={clsx(
                              'flex-shrink-0 transition-colors duration-200',
                              isActive
                                ? 'text-primary'
                                : 'text-base-content/70 group-hover:text-base-content'
                            )}
                          >
                            {item.icon}
                          </div>
                          <span
                            className={clsx(
                              'font-medium text-sm transition-all duration-200 whitespace-nowrap',
                              menuAberto
                                ? 'opacity-100 max-w-[200px] block'
                                : 'opacity-0 max-w-0 overflow-hidden'
                            )}
                          >
                            {item.label}
                          </span>
                        </NavLink>
                      </div>
                    </Tooltip.Trigger>

                    {!menuAberto && (
                      <Tooltip.Portal>
                        <Tooltip.Content
                          side="right"
                          sideOffset={5}
                          align="center"
                          className="px-3 py-2 rounded-md bg-neutral text-neutral-content text-sm font-medium shadow-lg z-50"
                        >
                          {item.label}
                          <Tooltip.Arrow className="fill-neutral" />
                        </Tooltip.Content>
                      </Tooltip.Portal>
                    )}
                  </Tooltip.Root>
                </Tooltip.Provider>
              );
            })}
          </nav>
        </ScrollArea>
      </div>

      {/* User + Ações */}
      <div className="border-t border-base-300 flex-shrink-0 px-3 py-4">
        <div
          className={clsx(
            'flex items-center transition-all duration-200',
            menuAberto ? 'justify-between' : 'justify-center flex-col gap-3'
          )}
        >
          {/* Avatar + Email */}
          <div
            className={clsx(
              'flex items-center gap-2 overflow-hidden',
              !menuAberto && 'justify-center'
            )}
          >
            <div className="w-9 h-9 bg-primary/10 text-primary rounded-full flex items-center justify-center font-semibold">
              A
            </div>

            {menuAberto && (
              <div className="min-w-0 flex-1">
                <p className="text-sm text-base-content/70 truncate">
                  admin@exemplo.com
                </p>
              </div>
            )}
          </div>

          {/* Botões (Tema + Logout) */}
          <div className={clsx('flex items-center', !menuAberto && 'flex-col')}>
            <button
              onClick={toggleTema}
              className="btn btn-ghost btn-circle btn-sm hover:bg-base-300"
              title="Alterar tema"
            >
              {tema === 'dark' ? (
                <BiSun className="w-5 h-5 text-warning" />
              ) : (
                <BiMoon className="w-5 h-5 text-info" />
              )}
            </button>

            <button
              onClick={handleLogout}
              className="btn btn-ghost btn-circle btn-sm hover:bg-error/20"
              title="Sair"
            >
              <BiExit className="w-5 h-5 text-error" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
