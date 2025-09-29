import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import ScrollArea from '../../components/ScrollArea';
import Sidebar from '../Sidebar';
import { useState, useEffect } from 'react';

export default function PageLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState('Dashboard');

  // Mapeamento dinâmico das páginas
  useEffect(() => {
    const pageTitles = {
      '/dashboard': 'Dashboard',
      '/admin/register/product': 'Cadastro de Produtos',
      '/vendas/relatorios': 'Relatórios de Vendas',
      '/produtos': 'Produtos',
      '/produtos/novo': 'Novo Produto',
      '/produtos/editar': 'Editar Produto',
    };

    setCurrentPage(pageTitles[location.pathname] || 'Dashboard');
  }, [location.pathname]);

  // Breadcrumbs dinâmicos baseados na rota
  const getBreadcrumbs = () => {
    const breadcrumbMap = {
      '/dashboard': [{ name: 'Dashboard', path: '/dashboard', active: true }],
      '/admin/register/product': [
        { name: 'Admin', path: '/dashboard', active: true },
        {
          name: 'Cadastro Produto',
          path: '/admin/register/product',
          active: false,
        },
      ],
    };

    return breadcrumbMap[location.pathname] || breadcrumbMap['/dashboard'];
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <div className="h-screen flex flex-row bg-base-300">
      {/* SIDEBAR */}
      <Sidebar />

      {/* ÁREA PRINCIPAL */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* HEADER */}
        <header className=" px-6 py-4">
          <div className="flex items-center justify-between">
            {/* TÍTULO E BREADCRUMB */}
            <div className="flex flex-col space-y-2">
              <h1 className="text-xl font-semibold text-gray-900">
                {currentPage}
              </h1>

              {/* BREADCRUMB DINÂMICO */}
              <nav className="flex items-center">
                <ol className="flex items-center space-x-1 text-sm">
                  {breadcrumbs.map((item, index) => (
                    <li key={item.path} className="flex items-center">
                      {index > 0 && (
                        <span className="text-gray-400 mx-1">/</span>
                      )}
                      <button
                        onClick={() => navigate(item.path)}
                        className={`${
                          item.active
                            ? 'text-gray-900 font-medium'
                            : 'text-gray-600 hover:text-gray-900 hover:underline'
                        } transition-colors`}
                        disabled={item.active}
                      >
                        {item.name}
                      </button>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>

            {/* STATUS E AÇÕES */}
            <div className="flex items-center space-x-4">
              {/* STATUS */}
              <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full border border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-700 text-sm font-medium">
                  Online
                </span>
              </div>

              {/* NOTIFICAÇÕES */}
              <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              </button>
            </div>
          </div>
        </header>

        {/* CONTEÚDO PRINCIPAL */}
        <ScrollArea className="pb-14">
          <main className="flex flex-col">
            <Outlet />
          </main>
        </ScrollArea>
      </div>
    </div>
  );
}
