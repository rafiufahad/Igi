import { useContext, useState } from "react";
import { AppContext } from '../../context/appContext';

const LoginDetails = ({ handleNextSection, onProgressUpdate }) => {
  const { formData, handleChange } = useContext(AppContext);

  const questions = [
    { id: 1, label: 'Email Address', type: 'email', placeholder: 'Enter your Email Address' },
    { id: 2, label: 'Password', type: 'password', placeholder: 'Enter your Password' },
    { id: 3, label: 'Confirm Password', type: 'password', placeholder: 'Confirm your Password' },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      onProgressUpdate((currentQuestionIndex - 1) / questions.length); // Update progress bar
    }
  };
  
  const handleNext = () => {
    const { email, password, confirmPassword } = formData.loginDetails;
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    if (currentQuestionIndex === 0 && email.includes('@')) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentQuestionIndex === 1 && password.length >= 6) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentQuestionIndex === 2 && password === confirmPassword) {
      // console.log(formData);
      
      handleNextSection();
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="mt-4 p-6 sm:p-12 bg-white rounded-lg shadow-lg w-full max-w-[646px] sm:h-[345px] flex flex-col justify-center items-center">
      <div className="flex flex-col items-start w-[181px]">
        <h2 className="text-2xl font-bold mb-4 text-accent">Login Details</h2>
        <p
          className={`bg-primary text-center h-1 rounded mb-6`}
          style={{ width: `${(currentQuestionIndex + 1) * 60.33}px`, transition: 'width 0.3s' }}
        ></p>
      </div>

      <div className="flex flex-col items-center w-full sm:max-w-[534px]">
        <div className="mb-8 mt-4 w-full">
          <label className="block text-gray4 text-sm font-bold mb-2">{currentQuestion.label}</label>
          <input
            type={currentQuestion.type}
            placeholder={currentQuestion.placeholder}
            value={currentQuestionIndex === 0 ? formData.loginDetails.email : currentQuestionIndex === 1 ? formData.loginDetails.password : formData.loginDetails.confirmPassword}
            onChange={(e) => handleChange('loginDetails', currentQuestionIndex === 0 ? 'email' : currentQuestionIndex === 1 ? 'password' : 'confirmPassword', e.target.value)}
            className="border rounded w-full sm:max-w-[534px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex justify-center gap-3 w-full items-center">
          <button
                onClick={handlePrev}
                className={`mt-4 py-2 px-4 rounded ${currentQuestionIndex > 0 ? 'bg-primary text-white' : 'bg-gray2 text-gray4 cursor-not-allowed'}`}
                disabled={currentQuestionIndex === 0} // Disable if on the first question
              >
                Previous
          </button>
            
          <button
            onClick={handleNext}
            className={`mt-4 w-20 py-2 rounded ${currentQuestionIndex === 0 ? formData.loginDetails.email.includes('@') ? 'bg-primary text-white' : 'bg-gray2 text-gray4 cursor-not-allowed' : currentQuestionIndex === 1 ? formData.loginDetails.password.length >= 6 ? 'bg-primary text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed' : formData.loginDetails.password === formData.loginDetails.confirmPassword ? 'bg-primary text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            disabled={!(currentQuestionIndex === 0 ? formData.loginDetails.email.includes('@') : currentQuestionIndex === 1 ? formData.loginDetails.password.length >= 6 : formData.loginDetails.password === formData.loginDetails.confirmPassword)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginDetails;
