import { useEffect } from 'react';
import useToastLoading from './hooks/useToastLoading';
import { ToastContainer } from 'react-toastify';

export default function App() {
  const toastLoading = useToastLoading();

  useEffect(() => {
    toastLoading({
      mensagem: 'Login realizado com sucesso',
      tipo: 'success',
    });
  }, []);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        rtl={false}
        draggable
        pauseOnHover
        closeButton={true}
        style={{ width: 'fit-content' }}
      />
      <div className="bg-gray-100 h-screen">
        <div className="font-black">Olá Mundo!!</div>
      </div>
    </>
  );
}
