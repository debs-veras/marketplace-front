import { Suspense } from 'react';
import Router from './router';
import Loading from './components/Loading';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Suspense fallback={<Loading />}>
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
      <Router />
    </Suspense>
  );
}

export default App;
