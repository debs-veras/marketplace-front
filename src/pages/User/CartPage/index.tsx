import { useEffect, useState } from 'react';
import {
  FaTrash,
  FaMinus,
  FaPlus,
  FaShoppingBag,
  FaArrowLeft,
} from 'react-icons/fa';

import { useNavigate } from 'react-router-dom';
import { Cart, CartItem } from '../../../types/cart';
import useToastLoading from '../../../hooks/useToastLoading';
import {
  deleteCartProduct,
  getCartRequest,
  patchDecreaseQuantity,
  postAddCartRequest,
} from '../../../services/cartResquest';

export default function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set());
  const navigate = useNavigate();
  const toastLoading = useToastLoading();

  const fetchCart = async () => {
    setLoading(true);
    const response = await getCartRequest();
    if (response.success) {
      setCart(response.data);
    } else {
      setCart(null);
      toastLoading({ tipo: 'error', mensagem: response.data });
    }
    setLoading(false);
  };

  const handleRemove = async (productId: string) => {
    setUpdatingItems((prev) => new Set(prev).add(productId));
    const response = await deleteCartProduct(productId);
    if (response.success) {
      setUpdatingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    } else {
      toastLoading({ tipo: 'error', mensagem: response.data });
    }
    await fetchCart();
  };

  const handleDecrease = async (item: CartItem) => {
    const response = await patchDecreaseQuantity({
      productId: item.product.id,
      quantity: 1,
    });

    if (response.success) {
      setUpdatingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(item.product.id);
        return newSet;
      });
    } else {
      toastLoading({ tipo: 'error', mensagem: response.data });
    }
    await fetchCart();
  };

  const handleIncrease = async (item: CartItem) => {
    const response = await postAddCartRequest({
      productId: item.product.id,
      quantity: 1,
    });

    if (response.success) {
      setUpdatingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(item.product.id);
        return newSet;
      });
    } else {
      toastLoading({ tipo: 'error', mensagem: response.data });
    }
    await fetchCart();
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  const handleCheckout = () => {
    console.log('Finalizar compra');
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando seu carrinho...</p>
        </div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaShoppingBag className="text-4xl text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Seu carrinho está vazio
            </h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Que tal explorar nossos produtos e encontrar algo especial?
            </p>
            <button
              onClick={handleContinueShopping}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 inline-flex items-center gap-2"
            >
              <FaArrowLeft />
              Continuar Comprando
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Seu Carrinho</h1>
          <p className="text-gray-600 mt-2">
            {cart.totalItems} {cart.totalItems === 1 ? 'item' : 'itens'} no
            carrinho
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {cart.items.map((item) => {
                const isUpdating = updatingItems.has(item.product.id);
                return (
                  <div
                    key={item.product.id}
                    className="border-b border-gray-100 last:border-b-0 p-6"
                  >
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl bg-gray-100"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg text-gray-900 mb-1">
                          {item.product.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                          {item.product.description}
                        </p>
                        <p className="text-lg font-bold text-gray-900 mb-3">
                          R$ {item.product.price.toFixed(2)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleDecrease(item)}
                              disabled={isUpdating || item.quantity <= 1}
                              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                              <FaMinus className="text-xs text-gray-600" />
                            </button>

                            <span
                              className={`w-8 text-center font-medium ${isUpdating ? 'text-gray-400' : 'text-gray-900'}`}
                            >
                              {isUpdating ? '...' : item.quantity}
                            </span>

                            <button
                              onClick={() => handleIncrease(item)}
                              disabled={isUpdating}
                              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                              <FaPlus className="text-xs text-gray-600" />
                            </button>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => handleRemove(item.product.id)}
                            disabled={isUpdating}
                            className="text-red-600 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
                          >
                            <FaTrash className="text-sm" />
                            <span className="text-sm font-medium">Remover</span>
                          </button>
                        </div>
                      </div>

                      {/* Item Total */}
                      <div className="flex-shrink-0 text-right">
                        <p className="text-lg font-bold text-gray-900">
                          R$ {item.itemTotal.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {item.quantity} × R$ {item.product.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Continue Shopping */}
            <div className="mt-6">
              <button
                onClick={handleContinueShopping}
                className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2 transition-colors"
              >
                <FaArrowLeft />
                Continuar Comprando
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Resumo do Pedido
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">
                    R$ {cart.totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Frete</span>
                  <span className="text-green-600 font-medium">Grátis</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Descontos</span>
                  <span className="text-green-600 font-medium">- R$ 0,00</span>
                </div>

                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-gray-900">
                      R$ {cart.totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 hover:shadow-lg"
              >
                Finalizar Compra
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Entrega estimada em 3-5 dias úteis
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
