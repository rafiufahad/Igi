export const hashPassword = async (password) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
};

// Function to validate password match
export const validatePasswordMatch = (password, confirmPassword) => {
  return password === confirmPassword ? '' : 'Passwords do not match';
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email format');
  }
  return email;
};


export const validatePassportNo = (value) => {
    const passportRegex = /^[AB]\d{8}$/;
    return passportRegex.test(value) ? '' : 'Passport number must start with A or B followed by 8 numbers';
  };
  
  export const validatePhoneNumber = (phone) => {
    // Remove any non-digit characters
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Check if the cleaned phone number is valid (you can adjust this regex as needed)
    const phoneRegex = /^[0-9]{10,14}$/;
    if (!phoneRegex.test(cleanPhone)) {
      throw new Error('Invalid phone number format');
    }
    
    return Number(cleanPhone);
  };

export const validateDateOfBirth = (value) => {
    const selectedDate = new Date(value);
    const today = new Date();
    return selectedDate <= today ? '' : 'Date of birth cannot be in the future';
  };




// Dates formating
export const validateDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date format');
  }

  // Format date to YYYY-MM-DD
  const formattedDate = date.toISOString().split('T')[0]; // 'toISOString' returns date in ISO format, and 'split' removes the time part
  return formattedDate;
};

export const validateStartDate = (value) => {
  try {
    const formattedValue = validateDate(value); // Validate and format the date
    const selectedDate = new Date(formattedValue);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today ? '' : 'Start date cannot be in the past';
  } catch (error) {
    return error.message; // Return the error message from validateDate
  }
};

export const validateEndDate = (value) => {
  try {
    const formattedValue = validateDate(value); // Validate and format the date
    const selectedDate = new Date(formattedValue);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today ? '' : 'End date cannot be in the past';
  } catch (error) {
    return error.message; // Return the error message from validateDate
  }
};

export const validateIssueDate = (value) => {
  try {
    const formattedValue = validateDate(value); // Validate and format the date
    const selectedDate = new Date(formattedValue);
    const today = new Date();
    return selectedDate <= today ? '' : 'Issue date cannot be in the future';
  } catch (error) {
    return error.message; // Return the error message from validateDate
  }
};

export const validateExpiryDate = (issueDate, expiryDate) => {
  if (!issueDate || !expiryDate) return '';

  try {
    const formattedIssueDate = validateDate(issueDate); // Validate and format the issue date
    const formattedExpiryDate = validateDate(expiryDate); // Validate and format the expiry date
    
    const issue = new Date(formattedIssueDate);
    const expiry = new Date(formattedExpiryDate);
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
  } catch (error) {
    return error.message; // Return the error message from validateDate
  }
};


    export const validateNIN = (value) => {
      const ninRegex = /^\d+$/;
      return ninRegex.test(value) ? '' : 'NIN must contain only numbers';
    };