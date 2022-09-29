import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { toggleAuthPopup } from '../store/authSlice';

const SignInWarning = (props) => {
  const dispatch = useDispatch();
  const {
    pageTitle, pageSubtitle, titleIsCentered,
  } = props;

  const getTitleClass = () => (
    titleIsCentered
      ? 'text-3xl md:text-4xl lg:text-6xl font-semibold text-center mt-16 lg:mt-36 mb-12'
      : 'text-3xl md:text-4xl lg:text-6xl font-bold text-center mt-16 lg:self-end lg:mr-24 lg:mt-36 mb-12'
  );

  if (pageSubtitle) {
    return (
      <section className="w-full max-h-full lg:w-10/12 flex flex-col items-center">
        <div className="text-center mt-16 lg:self-end lg:mr-24 lg:mt-36 mb-12">
          <h1 className="text-5xl md:text-6xl font-bold">{pageTitle}</h1>
          <span className="mt-2 text-xl text-gray-400">{pageSubtitle}</span>
        </div>
        <div className="flex flex-col justify-center items-center pt-10">
          <p className="text-center italic text-xl px-3 md:px-0">You are not authorized to perform this action. Please Sign in.</p>
          <button type="button" onClick={() => dispatch(toggleAuthPopup())} className="bg-amber-500 my-20 h-10 px-8 self-center rounded-full text-white font-semibold flex items-center justify-center gap-2">Sign In</button>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full max-h-full lg:w-10/12 flex flex-col items-center">
      <h1 className={getTitleClass()}>{pageTitle}</h1>
      <div className="flex flex-col justify-center items-center pt-10">
        <p className="text-center italic text-xl px-3 md:px-0">You are not authorized to perform this action. Please Sign in.</p>
        <button type="button" onClick={() => dispatch(toggleAuthPopup())} className="bg-amber-500 my-20 h-10 px-8 self-center rounded-full text-white font-semibold flex items-center justify-center gap-2">Sign In</button>
      </div>
    </section>
  );
};

SignInWarning.propTypes = {
  titleIsCentered: PropTypes.bool,
  pageSubtitle: PropTypes.string,
  pageTitle: PropTypes.string.isRequired,
};

SignInWarning.defaultProps = {
  pageSubtitle: null,
  titleIsCentered: false,
};

export default SignInWarning;
