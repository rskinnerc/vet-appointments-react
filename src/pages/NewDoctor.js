import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleAuthPopup } from '../store/authSlice';
import { addDoctor } from '../store/doctorSlice';

const NewDoctor = () => {
  const user = useSelector((state) => state.auth.user);
  const addDoctorStatus = useSelector((state) => state.doctor.status);
  const router = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [experience, setExperience] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState();

  useEffect(() => {
    if (addDoctorStatus === 'Successfully created') {
      router('/doctors');
    }
  }, [addDoctorStatus, router]);

  const submit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('doctor[name]', name);
    formdata.append('doctor[specialization]', specialization);
    formdata.append('doctor[experience]', experience);
    formdata.append('doctor[price]', price);
    if (photo) {
      formdata.append('doctor[photo]', photo);
    }
    formdata.append('doctor[description]', description);

    dispatch(addDoctor(formdata));
  };

  if (!user) {
    return (
      <section className="w-full">
        <p className="text-l font-semibold italic text-center my-24">You are not authorized to perform this actions. Please Sign in.</p>
        <button type="button" onClick={() => dispatch(toggleAuthPopup())} className="bg-amber-500 mx-auto my-4 h-10 px-24 self-center rounded-full text-white font-semibold flex items-center justify-center gap-2">Sign In</button>
      </section>
    );
  }

  return (
    <section className="w-full">
      <h1 className="text-3xl font-semibold text-center my-12">Add a Doctor</h1>
      <form onSubmit={submit} className="flex flex-col gap-2 px-1 md:w-4/6 lg:w-1/2 2xl:w-1/3 mx-auto">
        <input className="h-12" type="text" id="name" name="name" placeholder="Name" onChange={(e) => setName(e.target.value)} />
        <input className="h-12" type="text" id="specialization" name="specialization" placeholder="Specialization" onChange={(e) => setSpecialization(e.target.value)} />
        <input className="h-12" type="number" id="yearsOfExperience" name="experience" placeholder="Years of experience" onChange={(e) => setExperience(e.target.value)} />
        <input className="h-12" type="number" id="price" name="price" placeholder="Price (USD)" onChange={(e) => setPrice(e.target.value)} />
        <textarea className="h-24" id="description" name="description" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
        <label htmlFor="doctor-photo" className="p-2">
          Doctor Photo
          {' '}
          <input type="file" id="doctor-photo" name="doctor-photo" onChange={(e) => setPhoto(e.target.files[0])} />
        </label>
        <button type="submit" className="mx-auto h-12 flex justify-between items-center bg-citrus-500 hover:bg-citrus-600 hover:shadow-md text-white px-6 shadow-lg text-center rounded-full font-semibold">Add Doctor</button>
        {(Array.isArray(addDoctorStatus)) && (
          <div>
            <h4>
              There are some errors with your submission. Please check the form and try again.
            </h4>
            <p className="text-red-600">
              -
              {' '}
              {addDoctorStatus[0]}
            </p>
          </div>
        )}
      </form>
    </section>
  );
};

export default NewDoctor;
