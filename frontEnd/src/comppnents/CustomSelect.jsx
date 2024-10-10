import { useState, useEffect, useRef } from "react";

const CustomSelect = ({ name, options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value || "");
  const dropdownRef = useRef(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onChange({ target: { name, value: option } });
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const uniqueOptions = Array.from(new Set(options));

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        className="border rounded w-full py-2 px-3 cursor-pointer bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption || "Select"}
      </div>

      {isOpen && (
        <div className="absolute z-10 bg-white border rounded w-full mt-1 shadow-lg">
          <div className="max-h-48 overflow-y-auto">
            {uniqueOptions.map((option) => (
              <div
                key={option}
                onClick={() => handleOptionClick(option)}
                className="px-4 py-2 hover:bg-primary hover:text-white cursor-pointer"
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;