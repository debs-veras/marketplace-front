import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BiUser, BiLock, BiHappy, BiShow, BiHide } from 'react-icons/bi';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import LogoCompleta from '../../assets/logo_completa.png';
import useToastLoading from '../../hooks/useToastLoading';
import { userLoginRequest } from '../../services/authRequest';
import { LoginForm } from '../../types/auth';

export default function Login() {
  const { type } = useParams<{ type?: string }>();
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const toastLoading = useToastLoading();
  const role = type === 'admin' ? 'admin' : 'user';
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>();

  const validRoles = ['admin', 'user'];

  const config = {
    admin: {
      gradientFrom: 'from-indigo-500',
      gradientVia: 'via-indigo-600',
      gradientTo: 'to-indigo-700',
      accent: 'indigo',
      inputFocus: 'focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100',
      buttonFocus: 'focus:ring-indigo-200',
      headerTitle: 'Bem-vindo Admin!',
      headerSubtitle: 'Painel de Controle',
      loginSubtitle: 'Entre na conta administrativa',
      redirectPath: '/admin/dashboard',
    },
    user: {
      gradientFrom: 'from-blue-500',
      gradientVia: 'via-blue-600',
      gradientTo: 'to-blue-700',
      accent: 'blue',
      inputFocus: 'focus:border-blue-500 focus:ring-4 focus:ring-blue-100',
      buttonFocus: 'focus:ring-blue-200',
      headerTitle: 'Olá!',
      headerSubtitle: 'Tenha um bom dia',
      loginSubtitle: 'Entre na sua conta',
      redirectPath: '/',
    },
  };

  const currentConfig = config[role];

  const onSubmit = async (data: LoginForm) => {
    toastLoading({ mensagem: 'Verificando usuário' });

    const usuarioLogin: LoginForm = data;
    const response = await userLoginRequest(usuarioLogin);

    if (response.success) {
      if (response.data.user.role.toLowerCase() !== role) {
        toastLoading({
          mensagem: 'Credenciais inválidas para este tipo de login',
          tipo: 'error',
        });
        return;
      }
      login({
        ...response.data.user,
        role: response.data.user.role.toLowerCase(),
      });
      localStorage.setItem('@token', response.data.accessToken);
      toastLoading({
        mensagem: 'Login realizado com sucesso',
        tipo: 'success',
        onClose: () => navigate(currentConfig.redirectPath),
      });
    } else {
      toastLoading({
        mensagem: response.data,
        tipo: 'error',
      });
    }
    reset();
  };

  useEffect(() => {
    if (!type || !validRoles.includes(type)) {
      navigate('/403');
      return;
    }

    if (user && user.role.toLowerCase() === type)
      navigate(currentConfig.redirectPath, { replace: true });

    console.log('ehntriy')
  }, [type, user, navigate, currentConfig.redirectPath]);

  return (
    <div className="h-screen flex items-center justify-center p-3 sm:p-6">
      <div className="max-w-6xl w-full flex flex-col lg:flex-row rounded-3xl overflow-hidden shadow-2xl bg-white mx-2 sm:mx-4">
        {/* Lado Esquerdo */}
        <div
          className={`lg:w-2/5 bg-gradient-to-br ${currentConfig.gradientFrom} ${currentConfig.gradientVia} ${currentConfig.gradientTo} p-6 sm:p-8 md:p-12 flex flex-col justify-center items-center text-white relative overflow-hidden`}
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
          </div>

          <div className="text-center space-y-6 sm:space-y-8 relative z-10">
            <div className="flex justify-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-2xl">
                <BiHappy className="w-10 h-10 sm:w-12 sm:h-12" />
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                {currentConfig.headerTitle}
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl font-light opacity-95">
                {currentConfig.headerSubtitle}
              </p>
            </div>

            <div className="mt-4 sm:mt-6">
              <p className="text-sm sm:text-base md:text-lg opacity-90 leading-relaxed font-light">
                Bem-vindo ao Cartify. Acesse sua conta para continuar.
              </p>
            </div>

            <div className="flex justify-center space-x-2 mt-6">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="w-2 h-2 bg-white/40 rounded-full animate-pulse"
                  style={{ animationDelay: `${item * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Lado Direito */}
        <div className="lg:w-3/5 p-6 sm:p-8 md:p-12 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto">
            <div className="flex items-center flex-col gap-2 mb-6 sm:mb-10">
              <img
                src={LogoCompleta}
                alt="Cartify Logo"
                className="w-32 h-12 sm:w-60 sm:h-20 object-contain"
              />

              <p className="text-gray-500 text-base sm:text-lg">
                {currentConfig.loginSubtitle}
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 sm:space-y-6"
            >
              {/* Usuário */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-700">
                  Usuário:
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <BiUser className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 transition-colors group-focus-within:text-gray-600" />
                  </div>
                  <input
                    type="text"
                    {...register('email', {
                      required: 'Usuário é obrigatório',
                    })}
                    disabled={isSubmitting}
                    className={`w-full pl-10 pr-4 py-2 sm:py-3 text-base border-2 rounded-xl outline-none bg-gray-50/50 group-hover:bg-white transition-all duration-300
                      ${
                        errors.email
                          ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                          : `border-gray-200 ${currentConfig.inputFocus}`
                      }`}
                    placeholder="Digite seu usuário"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Senha */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-700">
                  Senha:
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <BiLock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 transition-colors group-focus-within:text-gray-600" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    {...register('password', {
                      required: 'Senha é obrigatória',
                    })}
                    disabled={isSubmitting}
                    className={`w-full pl-10 pr-10 py-2 sm:py-3 text-base border-2 rounded-xl outline-none bg-gray-50/50 group-hover:bg-white transition-all duration-300
                      ${
                        errors.password
                          ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                          : `border-gray-200 ${currentConfig.inputFocus}`
                      }`}
                    placeholder="Digite sua senha"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 text-gray-400 hover:text-gray-600 transition-all duration-200 hover:bg-gray-100 rounded-lg"
                  >
                    {showPassword ? (
                      <BiHide className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <BiShow className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Botão */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-gradient-to-r ${currentConfig.gradientFrom} ${currentConfig.gradientTo} text-white py-2 sm:py-3 px-6 rounded-xl font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 focus:outline-none ${currentConfig.buttonFocus} disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-solid rounded-full animate-spin border-t-transparent"></div>
                    <span>Entrando...</span>
                  </div>
                ) : (
                  'Entrar'
                )}
              </button>

              {role === 'user' && (
                <>
                  {/* Divisor */}
                  <div className="relative flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative bg-white px-3 text-xs sm:text-sm text-gray-500">
                      Ou
                    </div>
                  </div>

                  {/* Link de registro - só para user */}
                  <div className="text-center space-y-2">
                    <p className="text-gray-600 text-sm sm:text-base">
                      Não tem uma conta?{' '}
                      <Link
                        to="/register/user"
                        className={`text-${currentConfig.accent}-600 hover:text-${currentConfig.accent}-700 font-semibold hover:underline transition-colors`}
                      >
                        Criar conta
                      </Link>
                    </p>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
