import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getDoctors } from '../store/doctorSlice';

const MainPage = () => {
  const doctors = useSelector((state) => state.doctor.doctors);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDoctors());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="flex flex-col items-center w-full md:w-10/12 pb-20">
      <h1 className="text-5xl md:text-6xl font-bold text-center mt-16 md:self-end md:mr-24 md:mt-36">LATEST VETS</h1>
      <div className="w-full relative flex justify-center mt-14 md:mt-24">
        <div
          id="slider"
          className="w-3/4 py-3 flex overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide space-x-24"
        >
          {
            doctors.map((doctor) => (
              <div className="flex justify-center inline-block p-2" key={doctor.id}>
                <div className="max-w-sm hover:scale-105 ease-in-out duration-300 flex flex-col items-center">
                  <img className="rounded-full w-60 h-60" src="https://mdbootstrap.com/img/new/standard/nature/184.jpg" alt="Avatar" />
                  <div className="p-6 mt-2 text-center">
                    <h5 className="text-gray-900 text-2xl font-medium mb-5">{doctor.name}</h5>
                    <p className="text-gray-700 text-sm mb-2 whitespace-normal">
                      Experience:
                      {' '}
                      {doctor.experience}
                      {' '}
                      Years
                    </p>
                    <p className="text-gray-700 text-sm mb-2 whitespace-normal">
                      Specialization:
                      {' '}
                      {doctor.specialization}
                    </p>
                    <p className="text-gray-700 text-sm mb-9 whitespace-normal">
                      Consultation Price:
                      {' '}
                      {doctor.price}
                      {' '}
                      USD
                    </p>
                    <Link href="/appointments" className="inline-block px-6 py-2.5 bg-citrus-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-citrus-700 hover:shadow-lg focus:bg-citrus-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-citrus-800 active:shadow-lg transition duration-150 ease-in-out mt-auto">
                      Make an Appointment
                    </Link>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  );
};

export default MainPage;
