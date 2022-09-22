import { useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import NavMenu from './NavMenu';
import AuthPopUp from './AuthPopUp';

const Layout = () => {
  const location = useLocation();
  const authPopupOpen = useSelector((state) => state.auth.authPopupOpen);

  return (
    <main className="min-h-screen flex">
      {location.pathname !== '/' && (
        <NavMenu />
      )}
      <Outlet />
      {authPopupOpen && <AuthPopUp />}
    </main>
  );
};

export default Layout;
