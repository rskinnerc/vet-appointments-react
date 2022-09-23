import { Link } from 'react-router-dom';

const Doctor = () => (
  <section>
    <h1>Dr. John Doe</h1>
    <p>John description text</p>
    <p>Experience: 5 years</p>
    <p>Specialization: Ophtalmology</p>
    <p>Price: $50</p>
    <Link to="/">Set Appointment</Link>
  </section>
);

export default Doctor;
