import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import CartSidebar from "@/components/CartSidebar";
import MobileNav from "@/components/MobileNav";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <CartSidebar />
        <MobileNav />
      </div>
    </CartProvider>
  );
}
