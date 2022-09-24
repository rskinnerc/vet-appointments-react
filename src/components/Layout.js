import { useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import NavMenu from './NavMenu';
import AuthPopUp from './AuthPopUp';
import MobileMenu from './MobileMenu';

const Layout = () => {
  const location = useLocation();
  const authPopupOpen = useSelector((state) => state.auth.authPopupOpen);

  return (
    <main className="min-h-screen flex">
      {location.pathname !== '/' && (
        <>
          <NavMenu />
          <MobileMenu />
        </>
      )}
      <Outlet />
      {authPopupOpen && <AuthPopUp />}
    </main>
  );
};

export default Layout;
