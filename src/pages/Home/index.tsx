// App.tsx
import React, { useState, useEffect } from 'react';
import HeaderHomePage from '../../layout/HeaderHomePage';

// Interfaces TypeScript
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  image: string;
  category: string;
  rating: number;
  features: string[];
}

interface Testimonial {
  id: number;
  name: string;
  comment: string;
  rating: number;
  avatar: string;
  position: string;
}

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const HomePage: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  // Efeito para detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dados dos produtos
  const products: Product[] = [
    {
      id: 1,
      name: 'Smartphone Galaxy Pro',
      description: 'Tela de 6.7 polegadas, 128GB, Câmera Tripla 108MP',
      price: 899.99,
      discountPrice: 749.99,
      image:
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80',
      category: 'Smartphones',
      rating: 4.5,
      features: ['6.7" Super AMOLED', '128GB Storage', 'Triple Camera'],
    },
    {
      id: 2,
      name: 'Notebook Ultra Slim',
      description: 'Intel i7, 16GB RAM, SSD 512GB, Tela 15.6"',
      price: 1299.99,
      image:
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80',
      category: 'Notebooks',
      rating: 4.8,
      features: ['Intel i7', '16GB RAM', '512GB SSD'],
    },
    {
      id: 3,
      name: 'Fone de Ouvido Wireless Pro',
      description: 'Cancelamento de ruído ativo, Bateria de 30h',
      price: 199.99,
      discountPrice: 159.99,
      image:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      category: 'Áudio',
      rating: 4.3,
      features: ['ANC', '30h Battery', 'Bluetooth 5.2'],
    },
    {
      id: 4,
      name: 'Smart TV 4K 55"',
      description: 'Android TV, HDR10, Dolby Audio, Controle por Voz',
      price: 699.99,
      image:
        'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      category: 'TVs',
      rating: 4.6,
      features: ['4K HDR', 'Android TV', 'Dolby Audio'],
    },
    {
      id: 5,
      name: 'Tablet Pro 10.5"',
      description: '128GB, Caneta incluída, Tela Retina, 12h de bateria',
      price: 499.99,
      discountPrice: 449.99,
      image:
        'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      category: 'Tablets',
      rating: 4.4,
      features: ['10.5" Display', '128GB', 'Stylus Included'],
    },
    {
      id: 6,
      name: 'Smartwatch Fitness Pro',
      description: 'Monitor cardíaco, Resistente à água, GPS integrado',
      price: 299.99,
      image:
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1099&q=80',
      category: 'Wearables',
      rating: 4.2,
      features: ['Heart Monitor', 'Waterproof', 'GPS'],
    },
  ];

  // Dados dos depoimentos
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Maria Silva',
      comment:
        'Comprei um notebook e o processo foi incrivelmente fácil. Entrega rápida e produto de alta qualidade! Recomendo a Cartify para todos.',
      rating: 5,
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      position: 'Designer Gráfica',
    },
    {
      id: 2,
      name: 'João Santos',
      comment:
        'Excelente atendimento e preços competitivos. Já recomendei para todos os meus amigos! A Cartify se tornou minha loja de confiança.',
      rating: 4,
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      position: 'Desenvolvedor',
    },
    {
      id: 3,
      name: 'Ana Costa',
      comment:
        'Produtos de última geração com ótimos preços. A entrega foi super rápida! Com certeza voltarei a comprar na Cartify.',
      rating: 5,
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      position: 'Empresária',
    },
  ];

  // Dados dos recursos
  const features: Feature[] = [
    {
      icon: '🚀',
      title: 'Entrega Expressa',
      description: 'Receba em até 24h com nosso serviço premium de entrega',
    },
    {
      icon: '🔒',
      title: 'Compra Segura',
      description: 'Seus dados protegidos com criptografia de última geração',
    },
    {
      icon: '💎',
      title: 'Qualidade Premium',
      description: 'Produtos testados e aprovados com garantia estendida',
    },
    {
      icon: '📞',
      title: 'Suporte 24/7',
      description: 'Nossa equipe está sempre disponível para ajudar',
    },
  ];

  // Função para renderizar estrelas de avaliação
  const renderRating = (rating: number) => {
    return (
      <div className="rating rating-sm">
        {[...Array(5)].map((_, i) => (
          <input
            key={i}
            type="radio"
            className="mask mask-star-2 bg-orange-400"
            checked={i < Math.floor(rating)}
            readOnly
          />
        ))}
        <span className="ml-2 text-sm font-medium">{rating.toFixed(1)}</span>
      </div>
    );
  };

  // Função para formatar preço
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  // Produtos em destaque (oferta)
  const featuredProducts = products.filter((p) => p.discountPrice);

  // Avançar slide do carousel
  const nextSlide = () => {
    setActiveSlide((prev) =>
      prev === featuredProducts.length - 1 ? 0 : prev + 1
    );
  };

  // Retroceder slide do carousel
  const prevSlide = () => {
    setActiveSlide((prev) =>
      prev === 0 ? featuredProducts.length - 1 : prev - 1
    );
  };

  const [cartItemsCount, setCartItemsCount] = useState(3);
  const [currentSection, setCurrentSection] = useState('home');

  const handleNavigate = (section: string) => {
    setCurrentSection(section);
    // Aqui você pode adicionar lógica de roteamento ou scroll para seções
  };

  const handleCartClick = () => {
    // Lógica para abrir o carrinho
    console.log('Abrir carrinho de compras');
  };

  // Efeito para auto-rotacionar o carousel
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     nextSlide();
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, [activeSlide]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 font-sans">
      {/* Header */}
      <HeaderHomePage />

      {/* Hero Section */}
      <section className="hero min-h-screen relative overflow-hidden">
        <div className="hero-content text-center relative z-10 py-20">
          <div className="max-w-4xl">
            <div className="inline-flex items-center bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <i className="fas fa-star mr-2"></i>
              <span>Loja de Eletrônicos Nº 1 em Satisfação</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Tecnologia de Ponta ao Seu Alcance
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Descubra os melhores eletrônicos com preços imbatíveis.
              Smartphones, notebooks, TVs e muito mais com a qualidade e
              garantia Cartify!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button className="btn btn-primary btn-lg bg-gradient-to-r from-blue-500 to-purple-500 border-0 text-white hover:from-blue-600 hover:to-purple-600 transition-all">
                <i className="fas fa-tag mr-2"></i> Ver Ofertas
              </button>
              <button className="btn btn-outline btn-lg border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all">
                <i className="fas fa-play-circle mr-2"></i> Conhecer Mais
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-gray-600">
              <div className="flex items-center">
                <i className="fas fa-shipping-fast text-blue-500 text-xl mr-2"></i>
                <span>Entrega Rápida</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-shield-alt text-blue-500 text-xl mr-2"></i>
                <span>Compra Segura</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-award text-blue-500 text-xl mr-2"></i>
                <span>Garantia Estendida</span>
              </div>
            </div>
          </div>
        </div>

        {/* Elementos de fundo decorativos */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
      </section>

      {/* Features Section */}
      {/* <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Por que escolher a Cartify?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Oferecemos a melhor experiência de compra em eletrônicos, com produtos de qualidade, preços competitivos e suporte especializado.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
                <div className="card-body items-center text-center p-8">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="card-title text-xl mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Products Section */}
      <section
        id="produtos"
        className="py-20 bg-gradient-to-br from-blue-50 to-purple-50"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Produtos em Destaque
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Descubra a mais recente tecnologia com os melhores preços do
              mercado
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="card bg-white shadow-xl hover:shadow-2xl transition-all duration-300 product-card border border-gray-100"
              >
                <figure className="px-6 pt-6 relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="rounded-xl h-48 w-full object-cover"
                  />
                  {product.discountPrice && (
                    <div className="badge badge-primary absolute top-6 right-6 text-white border-0">
                      -
                      {Math.round(
                        (1 - product.discountPrice / product.price) * 100
                      )}
                      %
                    </div>
                  )}
                  <div className="badge badge-outline absolute top-6 left-6">
                    {product.category}
                  </div>
                </figure>
                <div className="card-body">
                  <h3 className="card-title text-lg">{product.name}</h3>
                  <p className="text-gray-600 text-sm">{product.description}</p>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {product.features.map((feature, idx) => (
                      <span key={idx} className="badge badge-outline badge-sm">
                        {feature}
                      </span>
                    ))}
                  </div>

                  {renderRating(product.rating)}

                  <div className="card-actions justify-between items-center mt-4">
                    <div className="flex flex-col">
                      {product.discountPrice ? (
                        <>
                          <span className="text-2xl font-bold text-blue-600">
                            {formatPrice(product.discountPrice)}
                          </span>
                          <span className="text-sm line-through text-gray-500">
                            {formatPrice(product.price)}
                          </span>
                        </>
                      ) : (
                        <span className="text-2xl font-bold text-blue-600">
                          {formatPrice(product.price)}
                        </span>
                      )}
                    </div>
                    <button className="btn btn-primary bg-gradient-to-r from-blue-500 to-purple-500 border-0 text-white">
                      <i className="fas fa-cart-plus mr-2"></i> Comprar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="btn btn-outline btn-primary btn-wide border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all">
              <i className="fas fa-arrow-right mr-2"></i> Ver Todos os Produtos
            </button>
          </div>
        </div>
      </section>

      {/* Special Offers Carousel */}
      {/* <section id="ofertas" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Ofertas Especiais da Semana</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Aproveite descontos exclusivos por tempo limitado
            </p>
          </div>
          
          <div className="carousel w-full relative rounded-2xl overflow-hidden shadow-xl">
            {featuredProducts.map((product, index) => (
              <div 
                key={product.id} 
                id={`slide${index}`} 
                className={`carousel-item relative w-full transition-opacity duration-500 ${index === activeSlide ? 'opacity-100' : 'opacity-0 absolute'}`}
              >
                <div className="flex flex-col md:flex-row items-center justify-between w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white p-8 md:p-12">
                  <div className="md:w-1/2 mb-8 md:mb-0 text-center md:text-left">
                    <h3 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h3>
                    <p className="text-lg md:text-xl mb-6 opacity-90">{product.description}</p>
                    <div className="flex items-center justify-center md:justify-start mb-6">
                      <span className="text-4xl md:text-5xl font-bold mr-4">{formatPrice(product.discountPrice!)}</span>
                      <span className="text-xl line-through opacity-70">{formatPrice(product.price)}</span>
                      <span className="badge badge-lg bg-white text-blue-600 ml-4 border-0">
                        {Math.round((1 - (product.discountPrice! / product.price)) * 100)}% OFF
                      </span>
                    </div>
                    <button className="btn btn-lg bg-white text-blue-600 border-0 hover:bg-gray-100 transition-all">
                      <i className="fas fa-bolt mr-2"></i> Aproveitar Oferta
                    </button>
                    <div className="mt-4 flex items-center justify-center md:justify-start">
                      <i className="fas fa-clock text-yellow-300 mr-2"></i>
                      <span className="font-semibold">Oferta termina em: 2 dias</span>
                    </div>
                  </div>
                  <div className="md:w-1/2 flex justify-center">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="max-w-full h-64 md:h-80 object-contain rounded-lg shadow-2xl"
                    />
                  </div>
                </div>
              </div>
            ))}
            
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <button onClick={prevSlide} className="btn btn-circle bg-white/20 text-white border-0 hover:bg-white/30">
                ❮
              </button> 
              <button onClick={nextSlide} className="btn btn-circle bg-white/20 text-white border-0 hover:bg-white/30">
                ❯
              </button>
            </div>
            
            <div className="absolute flex justify-center w-full bottom-4">
              <div className="flex space-x-2">
                {featuredProducts.map((_, index) => (
                  <button 
                    key={index}
                    onClick={() => setActiveSlide(index)}
                    className={`w-3 h-3 rounded-full ${index === activeSlide ? 'bg-white' : 'bg-white/50'}`}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Testimonials */}
      {/* <section id="depoimentos" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">O que nossos clientes dizem</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Avaliações reais de clientes satisfeitos com nossos produtos e serviços
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="card bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
                <div className="card-body p-8">
                  <div className="flex items-center mb-4">
                    <div className="avatar mr-4">
                      <div className="w-14 rounded-full ring ring-blue-100 ring-offset-2">
                        <img src={testimonial.avatar} alt={testimonial.name} />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{testimonial.name}</h4>
                      <p className="text-gray-500 text-sm">{testimonial.position}</p>
                      {renderRating(testimonial.rating)}
                    </div>
                  </div>
                  <p className="italic text-gray-700 relative pl-4">
                    <span className="absolute left-0 top-0 text-4xl text-blue-200 font-serif">"</span>
                    {testimonial.comment}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Newsletter */}
      {/* <section className="py-20 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Fique por dentro das novidades</h2>
          <p className="text-lg mb-8 opacity-90">Cadastre-se para receber ofertas exclusivas e ser o primeiro a saber sobre lançamentos</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Seu melhor e-mail" 
              className="input input-bordered w-full text-gray-800" 
            />
            <button className="btn btn-accent text-white border-0">
              <i className="fas fa-paper-plane mr-2"></i> Cadastrar
            </button>
          </div>
          <p className="mt-4 text-sm opacity-70">Ao se cadastrar, você concorda com nossa Política de Privacidade</p>
        </div>
      </section> */}
    </div>
  );
};

export default HomePage;
