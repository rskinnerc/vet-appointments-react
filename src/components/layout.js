import { Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();

  return (
    <main className="min-h-screen">
      {location.pathname !== '/' && (
        <h1>Layout Navigation</h1>
      )}
      <Outlet />
    </main>
  );
};

export default Layout;
