import { CookiesProvider } from 'react-cookie';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminChart from './components/Admin/AdminChart';

function App() {

  

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <CookiesProvider>
          <Layout />
        </CookiesProvider>
      </BrowserRouter>
      <AdminChart/>
    </>
  );
}

export default App;