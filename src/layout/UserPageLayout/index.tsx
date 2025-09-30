import { Outlet } from 'react-router-dom';
import FooterHomePage from '../FooterHomePage';
import HeaderHomePage from '../HeaderHomePage';

export default function UserPageLayout() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-200 to-blue-50 font-sans">
        {/* Header */}
        <HeaderHomePage />
        <main className="flex flex-col">
          <Outlet />
        </main>
      </div>
      <FooterHomePage />
    </>
  );
}
