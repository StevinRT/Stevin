import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import FloatingCart from "@/components/FloatingCart";
import Landing from "@/pages/Landing";
import MenuPage from "@/pages/MenuPage";

function App() {
  return (
    <div className="App" data-testid="app-root">
      <CartProvider>
        <BrowserRouter>
          <Header />
          <main className="min-h-[70vh]">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/menu" element={<MenuPage />} />
            </Routes>
          </main>
          <Footer />
          <CartDrawer />
          <FloatingCart />
          <Toaster position="top-center" richColors />
        </BrowserRouter>
      </CartProvider>
    </div>
  );
}

export default App;
