import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  FaSearch,
  FaShoppingCart,
  FaHeart,
  FaPlus,
  FaStar,
  FaMinus,
} from 'react-icons/fa';
import { ProductFilter, ProductList } from '../../types/product';
import { getListProduct } from '../../services/productRequest';
import useDebounce from '../../hooks/useDebounce';
import Box, { BoxContainer } from '../../components/Box';
import Page from '../../components/Page';
import Button from '../../components/Button';
import { InputText } from '../../components/Input';
import EmptyPage from '../../components/EmptyPage';
import useToastLoading from '../../hooks/useToastLoading';
import { useAuth } from '../../context/authContext';
import { postAddCartRequest } from '../../services/cartResquest';

export default function ProductStore() {
  const [products, setProducts] = useState<Array<ProductList>>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalRegister, setTotalRegister] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const toast = useToastLoading();
  const registerForPage = 8;
  const { user } = useAuth();

  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFilter>();

  const watchUseEffect = watch();

  const fetchProducts = async (loadMore: boolean = false) => {
    const page = loadMore ? currentPage + 1 : 0;
    const pageSize = registerForPage;
    let filters: ProductFilter = { page: page + 1, limit: pageSize };

    await handleSubmit((dataForm) => {
      filters = {
        ...filters,
        name: dataForm.name ?? '',
        description: dataForm.description ?? '',
        price: dataForm.price ?? 0,
      };
    })();

    if (loadMore) setLoadingMore(true);
    else setLoading(true);
    let url = `?page=${filters.page}&limit=${filters.limit}`;
    if (filters.name) url += `&name=${encodeURIComponent(filters.name)}`;
    if (filters.description)
      url += `&description=${encodeURIComponent(filters.description)}`;
    if (filters.price) url += `&price=${encodeURIComponent(filters.price)}`;

    const response = await getListProduct(url);

    if (response.success) {
      if (loadMore) {
        setCurrentPage(page);
        setProducts((prev) => [...prev, ...response.data.products]);
      } else {
        setCurrentPage(0);
        setProducts(response.data.products);
      }
      setTotalRegister(response.data.total);
    } else {
      setProducts([]);
      toast({ tipo: 'error', mensagem: response.data });
    }
    setLoading(false);
    setLoadingMore(false);
  };

  const handleQuantityChange = (productId: string, change: number) => {
    setQuantities((prev) => {
      const currentQuantity = prev[productId] || 1;
      const newQuantity = currentQuantity + change;
      if (newQuantity < 1) return prev;
      return {
        ...prev,
        [productId]: newQuantity,
      };
    });
  };

  const handleQuantityInput = (productId: string, value: string) => {
    const quantity = parseInt(value) || 1;
    if (quantity < 1) return;
    setQuantities((prev) => ({
      ...prev,
      [productId]: quantity,
    }));
  };

  const handleAddToCart = async (product: ProductList) => {
    setTimeout(() => {}, 50000);
    if (!user) {
      toast({
        mensagem: 'Faça login para adicionar produtos ao carrinho',
        tipo: 'warning',
      });
      return;
    }

    if (user.role !== 'user') {
      toast({
        mensagem: 'Apenas usuários podem adicionar produtos ao carrinho',
        tipo: 'error',
      });
      return;
    }

    const quantity = quantities[product.id] || 1;

    const response = await postAddCartRequest({
      quantity: quantity,
      productId: product.id,
    });

    if (response.success) {
      toast({
        mensagem: `${quantity} ${product.name} adicionado(s) ao carrinho!`,
        tipo: 'success',
      });
    } else {
      toast({
        mensagem: response.data,
        tipo: 'error',
      });
    }

    setQuantities((prev) => ({
      ...prev,
      [product.id]: 1,
    }));
  };

  const handleLoadMore = () => {
    fetchProducts(true);
  };

  const filtroDebounce = useDebounce(() => fetchProducts(false), 1000);

  function handleClearFilters() {
    reset({ name: '', description: '', price: 0 });
    fetchProducts(false);
  }

  useEffect(() => {
    const subscription = watch(() => filtroDebounce());
    return () => subscription.unsubscribe();
  }, [watchUseEffect]);

  useEffect(() => {
    fetchProducts(false);
  }, []);

  const hasMore = products.length < totalRegister;
  const canAddToCart = user && user.role === 'user';

  return (
    <Page loading={loading}>
      <div className="flex flex-col lg:flex-row gap-6 mx-2 sm:mx-20 py-15">
        {/* Sidebar - Filtros */}
        <div className="w-full lg:w-1/4">
          <Box>
            <div className="sticky top-6">
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-200">
                <FaSearch className="text-gray-400" />
                <h2 className="text-lg font-semibold text-gray-700">
                  Filtros e Ordenação
                </h2>
              </div>

              {/* Filtros */}
              <form className="space-y-4">
                <InputText
                  name="name"
                  label="Nome do Produto"
                  type="text"
                  register={register}
                  errors={errors}
                  placeholder="Buscar por nome..."
                />
                <InputText
                  name="description"
                  label="Descrição"
                  type="text"
                  register={register}
                  errors={errors}
                  placeholder="Buscar por descrição..."
                />
                <InputText
                  name="price"
                  label="Preço"
                  type="number"
                  register={register}
                  errors={errors}
                  placeholder="Filtrar por preço..."
                  step={0.01}
                />
              </form>

              {/* Botão Limpar Filtros */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <Button
                  text="Limpar Filtros"
                  type="aviso"
                  onClick={handleClearFilters}
                  className="w-full"
                />
              </div>
            </div>
          </Box>
        </div>

        {/* Conteúdo Principal - Produtos */}
        <div className="w-full lg:w-3/4">
          <BoxContainer>
            {!products.length && !loading ? (
              <Box>
                <EmptyPage
                  texto="Nenhum produto encontrado. Tente ajustar os filtros de busca."
                  botao={false}
                />
              </Box>
            ) : (
              <Box>
                {/* Header */}
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Produtos Disponíveis
                  </h1>
                  <p className="text-gray-600">
                    {totalRegister} produto{totalRegister !== 1 ? 's' : ''}{' '}
                    encontrado{totalRegister !== 1 ? 's' : ''}
                  </p>
                </div>

                {/* Products Grid */}
                <div className="mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-100 flex flex-col h-full"
                      >
                        {/* Product Image Container */}
                        <div className="relative h-56 bg-gradient-to-br from-blue-50 to-gray-50 overflow-hidden">
                          {product.imageUrl ? (
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                              <div className="text-center">
                                <div className="text-5xl mb-2">📱</div>
                                <div className="text-sm">Sem imagem</div>
                              </div>
                            </div>
                          )}

                          {/* Discount Badge */}
                          <div className="absolute top-3 left-3">
                            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                              -15%
                            </span>
                          </div>

                          {/* Wishlist Button */}
                          <button
                            onClick={() => {}}
                            className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white hover:shadow-lg transition-all duration-200 group-hover:scale-110"
                          >
                            <FaHeart className="text-gray-500 hover:text-red-500 transition-colors" />
                          </button>

                          {/* Overlay on Hover */}
                          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                        {/* Product Info */}
                        <div className="p-5 flex-1 flex flex-col">
                          {/* Category and Rating */}
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide bg-blue-50 px-2 py-1 rounded">
                              Eletrônicos
                            </span>
                            <div className="flex items-center gap-1">
                              <FaStar className="text-yellow-400 text-sm" />
                              <span className="text-xs text-gray-500">4.8</span>
                            </div>
                          </div>

                          {/* Product Name */}
                          <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 leading-tight">
                            {product.name}
                          </h3>

                          {/* Description */}
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1 leading-relaxed">
                            {product.description}
                          </p>

                          {/* Price Section */}
                          <div className="mb-4">
                            <div className="flex items-baseline gap-2 mb-1">
                              <span className="text-2xl font-bold text-gray-900">
                                R$ {product.price.toFixed(2)}
                              </span>
                              <span className="text-sm text-gray-500 line-through">
                                R$ {(product.price * 1.15).toFixed(2)}
                              </span>
                            </div>
                            <div className="text-xs text-gray-500">
                              ou 12x de R$ {(product.price / 12).toFixed(2)} sem
                              juros
                            </div>
                          </div>

                          {/* Quantity Selector */}
                          <div className="flex items-center justify-between mb-4">
                            <label className="text-sm font-medium text-gray-700">
                              Quantidade
                            </label>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  handleQuantityChange(product.id, -1)
                                }
                                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                              >
                                <FaMinus className="text-xs text-gray-600" />
                              </button>
                              <input
                                type="number"
                                min="1"
                                disabled
                                value={quantities[product.id] || 1}
                                onChange={(e) =>
                                  handleQuantityInput(
                                    product.id,
                                    e.target.value
                                  )
                                }
                                className="w-12 text-center border border-gray-300 rounded-lg py-1 text-sm"
                              />
                              <button
                                onClick={() =>
                                  handleQuantityChange(product.id, 1)
                                }
                                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                              >
                                <FaPlus className="text-xs text-gray-600" />
                              </button>
                            </div>
                          </div>

                          {/* Buy Button */}
                          <Button
                            type="informacao"
                            text={
                              canAddToCart
                                ? `Adicionar ${quantities[product.id] || 1} ao Carrinho`
                                : 'Faça Login para Comprar'
                            }
                            onClick={() => handleAddToCart(product)}
                            disabled={!canAddToCart || isSubmitting}
                            icon={
                              <FaShoppingCart
                                className={`text-sm ${canAddToCart ? 'group-hover/btn:scale-110 transition-transform' : ''}`}
                              />
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Load More Button */}
                {hasMore && (
                  <div className="flex justify-center mt-12">
                    <button
                      onClick={handleLoadMore}
                      disabled={loadingMore}
                      className="flex items-center gap-3 bg-white border-2 border-gray-200 hover:border-blue-500 text-gray-700 hover:text-blue-600 px-8 py-4 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                      {loadingMore ? (
                        'Carregando...'
                      ) : (
                        <>
                          <FaPlus className="group-hover:scale-110 transition-transform" />
                          Carregar Mais Produtos
                        </>
                      )}
                    </button>
                  </div>
                )}
              </Box>
            )}
          </BoxContainer>
        </div>
      </div>
    </Page>
  );
}
