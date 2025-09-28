import { useForm } from 'react-hook-form';
import {
  BiUser,
  BiLock,
  BiEnvelope,
  BiUserCircle,
  BiPhone,
  BiIdCard,
} from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { UserForm } from '../../../types/user';
import {
  InputCpf,
  InputPassword,
  InputPhone,
  InputText,
} from '../../../components/Input';
import { removeMask } from '../../../utils/formatar';
import { userRegisterRequest } from '../../../services/authRequest';
import useToastLoading from '../../../hooks/useToastLoading';
import { useAuth } from '../../../context/authContext';

export default function RegisterUser() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    control,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<UserForm>();
  const { login } = useAuth();
  const toastLoading = useToastLoading();

  const onSubmit = async (data: UserForm) => {
    if (data.password !== data.confirmPassword) {
      setError('confirmPassword', {
        type: 'manual',
        message: 'As senhas não coincidem',
      });
      return;
    }
    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,
      phone: removeMask(data.phone),
      cpf: removeMask(data.cpf),
    };

    toastLoading({ mensagem: 'Salvando usuário...' });
    const response = await userRegisterRequest(payload);
    if (response.success) {
      localStorage.setItem('@token', response.data.accessToken);
      login({
        user: response.data.user,
        role: response.data.user.role.toLowerCase(),
      });
      toastLoading({
        mensagem: 'Cadastro realizado com sucesso',
        tipo: 'success',
        onClose: () => navigate('/'),
      });
    } else {
      toastLoading({
        mensagem: response.data,
        tipo: 'error',
      });
    }
    reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50 flex items-center justify-center p-3 sm:p-6">
      <div className="max-w-6xl w-full flex flex-col lg:flex-row rounded-3xl overflow-hidden shadow-2xl bg-white mx-2 sm:mx-4">
        {/* Lado Esquerdo - Ilustração */}
        <div className="lg:w-2/5 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 p-6 sm:p-8 md:p-12 flex flex-col justify-center items-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
          </div>

          <div className="text-center space-y-6 sm:space-y-8 relative z-10">
            <div className="flex justify-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-2xl">
                <BiUserCircle className="w-10 h-10 sm:w-12 sm:h-12" />
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                Junte-se a nós!
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl font-light opacity-95">
                Crie sua conta
              </p>
            </div>

            <div className="mt-4 sm:mt-6">
              <p className="text-sm sm:text-base md:text-lg opacity-90 leading-relaxed font-light">
                Faça parte da comunidade Cartify e comece a aproveitar todos os
                recursos.
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

        {/* Lado Direito - Formulário de Cadastro */}
        <div className="lg:w-3/5 p-6 sm:p-8 md:p-12 flex flex-col justify-center">
          <div className="max-w-4xl w-full mx-auto">
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
                Criar Conta
              </h1>
              <p className="text-gray-500 text-sm sm:text-base">
                Preencha os dados para se cadastrar
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-2 sm:space-y-4 "
            >
              {/* Nome Completo */}
              <InputText
                name="name"
                label="Nome Completo"
                placeholder="Digite seu nome completo"
                icon={
                  <BiUser className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                }
                required
                register={register}
                errors={errors}
                type="text"
                validation={{ required: 'Nome é obrigatório' }}
              />

              {/* Email */}
              <InputText
                name="email"
                label="Email"
                required
                placeholder="Digite seu email"
                disabled={isSubmitting}
                icon={
                  <BiEnvelope className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                }
                register={register}
                errors={errors}
                type="email"
                validation={{
                  required: 'Email é obrigatório',
                }}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* CPF */}
                <InputCpf
                  name="cpf"
                  label="CPF"
                  placeholder="000.000.000-00"
                  control={control}
                  errors={errors}
                  disabled={isSubmitting}
                  icon={
                    <BiIdCard className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  }
                />
                {/* Celular */}
                <InputPhone
                  name="phone"
                  label="Celular"
                  placeholder="(99) 99999-9999"
                  control={control}
                  errors={errors}
                  disabled={isSubmitting}
                  icon={
                    <BiPhone className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  }
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Senha */}
                <InputPassword
                  watch={watch}
                  name="password"
                  label="Senha"
                  placeholder="Crie uma senha segura"
                  register={register}
                  errors={errors}
                  icon={
                    <BiLock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  }
                  disabled={isSubmitting}
                  validation={{
                    required: 'Senha é obrigatória',
                  }}
                  validateStrength
                />

                {/* Confirmar Senha */}
                <InputPassword
                  name="confirmPassword"
                  label=" Confirmar Senha"
                  placeholder="Confirme sua senha"
                  register={register}
                  errors={errors}
                  icon={
                    <BiLock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  }
                  disabled={isSubmitting}
                  validation={{
                    required: 'Confirmação de senha é obrigatória',
                  }}
                />
              </div>

              {/* Botão de Cadastro */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 sm:py-2 px-4 rounded-xl font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-solid rounded-full animate-spin border-t-transparent"></div>
                    <span>Criando conta...</span>
                  </div>
                ) : (
                  'Criar Conta'
                )}
              </button>

              {/* Link para Login */}
              <div className="text-center pt-4">
                <p className="text-gray-600 text-sm sm:text-base">
                  Já tem uma conta?{' '}
                  <Link
                    to="/login/user"
                    className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200 hover:underline"
                  >
                    Fazer login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
