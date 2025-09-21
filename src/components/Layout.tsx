import { Outlet } from 'react-router-dom';
import { TopBar } from '@/components/TopBar';
import { Footer } from '@/components/Footer';

export function Layout() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Outlet />
      <Footer/>
    </div>
  );
}
