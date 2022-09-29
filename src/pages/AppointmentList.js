import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAppointments } from '../store/appointmentSlice';
import { getDoctors } from '../store/doctorSlice';
import { toggleAuthPopup } from '../store/authSlice';

const AppointmentList = () => {
  const doctors = useSelector((state) => state.doctor.doctors);
  const user = useSelector((state) => state.auth.user);
  const appointments = useSelector((state) => state.appointment.appointments);
  const dispatch = useDispatch();

  useEffect(() => {
    if (doctors.length === 0) {
      dispatch(getDoctors());
    }
  }, [doctors, dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(getAppointments(user.id));
    }
  }, [user, dispatch]);

  const padWithZero = (number) => (
    number >= 10
      ? number
      : `0${number}`
  );

  if (!user) {
    return (
      <section className="w-full lg:w-10/12 flex flex-col justify-center items-center">
        <p className="text-center italic text-xl">You are not authorized to perform this actions. Please Sign in.</p>
        <button type="button" onClick={() => dispatch(toggleAuthPopup())} className="bg-amber-500 mx-auto my-4 h-10 px-24 self-center rounded-full text-white font-semibold flex items-center justify-center gap-2">Sign In</button>
      </section>
    );
  }

  if (appointments.length === 0) {
    return (
      <section className="w-full lg:w-10/12 flex flex-col justify-center items-center">
        <p className="text-center italic text-xl">There are no appointments to display. Please create one.</p>
        <Link to="/new-appointment" className="bg-amber-500 mx-auto my-4 h-10 px-24 self-center rounded-full text-white font-semibold flex items-center justify-center gap-2">Add a Doctor</Link>
      </section>
    );
  }

  return (
    <section className="flex flex-col items-center w-full lg:w-10/12 pb-20">
      {
        user && doctors.length > 0 && (
          <>
            <h1 title="appointments" className="text-3xl md:text-5xl lg:text-6xl font-bold text-center mt-16 lg:self-end lg:mr-24 lg:mt-36">MY APPOINTMENTS</h1>
            <div className="w-full mt-14 md:mt-24">
              <div className="w-full flex flex-col space-y-6 items-center mt-3">
                {appointments.map((apntmnt) => (
                  <div className="md:space-y-4 border-2 border-l-8 border-l-citrus-500 rounded-lg hover:border-l-citrus-500 hover:border-citrus-400 border-gray w-8/12 px-5 py-5 text-xl flex flex-col md:px-0 justify-around p3 hover:scale-[1.01] transition-transform hover:shadow-xl shadow-stone-100" key={apntmnt.id}>
                    <div className="flex flex-col md:flex-row">
                      <span className="w-full lg:w-1/2 md:pl-16 lg:pl-24">
                        Name:
                        {' '}
                        {doctors.find((doctor) => doctor.id === apntmnt.doctor_id).name}
                      </span>
                      <span className="w-full lg:w-1/2 md:pl-16 lg:pl-24">
                        City:
                        {' '}
                        {apntmnt.city}
                      </span>
                    </div>
                    <div className="flex flex-col md:flex-row">
                      <span className="w-full lg:w-1/2 md:pl-16 lg:pl-24">
                        Date:
                        {' '}
                        {padWithZero(new Date(apntmnt.date).getUTCDate())}
                        -
                        {padWithZero((new Date(apntmnt.date).getUTCMonth()) + 1)}
                        -
                        {new Date(apntmnt.date).getUTCFullYear()}
                      </span>
                      <span className="w-full lg:w-1/2 md:pl-16 lg:pl-24">
                        Time:
                        {' '}
                        {padWithZero(new Date(apntmnt.date).getUTCHours())}
                        :
                        {padWithZero(new Date(apntmnt.date).getUTCMinutes())}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )
      }
    </section>
  );
};

export default AppointmentList;
