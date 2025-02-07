import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/header/Header';
import MenuList from './components/header/MenuList';
import ProductList from './components/Pages/ProductOne/ProductList';
import ProductListTwo from './components/Pages/ProductTwo/ProductListTwo';
import ProductListThree from './components/Pages/ProductThree/ProductListThree';
import Footer from './components/footer/footer';


function App() {

  return (
   <>
    <Header />
    <MenuList />    
    <ProductList />
    <ProductListTwo />
    <ProductListThree />
    <Footer />
   </>
        
  )
}

export default App ;
