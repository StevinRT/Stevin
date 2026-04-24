import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { DataProvider } from "@/context/DataContext";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import FloatingCart from "@/components/FloatingCart";
import Landing from "@/pages/Landing";
import MenuPage from "@/pages/MenuPage";
import AdminPage from "@/pages/AdminPage";

function App() {
  return (
    <div className="App" data-testid="app-root">
      <DataProvider>
        <CartProvider>
          <AuthProvider>
            <BrowserRouter>
              <Header />
              <main className="min-h-[70vh]">
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/menu" element={<MenuPage />} />
                  <Route path="/admin" element={<AdminPage />} />
                </Routes>
              </main>
              <Footer />
              <CartDrawer />
              <FloatingCart />
              <Toaster position="top-center" richColors />
            </BrowserRouter>
          </AuthProvider>
        </CartProvider>
      </DataProvider>
    </div>
  );
}

export default App;
