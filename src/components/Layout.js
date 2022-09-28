import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import NavMenu from './NavMenu';
import AuthPopUp from './AuthPopUp';
import MobileMenu from './MobileMenu';
import { setUser } from '../store/authSlice';

const Layout = () => {
  const location = useLocation();
  const authPopupOpen = useSelector((state) => state.auth.authPopupOpen);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user'));
      dispatch(setUser(user));
    }
  }, [dispatch]);

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
