import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoTrash } from 'react-icons/io5';
import { getDoctors, deleteDoctor } from '../store/doctorSlice';
import { toggleAuthPopup } from '../store/authSlice';

const DeleteDoctor = () => {
  const user = useSelector((state) => state.auth.user);
  const doctors = useSelector((state) => state.doctor.doctors);
  const dispatch = useDispatch();

  useEffect(() => {
    if (doctors.length === 0) {
      dispatch(getDoctors());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, doctors]);

  if (!user) {
    return (
      <section className="w-full lg:w-10/12 flex flex-col justify-center items-center">
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-semibold text-center mt-16 mb-12">DELETE A DOCTOR</h1>
        <p className="text-center italic text-xl">You are not authorized to perform this actions. Please Sign in.</p>
        <button type="button" onClick={() => dispatch(toggleAuthPopup())} className="bg-amber-500 mx-auto my-4 h-10 px-24 self-center rounded-full text-white font-semibold flex items-center justify-center gap-2">Sign In</button>
      </section>
    );
  }

  if (doctors.length === 0) {
    return (
      <section className="w-full lg:w-10/12 flex flex-col justify-center items-center">
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-semibold text-center mt-16 mb-12">DELETE A DOCTOR</h1>
        <p className="text-center italic text-xl">There are no doctors. Please add a new one.</p>
        <Link to="/new-doctor" className="bg-amber-500 mx-auto my-4 h-10 px-24 self-center rounded-full text-white font-semibold flex items-center justify-center gap-2">Add a Doctor</Link>
      </section>
    );
  }

  return (
    <section className="w-full lg:w-10/12">
      <h1 className="text-3xl md:text-4xl lg:text-6xl font-semibold text-center mt-16 lg:mt-36 mb-12">DELETE A DOCTOR</h1>
      {doctors.length > 0 && (
        <ul className="flex flex-col gap-5 px-1 md:w-4/6 lg:w-1/2 2xl:w-1/3 mx-auto">
          {doctors.map((doctor) => (
            <li key={doctor.id} className="border-2 border-l-8 border-l-citrus-500 rounded-lg hover:border-l-citrus-500 hover:border-citrus-400 border-gray p-5 text-xl flex justify-between hover:scale-[1.01] transition-transform hover:shadow-xl shadow-stone-100">
              <div>
                <span className="block font-semibold">{doctor.name}</span>
                <span className="block italic text-sm text-stone-500">{doctor.specialization}</span>
              </div>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button type="button" data-testid={`doctor-${doctor.id}`} onClick={() => dispatch(deleteDoctor(doctor.id))}>
                <IoTrash className="text-red-600 text-2xl" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default DeleteDoctor;
