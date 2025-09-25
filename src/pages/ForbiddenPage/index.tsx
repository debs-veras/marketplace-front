import { Link } from 'react-router-dom';

export default function ForbiddenPage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-6xl font-bold text-red-600 mb-4">403</h1>
      <h2 className="text-2xl font-semibold mb-2">Acesso Negado</h2>
      <p className="text-gray-600 mb-6">
        Você não tem permissão para acessar essa página.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Voltar para Home
      </Link>
    </div>
  );
}
