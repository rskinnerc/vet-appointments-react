import { Link } from 'react-router-dom';

const NavMenu = () => (
  <header className="w-2/12 hidden md:flex flex-col border-solid border-2 border-gray">
    <h1 className="self-center font-bold text-4xl pt-10">Vets App</h1>
    <nav className="flex flex-col pl-3 mt-28">
      <Link className="font-bold text-gray-800 hover:bg-citrus-500 hover:text-white text-lg pl-2 tracking-tighter py-2" href="/doctors">VETS</Link>
      <Link className="font-bold text-gray-800 hover:bg-citrus-500 hover:text-white text-lg pl-2 tracking-tighter py-2" href="/">MAKE AN APPOINTMENT</Link>
      <Link className="font-bold text-gray-800 hover:bg-citrus-500 hover:text-white text-lg pl-2 tracking-tighter py-2" href="/">MY APPOINTMENTS</Link>
      <Link className="font-bold text-gray-800 hover:bg-citrus-500 hover:text-white text-lg pl-2 tracking-tighter py-2" to="/doctors/new">ADD VET</Link>
      <Link className="font-bold text-gray-800 hover:bg-citrus-500 hover:text-white text-lg pl-2 tracking-tighter py-2" href="/">DELETE VET</Link>
    </nav>
  </header>
);

export default NavMenu;
