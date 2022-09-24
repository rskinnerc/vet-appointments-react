/* eslint-disable react/jsx-props-no-spreading */
import { NavLink } from 'react-router-dom';
import useCollapse from 'react-collapsed';
import { useState } from 'react';

const MobileMenu = () => {
  const [isExpanded, setExpanded] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });

  const toggleCollapse = () => {
    setExpanded(!isExpanded);
  };

  return (
    <header className="lg:hidden flex flex-col border-solid border-2 border-gray">
      <button type="button" className="absolute right-3" {...getToggleProps({ onClick: toggleCollapse })}>{isExpanded ? 'Close' : 'Menu'}</button>
      <nav {...getCollapseProps()} className="top-8 absolute left-3 md:left-1/2 right-3 bg-gray-100/95 z-10 rounded-l">
        <NavLink onClick={() => toggleCollapse()} className="font-bold text-gray-800 hover:bg-citrus-500 hover:text-white text-lg pl-2 tracking-tighter py-2 block rounded-tl" to="/doctors">VETS</NavLink>
        <NavLink onClick={() => toggleCollapse()} className="font-bold text-gray-800 hover:bg-citrus-500 hover:text-white text-lg pl-2 tracking-tighter py-2 block" to="/new-appointment">MAKE AN APPOINTMENT</NavLink>
        <NavLink onClick={() => toggleCollapse()} className="font-bold text-gray-800 hover:bg-citrus-500 hover:text-white text-lg pl-2 tracking-tighter py-2 block" to="/appointments">MY APPOINTMENTS</NavLink>
        <NavLink onClick={() => toggleCollapse()} className="font-bold text-gray-800 hover:bg-citrus-500 hover:text-white text-lg pl-2 tracking-tighter py-2 block" to="/">ADD VET</NavLink>
        <NavLink onClick={() => toggleCollapse()} className="font-bold text-gray-800 hover:bg-citrus-500 hover:text-white text-lg pl-2 tracking-tighter py-2 block rounded-bl" to="/">DELETE VET</NavLink>
      </nav>
    </header>
  );
};

export default MobileMenu;
