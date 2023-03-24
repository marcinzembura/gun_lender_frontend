import Router from './routes';
import { ToastContainer } from 'react-toastify';
import Navbar from "./components/navbars/Navbar";
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (<>
    <Router />
    <ToastContainer
      position="top-left"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
  </>
  );
}

