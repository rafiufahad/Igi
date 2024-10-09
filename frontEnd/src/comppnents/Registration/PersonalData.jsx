import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../context/appContext';

const PersonalData = ({ onProgressUpdate, handleNextSection }) => {
  const { countryList, handleChange, formData } = useContext(AppContext);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Utility function to convert keys to Sentence Case
  const formatLabel = (key) => {
    return key
      .replace(/([A-Z])/g, ' $1') // Add space before each capital letter
      .replace(/_/g, ' ') // Replace underscores with spaces
      .trim() // Remove leading/trailing spaces
      .replace(/\b\w/g, char => char.toUpperCase()); // Capitalize the first letter of each word
  };

  // Custom labels and placeholders
  const customLabels = {
    residence_lga: { label: 'L.G.A of Residence', placeholder: 'Enter L.G.A of residence' },
    // Add more custom labels here if needed
  };

  // Dynamically map the questions based on personalData fields in AppContext
  const questions = Object.keys(formData.personalData).map((field) => {
    let label = customLabels[field]?.label || formatLabel(field); // Use custom label if exists
    let placeholder = customLabels[field]?.placeholder || `Enter your ${label.toLowerCase()}`; // Use custom placeholder if exists
    let type = 'text';

    switch (field) {
      case 'gender':
      case 'maritalStatus':
      case 'nationality':
        type = 'select';
        break;
      case 'dateOfBirth':
        type = 'date';
        break;
      case 'telephoneNumber':
        type = 'number';
        break;
      default:
        type = 'text';
    }

    return {
      name: field, // Keep the API key the same
      label, // Use formatted label
      type,
      placeholder, // Use formatted placeholder
      options: type === 'select' && field === 'gender' 
        ? ['Male', 'Female', 'Prefer not to say']
        : type === 'select' && field === 'marital_Status'
        ? ['Single', 'Married', 'Divorced', 'Widowed', 'Separated']
        : type === 'select' && field === 'nationality'
        ? countryList
        : [],
    };
  });

  const currentQuestion = questions[currentQuestionIndex];
  const isFieldFilled = formData.personalData[currentQuestion.name] !== '';

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
    handleChange('personalData', name, value);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && isFieldFilled) {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup event listener
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFieldFilled, currentQuestionIndex]);

  return (
    <div className="mt-4 p-6 sm:p-12 bg-white rounded-lg shadow-lg w-full max-w-[646px] sm:h-[345px] flex flex-col justify-center items-center">
      {/* ---- Section Title and Progress Bar ---- */}
      <div className="flex flex-col items-start w-[189px]">
        <h2 className="text-2xl font-bold mb-4 text-accent">Personal Data</h2>
        <p className="bg-primary text-center h-1 rounded mb-6" style={{ width: `${(currentQuestionIndex + 1) * 13.5}px`, transition: 'width 0.3s' }}></p>
      </div>

      {/* ---- Display the Current Question ---- */}
      <div className="flex flex-col items-center w-full sm:max-w-[534px]" >
        <div className="mb-8 mt-4 sm:w-full">
          <label className="block text-gray4 text-sm font-bold mb-2">{currentQuestion.label}</label>

          {currentQuestion.type === 'select' ? (
            <select
              name={currentQuestion.name}
              value={formData.personalData[currentQuestion.name] || ''}
              onChange={handleInputChange}
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select {currentQuestion.label}</option>
              {currentQuestion.options.map((option) => (
                <option key={option} value={option.toLowerCase()}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={currentQuestion.type}
              name={currentQuestion.name}
              placeholder={currentQuestion.placeholder}
              value={formData.personalData[currentQuestion.name] || ''}
              onChange={handleInputChange}
              className="border rounded w-full max-w-[534px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          )}
        </div>

        {/* ---- Navigation Buttons ---- */}
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

export default PersonalData;
