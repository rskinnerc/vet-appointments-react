import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import EmptyListWarning from '../components/EmptyListWarning';
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
      <EmptyListWarning
        pageTitle="LATEST VETS"
        pageSubtitle="Please select a vet"
        bodyText="There are no doctors to display. Please create one"
        linkText="Add Doctor"
        linkRoute="/new-doctor"
      />
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
                className="w-3/4 py-6 flex overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide space-x-24"
              >
                {
                  doctors.map((doctor) => (
                    <div key={doctor.id} className="hover:scale-105 ease-in-out duration-300 flex flex-col justify-between w-72">
                      <Link className="max-h-full" to={`/doctors/${doctor.id}`}>
                        <img className="rounded-full w-60 h-60 max-w-fit mx-auto" src={doctor.photo_path || `https://via.placeholder.com/480x480?text=${doctor.name}`} alt={doctor.name} />
                        <div className="p-5 mt-2 text-center">
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
