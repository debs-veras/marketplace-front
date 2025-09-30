import clsx from 'clsx';
import {
  BiHome,
  BiChevronLeft,
  BiChevronRight,
  BiExit,
  BiMoon,
  BiSun,
  BiChevronDown,
  BiBox,
} from 'react-icons/bi';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import * as Tooltip from '@radix-ui/react-tooltip';
import LogoSimples from '../../assets/logo_simples.png';
import LogoCompleta from '../../assets/logo_completa.png';
import { useEffect, useState } from 'react';
import ScrollArea from '../../components/ScrollArea';
import { useAuth } from '../../context/authContext';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();
  const [menuOpen, setMenuOpen] = useState<boolean>(() => {
    const v = localStorage.getItem('menuOpen');
    return v == null ? true : v === 'true';
  });
  const [thema, setThema] = useState<'light' | 'dark'>(() => {
    const salvo = localStorage.getItem('thema');
    return salvo === 'dark' ? 'dark' : 'light';
  });
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});

  const menuItems = [
    {
      icon: <BiHome className="w-6 h-6" />,
      label: 'Dashboard',
      path: '/admin/dashboard',
    },
    {
      icon: <BiBox className="w-6 h-6" />,
      label: 'Produtos',
      path: '/products',
      subItems: [
        {
          label: 'Cadastrar Produto',
          path: '/admin/register/product',
        },
        {
          label: 'Listagem de Produtos',
          path: '/admin/listing/product',
        },
      ],
    },
  ];

  function toggleThema() {
    const newThema = thema === 'light' ? 'dark' : 'light';
    setThema(newThema);
    document.documentElement.setAttribute('data-theme', newThema);
  }

  function handleLogout() {
    navigate('login/admin');
    logout();
  }

  const toggleSubmenu = (label: string) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const isSubmenuActive = (subItems: Array<{ path: string }>) => {
    return subItems.some((item) => location.pathname === item.path);
  };

  // Função para obter as iniciais do usuário
  const getUserInitials = () => {
    if (!user?.name) return 'U';
    return user.name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', thema);
    localStorage.setItem('thema', thema);
  }, [thema]);

  useEffect(() => {
    localStorage.setItem('menuOpen', String(menuOpen));
  }, [menuOpen]);

  return (
    <aside
      className={clsx(
        'select-none shadow-md transition-all duration-300 h-full bg-base-100 flex flex-col',
        menuOpen ? 'w-[15vw] min-w-[220px]' : 'w-20'
      )}
    >
      {/* Header */}
      <div
        className={clsx(
          'flex items-center transition-all duration-300 mt-5 rounded-2xl px-3 py-2 flex-shrink-0',
          menuOpen ? 'justify-between' : 'justify-center flex-col gap-3'
        )}
      >
        <img
          src={menuOpen ? LogoCompleta : LogoSimples}
          alt="Logo"
          className={clsx(
            'object-contain transition-all duration-300',
            menuOpen ? 'w-32' : 'w-12'
          )}
        />

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="btn btn-ghost btn-circle btn-sm hover:bg-primary/15 transition-colors flex-shrink-0"
          id="botaoMenu"
        >
          {menuOpen ? (
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
              const hasSubItems = item.subItems && item.subItems.length > 0;
              const isActive =
                location.pathname === item.path ||
                (hasSubItems && isSubmenuActive(item.subItems!));
              const isSubmenuOpen = openSubmenus[item.label];

              return (
                <Tooltip.Provider key={index} delayDuration={200}>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <div className="w-full">
                        {hasSubItems ? (
                          // Item com submenu
                          <button
                            onClick={() => toggleSubmenu(item.label)}
                            className={clsx(
                              'group relative flex items-center transition-all duration-200 rounded-lg w-full',
                              'hover:bg-primary/15',
                              menuOpen
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
                                menuOpen
                                  ? 'opacity-100 max-w-[200px] block'
                                  : 'opacity-0 max-w-0 overflow-hidden'
                              )}
                            >
                              {item.label}
                            </span>

                            {menuOpen && (
                              <BiChevronDown
                                className={clsx(
                                  'w-4 h-4 transition-transform duration-200',
                                  isSubmenuOpen && 'rotate-180'
                                )}
                              />
                            )}
                          </button>
                        ) : (
                          // Item simples
                          <NavLink
                            to={item.path}
                            className={clsx(
                              'group relative flex items-center transition-all duration-200 rounded-lg w-full',
                              'hover:bg-primary/15',
                              menuOpen
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
                                menuOpen
                                  ? 'opacity-100 max-w-[200px] block'
                                  : 'opacity-0 max-w-0 overflow-hidden'
                              )}
                            >
                              {item.label}
                            </span>
                          </NavLink>
                        )}
                      </div>
                    </Tooltip.Trigger>

                    {!menuOpen && (
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

                  {/* Submenu Items */}
                  {hasSubItems && menuOpen && isSubmenuOpen && (
                    <div className="ml-6 mt-1 space-y-1 border-l-2 border-base-300 pl-2">
                      {item.subItems!.map((subItem, subIndex) => {
                        const isSubItemActive =
                          location.pathname === subItem.path;

                        return (
                          <NavLink
                            key={subIndex}
                            to={subItem.path}
                            className={clsx(
                              'group flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 w-full',
                              'hover:bg-primary/10 text-sm',
                              isSubItemActive
                                ? 'text-primary font-medium bg-primary/5'
                                : 'text-base-content/70 hover:text-base-content'
                            )}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
                            <span>{subItem.label}</span>
                          </NavLink>
                        );
                      })}
                    </div>
                  )}
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
            menuOpen ? 'justify-between' : 'justify-center flex-col gap-3'
          )}
        >
          {/* Avatar + Dados do usuário */}
          <div
            className={clsx(
              'flex items-center gap-2 overflow-hidden',
              !menuOpen && 'justify-center'
            )}
          >
            <div className="w-9 h-9 bg-gradient-to-br from-primary to-primary-focus text-white rounded-full flex items-center justify-center font-semibold flex-shrink-0 text-sm">
              {getUserInitials()}
            </div>

            {menuOpen && (
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-base-content truncate">
                  {user?.name || 'Usuário'}
                </p>
                <p className="text-xs text-base-content/60 truncate">
                  {user?.email || 'user@example.com'}
                </p>
                <p className="text-xs text-primary/80 font-medium capitalize mt-0.5">
                  {user?.role || 'admin'}
                </p>
              </div>
            )}
          </div>

          {/* Botões (Tema + Logout) */}
          <div className={clsx('flex items-center gap-1', !menuOpen && 'flex-col gap-2')}>
            <Tooltip.Provider delayDuration={200}>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <button
                    onClick={toggleThema}
                    className="btn btn-ghost btn-circle btn-sm hover:bg-base-300 transition-colors"
                  >
                    {thema === 'dark' ? (
                      <BiSun className="w-5 h-5 text-warning" />
                    ) : (
                      <BiMoon className="w-5 h-5 text-info" />
                    )}
                  </button>
                </Tooltip.Trigger>
                {!menuOpen && (
                  <Tooltip.Portal>
                    <Tooltip.Content
                      side="right"
                      sideOffset={5}
                      className="px-3 py-2 rounded-md bg-neutral text-neutral-content text-sm font-medium shadow-lg z-50"
                    >
                      Alterar tema
                      <Tooltip.Arrow className="fill-neutral" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                )}
              </Tooltip.Root>
            </Tooltip.Provider>

            <Tooltip.Provider delayDuration={200}>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <button
                    onClick={handleLogout}
                    className="btn btn-ghost btn-circle btn-sm hover:bg-error/20 transition-colors"
                  >
                    <BiExit className="w-5 h-5 text-error" />
                  </button>
                </Tooltip.Trigger>
                {!menuOpen && (
                  <Tooltip.Portal>
                    <Tooltip.Content
                      side="right"
                      sideOffset={5}
                      className="px-3 py-2 rounded-md bg-neutral text-neutral-content text-sm font-medium shadow-lg z-50"
                    >
                      Sair
                      <Tooltip.Arrow className="fill-neutral" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                )}
              </Tooltip.Root>
            </Tooltip.Provider>
          </div>
        </div>
      </div>
    </aside>
  );
}