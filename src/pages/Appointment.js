/* eslint-disable eqeqeq */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  if (!user) {
    return (
      <section className="w-full lg:w-10/12 flex flex-col justify-center items-center">
        <p className="text-center italic text-xl">You must be signed in to make an appointment</p>
        <button type="button" onClick={() => dispatch(toggleAuthPopup())} className="bg-amber-500 mx-auto my-4 h-10 px-24 self-center rounded-full text-white font-semibold flex items-center justify-center gap-2">Sign In</button>
      </section>
    );
  }

  if (doctors.length === 0) {
    return (
      <section className="w-full lg:w-10/12 flex flex-col justify-center items-center">
        <p className="text-center italic text-xl">There are no doctors to book an appointment with. Please create one.</p>
        <Link to="/new-doctor" className="bg-amber-500 mx-auto my-4 h-10 px-24 self-center rounded-full text-white font-semibold flex items-center justify-center gap-2">Add a Doctor</Link>
      </section>
    );
  }

  return (
    <section className="flex flex-col items-center w-full lg:w-10/12 pb-20">

      <h1 title="create-appointment" className="text-3xl md:text-4xl lg:text-6xl font-bold text-center mt-16 lg:self-end lg:mr-24 lg:mt-36">MAKE AN APPOINTMENT</h1>
      <div className="w-full relative flex justify-around mt-14 md:mt-24">
        <form onSubmit={(e) => newAppointment(e)} action="" className="w-full flex flex-col items-center mt-3">
          <div className="w-full relative flex flex-col md:flex-row justify-around items-center">
            <label htmlFor="doctor" className="flex flex-col w-11/12 md:w-1/6">
              Select a Doctor:
              <select data-testid="doctor" name="doctor" id="doctor" value={doctorName} onChange={(e) => setDoctorName(e.target.value)} className="text-left">
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
              <input required data-testid="city" placeholder="Select City" type="text" id="city" />
            </label>
            <label htmlFor="date" className="flex flex-col w-11/12 md:w-min">
              Select a Date:
              <input
                required
                min={getMinDate()}
                data-testid="date"
                type="datetime-local"
                id="datetime"
              />
            </label>
          </div>
          <button type="submit" data-testid="submit" className="mt-20 w-1/2 text-center md:w-1/5 mx-auto h-12 bg-citrus-500 hover:bg-citrus-600 hover:shadow-md text-white px-6 shadow-lg rounded-full font-semibold focus:bg-citrus-700 transition duration-150 ease-in-out">Add Appointment</button>
        </form>
      </div>
    </section>
  );
};

export default Appointment;
