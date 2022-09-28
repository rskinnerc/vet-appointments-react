import { useState } from 'react';
import { IoClose, IoLockClosed } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { signInUser, toggleAuthPopup } from '../store/authSlice';

const AuthPopUp = () => {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();

  const signIn = (e) => {
    e.preventDefault();
    dispatch(signInUser(username));
  };

  return (
    <div className="h-screen backdrop-blur absolute inset-0 z-30">
      <div className="absolute z-40 m-2 top-0 right-0 sm:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5 bg-white rounded-xl p-2 shadow-lg shadow-stone-500/50">
        <IoClose className="self-end text-2xl drop-shadow-lg float-right cursor-pointer" onClick={() => dispatch(toggleAuthPopup())} />
        <form className="flex flex-col clear-right py-6" onSubmit={(e) => signIn(e)}>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            name="name"
            id="name"
            placeholder="Username"
          />
          <button type="submit" data-testid="sign-in-button" className="bg-amber-500 my-4 h-10 w-2/5 self-center rounded-full text-white font-semibold flex items-center justify-center gap-2">
            <IoLockClosed className="text-2xl font-semibold" />
            Sign In
          </button>
        </form>
        <p className="text-sm text-stone-500/80">
          Sign in with your username. If it does not exist, a new account will be created.
        </p>
      </div>
    </div>
  );
};

export default AuthPopUp;
