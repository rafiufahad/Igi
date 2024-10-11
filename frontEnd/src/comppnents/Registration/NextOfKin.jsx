import React, { useState, useContext, useEffect } from "react";
import { AppContext } from '../../context/appContext';
import CustomSelect from '../CustomSelect';

const NextOfKin = ({ handleNextSection, onProgressUpdate }) => {
  const { formData, handleChange } = useContext(AppContext);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const questions = [
    { 
      name: 'fullName',  // Matches the 'nextOfKin' object in formData
      label: 'Full Name', 
      type: 'text', 
      placeholder: 'Enter your Full Name' 
    },
    { 
      name: 'relationship',  // Matches the 'nextOfKin' object in formData
      label: 'Relationship', 
      type: 'select', 
      options: [
        'Spouse', 'Parent', 'Child', 'Sibling', 'Guardian', 'Grandparent', 'Aunt', 
        'Uncle', 'Cousin', 'Niece', 'Nephew', 'Partner', 'Friend'
      ] 
    },
    { 
      name: 'address',  // Matches the 'nextOfKin' object in formData
      label: 'Address', 
      type: 'text', 
      placeholder: 'Enter your Address' 
    }
];


  const currentQuestion = questions[currentQuestionIndex];
  const currentValue = formData.nextOfKin[currentQuestion.name];
  const isFieldFilled = currentValue !== '';

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      onProgressUpdate((currentQuestionIndex + 1) / questions.length);
    } else {
      handleNextSection();
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      onProgressUpdate((currentQuestionIndex - 1) / questions.length);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange('nextOfKin', name, value);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && isFieldFilled) {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFieldFilled, currentQuestionIndex]);

  return (
    <div className="mt-4 p-6 sm:p-12 bg-white rounded-lg shadow-lg w-full max-w-[646px] sm:h-[345px] flex flex-col justify-center items-center">
      <div className="flex flex-col items-start w-[151px]">
        <h2 className="text-2xl font-bold mb-4 text-accent">Next of Kin</h2>
        <p 
          className="bg-primary text-center h-1 rounded mb-6" 
          style={{ width: `${(currentQuestionIndex + 1) * 50.33}px`, transition: 'width 0.3s' }}
        ></p>
      </div>

      <div className="flex flex-col items-center w-full sm:max-w-[534px]">
        <div className="mb-8 mt-4 w-full">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            {currentQuestion.label}
          </label>
          {currentQuestion.type === 'select' ? (
            <CustomSelect
              name={currentQuestion.name}
              options={currentQuestion.options}
              value={currentValue}
              onChange={handleInputChange}
            />
          ) : (
            <input
              type="text"
              name={currentQuestion.name}
              placeholder={currentQuestion.placeholder}
              value={currentValue || ''}
              onChange={handleInputChange}
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-50"
            />
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
            className={`mt-4 w-20 py-2 rounded ${isFieldFilled ? 'bg-primary text-white' : 'bg-gray2 text-gray4 cursor-not-allowed'}`}
            disabled={!isFieldFilled}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default NextOfKin;