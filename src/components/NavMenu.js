import { NavLink } from 'react-router-dom';

const NavMenu = () => (
  <header className="w-2/12 hidden lg:flex flex-col border-solid border-2 border-gray">
    <h1 className="self-center font-bold text-4xl pt-10">Vets App</h1>
    <nav className="flex flex-col pl-3 mt-28">
      <NavLink className="font-bold text-gray-800 hover:bg-citrus-500 hover:text-white text-lg pl-2 tracking-tighter py-2" to="/doctors">VETS</NavLink>
      <NavLink className="font-bold text-gray-800 hover:bg-citrus-500 hover:text-white text-lg pl-2 tracking-tighter py-2" to="/new-appointment">MAKE AN APPOINTMENT</NavLink>
      <NavLink className="font-bold text-gray-800 hover:bg-citrus-500 hover:text-white text-lg pl-2 tracking-tighter py-2" to="/appointments">MY APPOINTMENTS</NavLink>
      <NavLink className="font-bold text-gray-800 hover:bg-citrus-500 hover:text-white text-lg pl-2 tracking-tighter py-2" href="/">ADD VET</NavLink>
      <NavLink className="font-bold text-gray-800 hover:bg-citrus-500 hover:text-white text-lg pl-2 tracking-tighter py-2" href="/">DELETE VET</NavLink>
    </nav>
  </header>
);

export default NavMenu;
