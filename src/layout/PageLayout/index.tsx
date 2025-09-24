import { Outlet } from 'react-router-dom';
import ScrollArea from '../../components/ScrollArea';
import Sidebar from '../Sidebar';

export default function PageLayout() {
  return (
    <div className="overflow-hidden h-screen flex flex-col w-screen relative">
      <div className="w-full h-full flex flex-row gap-0">
        {/* SIDEBAR */}
        <Sidebar />
        <div className="w-full h-full">
          {/* MAIN */}
          <ScrollArea className="pb-14">
            <main className="flex flex-col gap-4 py-4">
              <Outlet />
            </main>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
