import { useState, useContext, useEffect } from "react";
import { AppContext } from '../../context/appContext';
import CustomSelect from '../CustomSelect';
import { validatePassportNo, validateIssueDate, validateExpiryDate, validateNIN, validateStartDate, validateEndDate } from '../../utils/validationHelper';

const CoverDestination = ({ handleNextSection, onProgressUpdate }) => {
  const { formData, handleChange, countryZones } = useContext(AppContext);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [validationError, setValidationError] = useState('');

  const questions = [
    { 
      name: 'passportNo', 
      label: 'Passport No:', 
      type: 'text', 
      placeholder: 'Enter your Passport No', 
      validate: validatePassportNo 
    },
    { 
      name: 'issuance_date',  
      label: 'Issuance Date:', 
      type: 'date', 
      validate: validateIssueDate 
    },
    { 
      name: 'expiry_date',  
      label: 'Expiry Date:', 
      type: 'date', 
      validate: (value) => validateExpiryDate(formData.coverDestination.issuance_date, value) 
    },
    { 
      name: 'nin', 
      label: 'NIN:', 
      type: 'text', 
      placeholder: 'Enter your NIN', 
      validate: validateNIN 
    },
    { 
      name: 'destination', 
      label: 'Destination:',
      type: 'select',
      options: [
        { header: "SCHENGEN", countries: countryZones.zone1.schengen },
        { header: "AFRICA", countries: countryZones.zone1.africa },
        { header: "MIDDLE EAST", countries: countryZones.zone1.middleEast },
        { header: "EUROPE", countries: countryZones.zone1.europe },
        { header: "ALL OTHERS", countries: countryZones.zone2.allOthers },
        { header: "WORLDWIDE", countries: ["Worldwide"] }
      ],
      groupedOptions: true
    },
    { 
      name: 'startDate', 
      label: 'Start Date:', 
      type: 'date', 
      validate: validateStartDate 
    },
    { 
      name: 'endDate', 
      label: 'End Date:', 
      type: 'date', 
      validate: validateEndDate 
    }
];


  const currentQuestion = questions[currentQuestionIndex];
  const currentValue = formData.coverDestination[currentQuestion.name];
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
    handleChange('coverDestination', name, value);
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
      <div className="flex flex-col items-start w-[270px]">
        <h2 className="text-2xl font-bold mb-4 text-accent">Cover & Destination</h2>
        <p className="bg-primary text-center h-1 rounded mb-6" 
           style={{ width: `${(currentQuestionIndex + 1) * 38.6}px`, transition: 'width 0.3s' }}></p>
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
              groupedOptions={currentQuestion.groupedOptions}
            />
          ) : (
            <input
              type={currentQuestion.type}
              name={currentQuestion.name}
              placeholder={currentQuestion.placeholder}
              value={currentValue || ''}
              onChange={handleInputChange}
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-50"
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

export default CoverDestination;
