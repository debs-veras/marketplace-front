import { Outlet } from 'react-router-dom';
import ScrollArea from '../../components/ScrollArea';
import Sidebar from '../Sidebar';

export default function PageLayout() {
  return (
    <div className="h-screen flex flex-row">
      {/* SIDEBAR */}
      <Sidebar />
      <div className="w-full h-full">
        {/* MAIN */}
        <ScrollArea className="pb-14">
          <main className="flex flex-col py-4">
            <Outlet />
          </main>
        </ScrollArea>
      </div>
    </div>
  );
}
