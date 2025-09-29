import { useState, useEffect } from 'react';
import {
  BiCart,
  BiSearch,
  BiUser,
  BiChevronDown,
  BiChart,
  BiPackage,
} from 'react-icons/bi';
import LogoFull from '../../assets/logo_completa.png';
import { useAuth } from '../../context/authContext';

// Tipagem para o menu
interface MenuItem {
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  href: string;
  className?: string;
}

// Configuração dos menus
const menuConfig = {
  user: [
    {
      icon: BiCart,
      label: 'Meu Carrinho',
      href: 'user/minhas-compras',
      className: 'hover:bg-base-200 rounded-lg',
    },
  ],
  admin: [
    {
      icon: BiChart,
      label: 'Dashboard',
      href: '/admin/dashboard',
      className: 'hover:bg-base-200 rounded-lg',
    },
    {
      icon: BiPackage,
      label: 'Gerenciar Produtos',
      href: '/admin/listing/product',
      className: 'hover:bg-base-200 rounded-lg',
    },
  ],
};

export default function HeaderHomePage() {
  const [search, setSearch] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Buscando por:', search);
  };

  // Obtém os itens do menu baseado no role do usuário
  const getMenuItems = (): MenuItem[] => {
    if (!user) return [];
    return menuConfig[user.role as keyof typeof menuConfig] || [];
  };

  const menuItems = getMenuItems();

  return (
    <header
      className={`w-full sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'shadow-lg border-b border-base-300/50 backdrop-blur-md bg-base-100/95'
          : 'shadow-sm bg-base-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Linha principal */}
        <div className="flex items-center justify-between gap-4 py-3">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-3 flex-shrink-0 hover:opacity-90 transition"
          >
            <img
              src={LogoFull}
              alt="Cartify"
              className="h-10 sm:h-12 object-contain"
            />
          </a>

          {/* Busca (desktop) */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-6">
            <form onSubmit={handleSearch} className="w-full">
              <div className="flex items-center w-full rounded-full border-2 border-base-300 bg-base-100 shadow-sm focus-within:border-primary focus-within:shadow-md transition-all duration-200">
                <input
                  type="text"
                  placeholder="Buscar produtos, marcas..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 h-11 px-5 rounded-l-full bg-transparent focus:outline-none text-sm placeholder:text-base-content/60"
                />
                <button
                  type="submit"
                  className="h-11 px-6 flex items-center justify-center rounded-r-full bg-gradient-to-r from-primary to-primary-focus text-white hover:shadow-lg transition-all hover:scale-105"
                >
                  <BiSearch size={20} />
                </button>
              </div>
            </form>
          </div>

          {/* Ações */}
          <div className="flex items-center gap-3">
            {/* Carrinho - apenas para usuários comuns */}
            {user?.role === 'user' && (
              <div className="indicator">
                <span className="indicator-item badge badge-primary badge-sm animate-pulse">
                  2
                </span>
                <button className="btn btn-ghost btn-circle hover:bg-base-200 transition relative">
                  <BiCart size={22} />
                </button>
              </div>
            )}

            {/* Usuário */}
            {user ? (
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="flex items-center gap-3 px-3 py-2 rounded-full hover:bg-base-200 cursor-pointer"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-focus rounded-full flex items-center justify-center text-white font-semibold shadow">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="hidden sm:flex flex-col items-start text-sm leading-tight">
                    <span className="font-semibold">{user.name}</span>
                    <span className="text-xs opacity-70 capitalize">
                      {user.role.toLowerCase()}
                    </span>
                  </div>
                  <BiChevronDown size={16} className="text-base-content/70" />
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-xl w-56 mt-2 border border-base-300"
                >
                  {/* Itens do menu baseados no role */}
                  {menuItems.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <li key={index}>
                        <a
                          href={item.href}
                          className={`flex items-center gap-3 ${item.className}`}
                        >
                          <IconComponent size={18} />
                          {item.label}
                        </a>
                      </li>
                    );
                  })}

                  {/* Separador e logout - comum para todos */}
                  {menuItems.length > 0 && <div className="divider my-1"></div>}
                  <li>
                    <a
                      className="text-error hover:bg-error/10 rounded-lg font-medium"
                      onClick={() => {
                        logout();
                      }}
                    >
                      Sair
                    </a>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="btn btn-primary rounded-full px-5 gap-2 shadow hover:shadow-md hover:scale-105 transition"
                >
                  <BiUser size={18} />
                  Entrar
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-xl w-48 mt-2 border border-base-300"
                >
                  <li>
                    <a
                      href="/login/user"
                      className="flex items-center gap-3 hover:bg-base-200 rounded-lg py-2"
                    >
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                        <BiUser size={16} className="text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">Usuário</div>
                        <div className="text-xs opacity-70">
                          Comprar produtos
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/login/admin"
                      className="flex items-center gap-3 hover:bg-base-200 rounded-lg py-2"
                    >
                      <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center">
                        <BiUser size={16} className="text-secondary" />
                      </div>
                      <div>
                        <div className="font-medium">Administrador</div>
                        <div className="text-xs opacity-70">Gerenciar loja</div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Busca (mobile) */}
        <div className="md:hidden pb-3">
          <form onSubmit={handleSearch}>
            <div className="flex items-center w-full rounded-full border-2 border-base-300 bg-base-100 shadow-sm focus-within:border-primary focus-within:shadow-md transition">
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 h-11 px-4 rounded-l-full bg-transparent focus:outline-none text-sm"
              />
              <button
                type="submit"
                className="h-11 px-5 flex items-center justify-center rounded-r-full bg-gradient-to-r from-primary to-primary-focus text-white hover:shadow-md transition"
              >
                <BiSearch size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Navegação */}
      <nav className="bg-base-200/60 border-t border-base-300/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-6 py-3 text-sm font-medium overflow-x-auto scrollbar-hide">
            {[
              { name: 'Celulares', href: '#' },
              { name: 'Computadores', href: '#' },
              { name: 'Games', href: '#' },
              { name: 'TVs', href: '#' },
              { name: 'Áudio', href: '#' },
              { name: 'Acessórios', href: '#' },
              { name: 'Smart Home', href: '#' },
              {
                name: 'Ofertas',
                href: '#',
                className: 'text-red-500 font-bold',
              },
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`whitespace-nowrap hover:text-primary transition-colors ${item.className || ''}`}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
