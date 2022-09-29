import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { IoCalendarNumberOutline, IoChevronForward } from 'react-icons/io5';
import { getDoctors } from '../store/doctorSlice';

const Doctor = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const doctor = useSelector((state) => state.doctor.doctors.find((d) => d.id === +params.id));

  useEffect(() => {
    dispatch(getDoctors());
  }, [dispatch]);

  if (!doctor) {
    return (<h1>The doctor does not exist</h1>);
  }

  return (
    <section className="flex lg:w-10/12 flex-col w-full md:flex-row md:px-10 xl:p-36 md:gap-5 2xl:gap-36 md:items-start md:pt-24">
      <img src={doctor.photo_path || `https://via.placeholder.com/480x480?text=${doctor.name}`} alt={doctor.name} className="rounded-full sm:w-10/12 sm:mx-auto md:w-2/5 aspect-square xl:w-1/2 p-2 my-8" />
      <div className="m-2 md:w-3/5 xl:w-1/2">
        <h1 className="text-right text-3xl font-semibold">
          Dr.
          {' '}
          {doctor.name}
        </h1>
        <p className="text-right italic">{doctor.description}</p>
        <ul className="-mx-2 my-6">
          <li className="h-10 odd:bg-slate-200 p-4 flex justify-between items-center">
            <span>
              Experience:
            </span>
            <span>
              {doctor.experience}
              {' '}
              years
            </span>
          </li>
          <li className="h-10 odd:bg-slate-200 p-4 flex justify-between items-center">
            <span>
              Specialization:
            </span>
            <span>
              {doctor.specialization}
            </span>
          </li>
          <li className="h-10 odd:bg-slate-200 p-4 flex justify-between items-center">
            <span>
              Price:
            </span>
            <span>
              $
              {doctor.price}
            </span>
          </li>
        </ul>
        <Link to="/doctors" className="font-semibold text-sm flex justify-end items-center my-6">
          DISCOVER MORE DOCTORS
          {' '}
          <IoChevronForward className="text-citrus-500 font-bold" />
        </Link>
        <Link to={`/new-appointment/${doctor.id}`} className="mx-auto h-12 flex justify-between items-center bg-citrus-500 hover:bg-citrus-600 hover:shadow-md text-white px-6 w-5/6 sm:w-1/2 md:w-full lg:w-9/12 xl: self-center shadow-lg text-center rounded-full font-semibold">
          <IoCalendarNumberOutline className="font-semibold text-2xl" />
          Reserve Appointment
          <IoChevronForward className="text-2xl" />
        </Link>
      </div>
    </section>
  );
};

export default Doctor;
