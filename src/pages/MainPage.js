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

  if (doctors.length === 0) {
    return (
      <section className="w-full lg:w-10/12 flex flex-col justify-center items-center">
        <p className="text-center italic text-xl">There are no doctors to be displayed. Please create one.</p>
        <Link to="/new-doctor" className="bg-amber-500 mx-auto my-4 h-10 px-24 self-center rounded-full text-white font-semibold flex items-center justify-center gap-2">Add a Doctor</Link>
      </section>
    );
  }

  return (
    <section className="flex flex-col items-center w-full lg:w-10/12 pb-20">
      {
        doctors.length > 0 && (
          <>
            <div className="text-center mt-16 lg:self-end lg:mr-24 lg:mt-36">
              <h1 className="text-5xl md:text-6xl font-bold">LATEST VETS</h1>
              <span className="mt-2 text-xl text-gray-400">Please select a vet</span>
            </div>
            <div className="w-full relative flex justify-center mt-14 md:mt-24">
              <div
                id="slider"
                className="w-3/4 py-3 flex overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide space-x-24"
              >
                {
                  doctors.map((doctor) => (
                    <div className="flex justify-center p-2" key={doctor.id}>
                      <div className="max-w-sm hover:scale-105 ease-in-out duration-300 flex flex-col items-center">
                        <Link to={`/doctors/${doctor.id}`}>
                          <img className="rounded-full w-60 h-60 max-w-fit" src={doctor.photo_path || `https://via.placeholder.com/480x480?text=${doctor.name}`} alt={doctor.name} />
                          <div className="p-6 mt-2 text-center">
                            <h5 className="text-gray-900 text-2xl font-medium mb-5">{doctor.name}</h5>
                            <p title="description" className="text-gray-700 text-sm mb-2 whitespace-normal">
                              {doctor.description}
                            </p>
                          </div>
                        </Link>
                        <Link to={`/new-appointment/${doctor.id}`} className="mx-auto h-12 flex justify-between items-center bg-citrus-500 hover:bg-citrus-600 hover:shadow-md text-white px-6 shadow-lg text-center rounded-full font-semibold">
                          Make an Appointment
                        </Link>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </>
        )
      }
    </section>
  );
};

export default MainPage;
