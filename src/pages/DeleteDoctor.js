import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoTrash } from 'react-icons/io5';
import { getDoctors } from '../store/doctorSlice';
import { toggleAuthPopup } from '../store/authSlice';

const DeleteDoctor = () => {
  const user = useSelector((state) => state.auth.user);
  const doctors = useSelector((state) => state.doctor.doctors);
  const dispatch = useDispatch();

  useEffect(() => {
    if (doctors.length === 0) {
      dispatch(getDoctors());
    }
  });

  if (!user) {
    return (
      <section className="w-full">
        <p className="text-l font-semibold italic text-center my-24">You are not authorized to perform this actions. Please Sign in.</p>
        <button type="button" onClick={() => dispatch(toggleAuthPopup())} className="bg-amber-500 mx-auto my-4 h-10 px-24 self-center rounded-md text-white font-semibold flex items-center justify-center gap-2">Sign In</button>
      </section>
    );
  }

  return (
    <section className="w-full">
      <h1>Delete a Doctor</h1>
      {doctors.length === 0 && (
        <p className="text-l font-semibold italic text-center my-24">There are no doctors. Please add a new one.</p>
      )}
      {doctors.length > 0 && (
        <ul>
          {doctors.map((doctor) => (
            <li key={doctor.id}>
              <span>{doctor.name}</span>
              <IoTrash data-testid={`doctor-${doctor.id}`} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default DeleteDoctor;
