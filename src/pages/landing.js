import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoChevronForward, IoPawSharp } from 'react-icons/io5';
import landingImage from '../assets/images/vet-appointment-landing.png';

const Landing = () => {
  useEffect(() => { }, []);
  return (
    <section id="landing" className="h-screen bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 flex flex-col">
      <div className="self-end m-4 md:m-8 lg:m-12 flex flex-col justify-center">
        <button type="button" className="bg-white text-amber-500 p-1 shadow-md rounded-full font-semibold">Sign In</button>
        <span className="text-center text-white/50">OR</span>
        <Link to="/vets" className="text-center text-white font-semibold">Continue as Guest</Link>
      </div>
      <img src={landingImage} alt="Vet Appointments App" className="absolute top-1/4 sm:top-20 md:top-1/4 lg:top-20 left-1/2 transform -translate-x-1/2 sm:w-1/2 md:w-2/3 lg:w-5/12" />
      <h1 className="z-10 text-3xl text-white font-bold drop-shadow-lg relative top-1/3 md:top-1/2 md:text-4xl lg:text-6xl lg:top-1/3 md:tracking-wider self-center">Vet Appointments App</h1>
      <Link to="vets" class="flex justify-between md:text-xl items-center bg-citrus-500 text-white p-2 w-4/6 sm:w-1/2 lg:w-1/3 self-center relative top-2/3 sm:top-60 md:top-2/3 lg:top-1/2 lg:bottom-12 md:py-4 shadow-lg border border-citrus-500/95 text-center rounded-full font-semibold">
        <IoPawSharp className="text-2xl" />
        Find a Vet
        <IoChevronForward className="text-2xl" />
      </Link>
    </section>
  );
};

export default Landing;
