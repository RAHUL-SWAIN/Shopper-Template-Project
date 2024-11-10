import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import { ShopperIndex } from './components/shopper-index/shopper-index';
import {CookiesProvider } from 'react-cookie';

function App() {
  return (
    <div>      
    <CookiesProvider> 
        <ShopperIndex />
    </CookiesProvider>  
     
    </div>
  );
}

export default App;
