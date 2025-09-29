// Header/index.jsx
export default function HeaderAdmin() {
  return (
    <header className="bg-base-100 shadow-sm z-10">
      <div className="flex items-center justify-between p-4">
        <div>
          <h1 className="text-xl font-semibold">Bem-vindo, Vendedor!</h1>
        </div>
        <div className="flex items-center space-x-4">
          {/* Ícone de notificação ou outros elementos */}
          <button className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="https://via.placeholder.com/40" alt="User Avatar" />
              </div>
            </label>
            <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
              <li><a>Perfil</a></li>
              <li><a>Configurações</a></li>
              <li><a>Sair</a></li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}