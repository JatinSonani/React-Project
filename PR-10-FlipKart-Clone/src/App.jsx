import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, NotFound } from "./Components/default";
import { Box } from "@mui/material";
import { Provider } from "react-redux"; // Import Provider from react-redux
import store from "./redux/store"; // Import Redux store

// Components
import Header from "./Components/Header/Header";
import TemplateProvider from "./templates/TemplateProvider";
import ContextProvider from "./context/ContextProvider";
import Cart from "./Components/Cart/Cart";
import DetailView from "./Components/ItemsDetails/DetailView";

function App() {
  return (
    <Provider store={store}> {/* Wrap your entire app with Provider */}
      <TemplateProvider>
        <ContextProvider>
          <BrowserRouter>
            <Header />
            <Box style={{ marginTop: 54 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/product/:id" element={<DetailView />} />
                <Route path="*" element={<NotFound />} /> {/* Add NotFound route */}
              </Routes>
            </Box>
          </BrowserRouter>
        </ContextProvider>
      </TemplateProvider>
    </Provider>
  );
}

export default App;
