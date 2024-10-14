import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../context/appContext';
import CustomSelect from '../CustomSelect';
import { validatePhoneNumber, validateDateOfBirth } from '../../utils/validationHelper';

const PersonalData = ({ onProgressUpdate, handleNextSection }) => {
  const { countryList, stateList, handleChange, formData } = useContext(AppContext);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [validationError, setValidationError] = useState('');

  // const validateGSM = (value) => {
  //   const gsmRegex = /^0\d{10}$/;
  //   return gsmRegex.test(value) ? '' : 'Phone number must start with 0 and be 11 digits long';
  // };

  

  const questions = [
    { name: 'surname', label: 'Surname', type: 'text', placeholder: 'Enter your surname' },
    { name: 'other_names', label: 'Other Names', type: 'text', placeholder: 'Enter your other names' },
    { name: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female', 'Prefer not to say'] },
    { 
      name: 'dob', 
      label: 'Date of Birth', 
      type: 'date', 
      placeholder: 'Enter your date of birth',
      validate: validateDateOfBirth
    },
    { name: 'place_of_birth', label: 'Place of Birth', type: 'text', placeholder: 'Enter your place of birth' },
    { name: 'marital_status', label: 'Marital Status', type: 'select', options: ['Single', 'Married', 'Divorced', 'Widowed', 'Separated'] },
    { name: 'residence_addr1', label: 'Residence Address', type: 'text', placeholder: 'Enter your residence address' },
    { name: 'state_residence', label: 'State of Residence', type: 'select', options: stateList },
    { name: 'residence_lga', label: 'L.G.A of Residence', type: 'text', placeholder: 'Enter your L.G.A of residence' },
    { name: 'nationality', label: 'Nationality', type: 'select', options: countryList },
    { name: 'stateOfOrigin', label: 'State of Origin', type: 'select', options: stateList },
    { name: 'lgaOfOrigin', label: 'L.G.A of Origin', type: 'text', placeholder: 'Enter your L.G.A of origin' },
    { 
      name: 'telephone_number', 
      label: 'Telephone Number', 
      type: 'text', 
      placeholder: 'Enter your telephone number',
      validate: validatePhoneNumber
    },
];


  const currentQuestion = questions[currentQuestionIndex];
  const currentValue = formData.personalData[currentQuestion.name];
  const isFieldFilled = currentValue !== '';

  const validateCurrentField = () => {
    if (currentQuestion.validate) {
      const error = currentQuestion.validate(currentValue);
      setValidationError(error);
      return !error;
    }
    return true;
  };

  const handleNext = () => {
    if (!validateCurrentField()) {
      return;
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      onProgressUpdate((currentQuestionIndex + 1) / questions.length);
      setValidationError('');
    } else {
      handleNextSection();
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      onProgressUpdate((currentQuestionIndex - 1) / questions.length);
      setValidationError('');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange('personalData', name, value);
    setValidationError('');
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && isFieldFilled && !validationError) {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFieldFilled, currentQuestionIndex, validationError]);

  return (
    <div className="mt-4 p-6 sm:p-12 bg-white rounded-lg shadow-lg w-full max-w-[646px] sm:h-[345px] flex flex-col justify-center items-center">
      <div className="flex flex-col items-start w-[189px]">
        <h2 className="text-2xl font-bold mb-4 text-accent">Personal Data</h2>
        <p className="bg-primary text-center h-1 rounded mb-6" 
           style={{ width: `${(currentQuestionIndex + 1) * 13.5}px`, transition: 'width 0.3s' }}></p>
      </div>

      <div className="flex flex-col items-center w-full sm:max-w-[534px]">
        <div className="mb-8 mt-4 sm:w-full">
          <label className="block text-gray4 text-sm font-bold mb-2">{currentQuestion.label}</label>
          {currentQuestion.type === 'select' ? (
            <CustomSelect
              name={currentQuestion.name}
              options={currentQuestion.options}
              value={currentValue}
              onChange={handleInputChange}
            />
          ) : (
            <input
              type={currentQuestion.type}
              name={currentQuestion.name}
              placeholder={currentQuestion.placeholder}
              value={currentValue || ''}
              onChange={handleInputChange}
              className="border rounded w-full max-w-[534px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-50"
            />
          )}
          {validationError && (
            <p className="text-red-500 text-xs italic mt-1">{validationError}</p>
          )}
        </div>

        <div className="flex justify-center gap-3 w-full items-center">
          <button
            onClick={handlePrev}
            className={`mt-4 py-2 px-4 rounded ${currentQuestionIndex > 0 ? 'bg-primary text-white' : 'bg-gray2 text-gray4 cursor-not-allowed'}`}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className={`mt-4 w-20 py-2 rounded ${isFieldFilled && !validationError ? 'bg-primary text-white' : 'bg-gray2 text-gray4 cursor-not-allowed'}`}
            disabled={!isFieldFilled || !!validationError}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalData;