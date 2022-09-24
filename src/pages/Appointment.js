import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDoctors } from '../store/doctorSlice';
import { createAppointment } from '../store/appointmentSlice';

const Appointment = () => {
  const doctors = useSelector((state) => state.doctor.doctors);
  const dispatch = useDispatch();
  const id = useParams();

  useEffect(() => {
    dispatch(getDoctors());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const newAppointment = (e) => {
    e.preventDefault();
    const doctorName = document.getElementById('doctor').value;
    const doctorId = doctors.find((doctor) => doctor.name === doctorName).id;
    const date = document.getElementById('datetime').valueAsDate.toISOString();
    const city = document.getElementById('city').value;

    const appointment = {
      doctor_id: doctorId,
      user_id: 1,
      date,
      city,
    };

    dispatch(createAppointment(appointment));
  };

  return (
    <section className="flex flex-col items-center w-full md:w-10/12 pb-20">
      <h1 className="text-5xl md:text-6xl font-bold text-center mt-16 md:self-end md:mr-24 md:mt-36">MAKE AN APPOINTMENT</h1>
      <div className="w-full relative flex justify-around mt-14 md:mt-24">
        <form onSubmit={(e) => newAppointment(e)} action="" className="w-full flex flex-col items-center mt-3">
          <div className="w-full relative flex flex-col md:flex-row justify-around items-center">
            <label htmlFor="doctor" className="flex flex-col w-11/12 md:w-1/6">
              Select a Doctor:
              <select className="text-left px-2 bg-ligthgray py-2.5 border border-citrus-600 rounded-lg" name="doctor" id="doctor">
                {
                  doctors.map((doctor) => (
                    <option
                      placeholder={id}
                      key={doctor.id}
                      className="hover:citrus:500 hover:color:gray-100"
                    >
                      {doctor.name}
                    </option>
                  ))
                }
              </select>
            </label>
            <label htmlFor="city" className="flex flex-col w-11/12 md:w-min">
              Select a City:
              <input required id="city" className="bg-gray-100 p-2 border border-citrus-500 focus:outline-none focus:border-2 focus:border-citrus-600 rounded-lg" placeholder="Select City" type="text" />
            </label>
            <label htmlFor="date" className="flex flex-col w-11/12 md:w-min">
              Select a Date:
              <input required id="datetime" className="bg-gray-100 p-2 border border-citrus-500 focus:outline-none focus:border-2 focus:border-citrus-600 rounded-lg" type="datetime-local" />
            </label>
          </div>
          <input type="submit" value="Submit" className="mt-20 w-1/2 md:w-1/5 inline-block py-4 bg-citrus-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-citrus-700 hover:shadow-lg focus:bg-citrus-700 transition duration-150 ease-in-out" />
        </form>
      </div>
    </section>
  );
};

export default Appointment;