import LogoCompleta from '../../assets/logo_completa.png';

export default function FooterHomePage() {
  return (
    <footer id="contato" className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <img
                src={LogoCompleta}
                alt="Cartify"
                className="h-15 w-auto mr-3"
              />
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Loja especializada em eletrônicos com os melhores preços e
              qualidade do mercado. Entrega para todo o Brasil.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Produtos</h3>
            {[
              'Smartphones',
              'Notebooks',
              'Tablets',
              'TVs & Áudio',
              'Acessórios',
              'Gaming',
            ].map((item) => (
              <a
                key={item}
                href="#"
                className="block text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-2 transform"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Empresa</h3>
            {[
              'Sobre nós',
              'Nossa história',
              'Trabalhe conosco',
              'Blog',
              'Contato',
              'LGPD',
            ].map((item) => (
              <a
                key={item}
                href="#"
                className="block text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-2 transform"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Suporte</h3>
            {[
              'Central de ajuda',
              'Política de trocas',
              'Garantia',
              'Formas de pagamento',
              'Entregas',
              'Rastrear pedido',
            ].map((item) => (
              <a
                key={item}
                href="#"
                className="block text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-2 transform"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Cartify. Todos os direitos
                reservados.
                <span className="block text-xs text-gray-500 mt-1">
                  CNPJ: 12.345.678/0001-99
                </span>
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              {['Termos de uso', 'Privacidade', 'Cookies', 'Defensoria'].map(
                (item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-300 whitespace-nowrap"
                  >
                    {item}
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
