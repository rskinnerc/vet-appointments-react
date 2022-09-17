import { useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import AuthPopUp from './authPopUp';

const Layout = () => {
  const location = useLocation();
  const authPopupOpen = useSelector((state) => state.auth.authPopupOpen);

  return (
    <main className="min-h-screen">
      {location.pathname !== '/' && (
        <h1>Layout Navigation</h1>
      )}
      <Outlet />
      {authPopupOpen && <AuthPopUp />}
    </main>
  );
};

export default Layout;
