// validationHelpers.js

export const validatePassportNo = (value) => {
    const passportRegex = /^[AB]\d{8}$/;
    return passportRegex.test(value) ? '' : 'Passport number must start with A or B followed by 8 numbers';
  };
  
  export const validateIssueDate = (value) => {
    const selectedDate = new Date(value);
    const today = new Date();
    return selectedDate <= today ? '' : 'Issue date cannot be in the future';
  };
  
  export const validateExpiryDate = (issueDate, expiryDate) => {
    if (!issueDate || !expiryDate) return '';
    
    const issue = new Date(issueDate);
    const expiry = new Date(expiryDate);
    const today = new Date();
    
    if (expiry < today) {
      return 'Expiry date cannot be in the past';
    }
    
    const yearsDifference = (expiry - issue) / (1000 * 60 * 60 * 24 * 365.25);
    const roundedYears = Math.round(yearsDifference);
    
    if (roundedYears !== 5 && roundedYears !== 10) {
      return 'Passport validity must be either 5 or 10 years';
    }
    
    return '';
  };
  
  export const validateNIN = (value) => {
    const ninRegex = /^\d+$/;
    return ninRegex.test(value) ? '' : 'NIN must contain only numbers';
  };
  
  export const validateStartDate = (value) => {
    const selectedDate = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today ? '' : 'Start date cannot be in the past';
  };
  
  export const validateEndDate = (value) => {
    const selectedDate = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today ? '' : 'End date cannot be in the past';
  };