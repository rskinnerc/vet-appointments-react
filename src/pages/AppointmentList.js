import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAppointments } from '../store/appointmentSlice';
import { getDoctors } from '../store/doctorSlice';

const AppointmentList = () => {
  const doctors = useSelector((state) => state.doctor.doctors);
  const appointments = useSelector((state) => state.appointment.appointments);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDoctors());
    dispatch(getAppointments());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="flex flex-col items-center w-full lg:w-10/12 pb-20">
      <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-center mt-16 lg:self-end lg:mr-24 lg:mt-36">MY APPOINTMENTS</h1>
      <div className="w-full relative flex justify-around mt-14 md:mt-24">
        <div className="w-full flex flex-col space-y-6 items-center mt-3">
          {
            appointments.map((apntmnt) => (
              <div className="md:space-y-4 border-2 border-l-8 border-l-citrus-500 rounded-lg hover:border-l-citrus-500 hover:border-citrus-400 border-gray w-8/12 px-5 py-5 text-xl flex flex-col md:px-0 justify-around p3" key={apntmnt.id}>
                <div className="flex flex-col md:flex-row">
                  <span className="w-full lg:w-1/2 md:pl-16 lg:pl-24">
                    Name:
                    {' '}
                    {doctors[apntmnt.doctor_id] ? doctors[apntmnt.doctor_id].name : ''}
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
                    {new Date(apntmnt.date).getUTCDate()}
                    -
                    {new Date(apntmnt.date).getUTCMonth()}
                    -
                    {new Date(apntmnt.date).getUTCFullYear()}
                  </span>
                  <span className="w-full lg:w-1/2 md:pl-16 lg:pl-24">
                    Time:
                    {' '}
                    {new Date(apntmnt.date).getUTCHours()}
                    :
                    {new Date(apntmnt.date).getUTCMinutes()}
                  </span>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  );
};

export default AppointmentList;
