import { Outlet } from 'react-router-dom';
import { TopBar } from '@/components/TopBar';

export function Layout() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Outlet />
    </div>
  );
}
