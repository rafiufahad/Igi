import { useState, useContext } from "react";
import { AppContext } from '../../context/appContext';

const CoverDestination = ({ handleNextSection, onProgressUpdate }) => {
  const { countryList, formData, handleChange, countryZones } = useContext(AppContext);

  const questions = [
    { id: 1, label: 'passportNo', title: 'Passport No:', type: 'text', placeholder: 'Enter your Passport No' },
    { id: 2, label: 'issueDate', title: 'Issue Date:', type: 'date' },
    { id: 3, label: 'expiryDate', title: 'Expiry Date:', type: 'date' },
    { id: 4, label: 'nin', title: 'NIN:', type: 'number', placeholder: 'Enter your NIN' },
    { id: 5, label: 'destination', title: 'Destination:',
      type: 'select',
      options: countryList, // Using countryList from context
      placeholder: 'Choose your destination'
    },
    { id: 6, label: 'startDate', title: 'Start Date:', type: 'date' },
    { id: 7, label: 'endDate', title: 'End Date:', type: 'date' },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Helper function to render countries under headers
  const renderCountryOptions = () => {
    const zoneData = [
      { header: "SCHENGEN", countries: countryZones.zone1.schengen },
      { header: "AFRICA", countries: countryZones.zone1.africa },
      { header: "MIDDLE EAST", countries: countryZones.zone1.middleEast },
      { header: "EUROPE", countries: countryZones.zone1.europe },
      { header: "ALL OTHERS", countries: countryZones.zone2.allOthers },
      { header: "WORLDWIDE", countries: ["Worldwide"] } // Special case for Worldwide
    ];

    return zoneData.map(zone => (
      <optgroup key={zone.header} label={zone.header} className="capitalize font-bold text-lg">
        {zone.countries.map((country) => (
          <option key={country} value={country.toLowerCase()}>
            {country.charAt(0).toLowerCase() + country.slice(1).toLowerCase()}
          </option>
        ))}
      </optgroup>
    ));
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      onProgressUpdate((currentQuestionIndex - 1) / questions.length); // Update progress bar
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      onProgressUpdate((currentQuestionIndex + 1) / questions.length); // Update progress bar
    } else {
      // console.log(formData.coverDestination); Log the entire object when done
      handleNextSection();
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="mt-4 p-6 sm:p-12 bg-white rounded-lg shadow-lg w-full max-w-[646px] sm:h-[345px] flex flex-col justify-center items-center">
      <div className="flex flex-col items-start w-[270px]">
        <h2 className="text-2xl font-bold mb-4 text-accent">Cover & Destination</h2>
        <p className={`bg-primary text-center h-1 rounded mb-6`} style={{ width: `${(currentQuestionIndex + 1) * 38.6}px`, transition: 'width 0.3s' }}></p>
      </div>

      <div className="flex flex-col items-center w-full sm:max-w-[534px]">
        <div className="mb-8 mt-4 w-full">
          <label className="block text-gray4 text-sm font-bold mb-2">{currentQuestion.title}</label>

          {currentQuestion.type === 'select' ? (
            <select
              value={formData.coverDestination[currentQuestion.label] || ''} // Use stored answer or empty
              onChange={(e) => handleChange('coverDestination', currentQuestion.label, e.target.value)}
              className="border rounded w-full sm:w-[534px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Choose a {currentQuestion.title}</option>
              {renderCountryOptions()}
            </select>
          ) : (
            <input
              type={currentQuestion.type}
              placeholder={currentQuestion.placeholder}
              value={formData.coverDestination[currentQuestion.label] || ''} // Use stored answer or empty
              onChange={(e) => handleChange('coverDestination', currentQuestion.label, e.target.value)}
              className="border rounded w-full max-w-[534px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          )}
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
            className={`mt-4 w-20 py-2 rounded ${formData.coverDestination[currentQuestion.label] ? 'bg-primary text-white' : 'bg-gray2 text-gray4'}`}
            disabled={!formData.coverDestination[currentQuestion.label]} // Disable if no answer
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoverDestination;
