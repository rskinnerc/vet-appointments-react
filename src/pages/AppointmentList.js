import { useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAppointments } from '../store/appointmentSlice';
import { getDoctors } from '../store/doctorSlice';
// import { toggleAuthPopup } from '../store/authSlice';
import SignInWarning from '../components/SignInWarning';
import EmptyListWarning from '../components/EmptyListWarning';

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
      <SignInWarning pageTitle="MY APPOINTMENTS" />
    );
  }

  if (appointments.length === 0) {
    return (
      <EmptyListWarning
        pageTitle="MY APPOINTMENTS"
        bodyText="There are no appointments to display. Please create one."
        linkText="Add Appointment"
        linkRoute="/new-appointment"
      />
    );
  }

  return (
    <section className="flex flex-col items-center w-full lg:w-10/12 pb-20">
      {
        user && doctors.length > 0 && (
          <>
            <h1 title="appointments" className="text-3xl md:text-5xl lg:text-6xl font-bold text-center mt-16 lg:self-end lg:mr-24 lg:mt-36">MY APPOINTMENTS</h1>
            <div className="w-full p-1 flex flex-col space-y-6 items-center mt-3">
              {appointments.map((apntmnt) => (
                <div className="md:space-y-4 border-2 border-l-8 border-l-citrus-500 rounded-lg hover:border-l-citrus-500 hover:border-citrus-400 border-gray w-full p-1 md:w-8/12 text-xl flex flex-col md:px-0 justify-around hover:scale-[1.01] transition-transform hover:shadow-xl shadow-stone-100" key={apntmnt.id}>
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
          </>
        )
      }
    </section>
  );
};

export default AppointmentList;
