import { NavLink } from 'react-router-dom';

const NavMenu = () => {
  const activeLink = ({ isActive }) => (
    isActive
      ? 'font-bold border-l-2 border-l-citrus-500 text-lg pl-2 tracking-tighter py-2 text-white bg-citrus-500'
      : 'font-bold border-l-2 border-l-transparent text-gray-800 text-lg pl-2 tracking-tighter py-2 hover:border-l-2 hover:border-citrus-500'
  );

  return (
    <header className="w-2/12 hidden lg:flex flex-col border-solid border-2 border-gray">
      <h1 className="self-center font-bold text-4xl pt-10">Vets App</h1>
      <nav className="flex flex-col pl-3 mt-28">
        <NavLink className={activeLink} to="/doctors">VETS</NavLink>
        <NavLink className={activeLink} to="/new-appointment">MAKE AN APPOINTMENT</NavLink>
        <NavLink className={activeLink} to="/appointments">MY APPOINTMENTS</NavLink>
        <NavLink className={activeLink} to="/doctors/new">ADD VET</NavLink>
        <NavLink className={activeLink} to="/delete-vet">DELETE VET</NavLink>
      </nav>
    </header>
  );
};

export default NavMenu;
