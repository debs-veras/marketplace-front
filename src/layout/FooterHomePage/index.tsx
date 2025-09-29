export default function FooterHomePage() {
  return (
    <footer id="contato" className="footer bg-gray-900 text-gray-300 p-10">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <i className="fas fa-bolt text-blue-400 text-2xl mr-2"></i>
              <span className="text-xl font-bold text-white">Cartify</span>
            </div>
            <p className="mb-4">
              Loja especializada em eletrônicos com os melhores preços e
              qualidade do mercado.
            </p>
            <div className="flex gap-4">
              <a className="btn btn-circle btn-outline border-gray-600 text-gray-300 hover:border-blue-400 hover:text-blue-400">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a className="btn btn-circle btn-outline border-gray-600 text-gray-300 hover:border-blue-400 hover:text-blue-400">
                <i className="fab fa-instagram"></i>
              </a>
              <a className="btn btn-circle btn-outline border-gray-600 text-gray-300 hover:border-blue-400 hover:text-blue-400">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>
          <div>
            <span className="footer-title text-white">Produtos</span>
            <a className="link link-hover hover:text-white">Smartphones</a>
            <a className="link link-hover hover:text-white">Notebooks</a>
            <a className="link link-hover hover:text-white">TVs</a>
            <a className="link link-hover hover:text-white">Áudio</a>
          </div>
          <div>
            <span className="footer-title text-white">Empresa</span>
            <a className="link link-hover hover:text-white">Sobre nós</a>
            <a className="link link-hover hover:text-white">Contato</a>
            <a className="link link-hover hover:text-white">Trabalhe conosco</a>
            <a className="link link-hover hover:text-white">Blog</a>
          </div>
          <div>
            <span className="footer-title text-white">Legal</span>
            <a className="link link-hover hover:text-white">Termos de uso</a>
            <a className="link link-hover hover:text-white">
              Política de privacidade
            </a>
            <a className="link link-hover hover:text-white">
              Política de cookies
            </a>
            <a className="link link-hover hover:text-white">Garantia</a>
          </div>
        </div>

        <div className="divider my-8 border-gray-700"></div>

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p>
            Copyright © {new Date().getFullYear()} Cartify - Todos os direitos
            reservados
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a className="link link-hover hover:text-white">Termos</a>
            <a className="link link-hover hover:text-white">Privacidade</a>
            <a className="link link-hover hover:text-white">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
