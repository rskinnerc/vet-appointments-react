/* eslint-disable eqeqeq */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getDoctors } from '../store/doctorSlice';
import { createAppointment } from '../store/appointmentSlice';
import { toggleAuthPopup } from '../store/authSlice';

const Appointment = () => {
  const doctors = useSelector((state) => state.doctor.doctors);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [doctorName, setDoctorName] = useState('');

  useEffect(() => {
    if (doctors.length === 0) {
      dispatch(getDoctors());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (id) {
      const doc = doctors.filter((d) => d.id === parseFloat(id, 10));

      if (doc[0] !== undefined) {
        setDoctorName(doc[0].name);
      }
    }
  }, [doctors, id]);

  const getMinDate = () => {
    const currentDate = new Date().toISOString();
    const today = currentDate.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}/);
    return today;
  };

  const newAppointment = (e) => {
    e.preventDefault();
    const doctorName = document.getElementById('doctor').value;
    const doctorId = doctors.find((doctor) => doctor.name === doctorName).id;
    const date = new Date(document.getElementById('datetime').value).toISOString();
    const city = document.getElementById('city').value;

    const appointment = {
      doctor_id: doctorId,
      user_id: user.id,
      date,
      city,
    };

    dispatch(createAppointment(appointment));
    navigate('/appointments');
  };

  return (
    <section className="flex flex-col items-center w-full lg:w-10/12 pb-20">
      {
        user && (
          <>
            <h1 title="create-appointment" className="text-3xl md:text-4xl lg:text-6xl font-bold text-center mt-16 lg:self-end lg:mr-24 lg:mt-36">MAKE AN APPOINTMENT</h1>
            <div className="w-full relative flex justify-around mt-14 md:mt-24">
              <form onSubmit={(e) => newAppointment(e)} action="" className="w-full flex flex-col items-center mt-3">
                <div className="w-full relative flex flex-col md:flex-row justify-around items-center">
                  <label htmlFor="doctor" className="flex flex-col w-11/12 md:w-1/6">
                    Select a Doctor:
                    <select data-testid="doctor" name="doctor" id="doctor" value={doctorName} onChange={(e) => setDoctorName(e.target.value)} className="text-left px-2 bg-ligthgray py-2.5 border border-citrus-600 rounded-lg">
                      {
                        doctors.map((doctor) => (
                          <option
                            key={doctor.id}
                            placeholder={id}
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
                    <input required data-testid="city" placeholder="Select City" type="text" id="city" className="bg-gray-100 p-2 border border-citrus-500 focus:outline-none focus:border-2 focus:border-citrus-600 rounded-lg" />
                  </label>
                  <label htmlFor="date" className="flex flex-col w-11/12 md:w-min">
                    Select a Date:
                    <input
                      required
                      min={getMinDate()}
                      data-testid="date"
                      type="datetime-local"
                      id="datetime"
                      className="bg-gray-100 p-2 border border-citrus-500 focus:outline-none focus:border-2 focus:border-citrus-600 rounded-lg"
                    />
                  </label>
                </div>
                <input type="submit" data-testid="submit" value="Submit" className="mt-20 w-1/2 md:w-1/5 inline-block py-4 bg-citrus-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-citrus-700 hover:shadow-lg focus:bg-citrus-700 transition duration-150 ease-in-out" />
              </form>
            </div>
          </>
        )
      }
      {
        !user && (
          <div className="my-auto text-xl">
            <h1>You must be signed in to make an appointment</h1>
            <button type="button" onClick={() => dispatch(toggleAuthPopup())} className="bg-amber-500 mx-auto my-4 h-10 px-24 self-center rounded-md text-white font-semibold flex items-center justify-center gap-2">Sign In</button>
          </div>
        )
      }
    </section>
  );
};

export default Appointment;
