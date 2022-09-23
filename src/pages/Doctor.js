import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
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
    <section>
      <h1>
        Dr.
        {' '}
        {doctor.name}
      </h1>
      <p>{doctor.description}</p>
      <p>
        Experience:
        {' '}
        {doctor.experience}
        {' '}
        years
      </p>
      <p>
        Specialization:
        {' '}
        {doctor.specialization}
      </p>
      <p>
        Price: $
        {doctor.price}
      </p>
      <Link to="/">Set Appointment</Link>
    </section>
  );
};

export default Doctor;
