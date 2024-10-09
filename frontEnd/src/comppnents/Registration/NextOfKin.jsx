import React, { useState, useContext } from "react";
import { AppContext } from '../../context/appContext';

const NextOfKin = ({ handleNextSection, onProgressUpdate }) => {
  const { formData, handleChange } = useContext(AppContext);

  const questions = [
    { name: 'fullName', label: 'Full Name', placeholder: 'Enter your Full Name' },
    { name: 'relationship', label: 'Relationship', placeholder: 'Enter your Relationship' },
    { name: 'address', label: 'Address', placeholder: 'Enter your Address' },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      onProgressUpdate((currentQuestionIndex + 1) / questions.length); // Update progress bar
    } else {
      handleNextSection();
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      onProgressUpdate((currentQuestionIndex - 1) / questions.length); // Update progress bar
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="mt-4 p-6 sm:p-12 bg-white rounded-lg shadow-lg w-full max-w-[646px] sm:h-[345px] flex flex-col justify-center items-center">
      <div className="flex flex-col items-start w-[151px]">
        <h2 className="text-2xl font-bold mb-4 text-accent">Next of Kin</h2>
        <p className={`bg-primary text-center h-1 rounded mb-6`} style={{ width: `${(currentQuestionIndex + 1) * 50.33}px`, transition: 'width 0.3s' }}></p>
      </div>

      <div className="flex flex-col items-center w-full sm:max-w-[534px]">
        <div className="mb-8 mt-4 w-full">
          <label className="block text-gray4 text-sm font-bold mb-2">{currentQuestion.label}</label>
          <input
            type="text"
            name={currentQuestion.name}
            placeholder={currentQuestion.placeholder}
            value={formData.nextOfKin[currentQuestion.name] || ''} // Use stored answer or empty
            onChange={(e) => handleChange('nextOfKin', currentQuestion.name, e.target.value)}
            className="border rounded w-full sm:max-w-[534px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* ---- Navigation Buttons ---- */}
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
            className={`mt-4 px-4 py-2 rounded ${formData.nextOfKin[currentQuestion.name] ? 'bg-primary text-white' : 'bg-gray2 text-gray4 cursor-not-allowed'}`}
            disabled={!formData.nextOfKin[currentQuestion.name]} // Disable if no answer
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default NextOfKin;
