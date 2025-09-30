import FooterHomePage from '../../layout/FooterHomePage';
import HeaderHomePage from '../../layout/HeaderHomePage';
import ShopProductsLoadMore from '../../layout/ShopProductsLoadMore';

// Interfaces TypeScript

export default function HomePage() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-200 to-blue-50 font-sans">
        {/* Header */}
        <HeaderHomePage />  
        <ShopProductsLoadMore />
      </div>
      <FooterHomePage />
    </>
  );
}
