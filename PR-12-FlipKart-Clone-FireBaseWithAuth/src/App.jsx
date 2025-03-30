import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, NotFound } from "./Components/default";
import { Box } from "@mui/material";
import { Provider } from "react-redux"; 
import store from "./redux/store"; 
import AllProducts from "../src/Components/Home/AllProducts"

// Components
import Header from "./Components/Header/Header";
import TemplateProvider from "./templates/TemplateProvider";
import ContextProvider from "./context/ContextProvider";
import Cart from "./Components/Cart/Cart";
import DetailView from "./Components/ItemsDetails/DetailView";
import AddProduct from "./Components/AddProduct"
import Footer from "../src/Components/Footer/Footer"
import EditProducts from "./Components/Home/EditPage";

function App() {
  return (
    <Provider store={store}> 
      <TemplateProvider>
        <ContextProvider>
          <BrowserRouter>
            <Header />
            
            <Box style={{ marginTop: 54 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/all-products" element={<AllProducts />} />
                <Route path="/edit-products" element={<EditProducts />} />
                <Route path="/product/:id" element={<DetailView />} />
                <Route path="/addproduct" element={<AddProduct />} /> 
                <Route path="*" element={<NotFound />} /> {/* Add NotFound route */}
              </Routes>
            </Box>
          </BrowserRouter>
        </ContextProvider>
      </TemplateProvider>
      <Footer />
    </Provider>
  );
}

export default App;
