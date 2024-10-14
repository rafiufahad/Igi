import { createContext, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const stateList = [
        'Abia',
        'Adamawa',
        'Akwa Ibom',
        'Anambra',
        'Bauchi',
        'Bayelsa',
        'Benue',
        'Borno',
        'Cross River',
        'Delta',
        'Ebonyi',
        'Edo',
        'Ekiti',
        'Enugu',
        'Gombe',
        'Imo',
        'Jigawa',
        'Kaduna',
        'Kano',
        'Kogi',
        'Kwara',
        'Lagos',
        'Nasarawa',
        'Niger',
        'Ogun',
        'Ondo',
        'Osun',
        'Oyo',
        'Plateau',
        'Rivers',
        'Sokoto',
        'Taraba',
        'Yobe',
        'Zamfara',
      ];
      

    // Updated Country List
    const countryList = [
        "Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla",
        "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria",
        "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize",
        "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Bouvet Island",
        "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso",
        "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Cayman Islands", "Central African Republic",
        "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros",
        "Congo", "Cook Islands", "Costa Rica", "Cuba", "Cyprus", "Czech", "Denmark", "Djibouti", "Dominica",
        "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia",
        "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "French Guiana", "French Polynesia",
        "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar",
        "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau",
        "Guyana", "Haiti", "Heard Island and McDonald Islands", "Honduras", "Hong Kong", "Hungary", "Iceland",
        "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan",
        "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea (Republic of)", "Kuwait", "Kyrgyzstan", "Lao",
        "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Lithuania", "Luxembourg", "Madagascar", "Malawi",
        "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius",
        "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar",
        "Namibia", "Nauru", "Nepal", "Netherlands", "New Caledonia", "New Zealand", "Nicaragua", "Niger",
        "Nigeria", "Niue", "Norfolk Island", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea",
        "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Romania",
        "Russia", "Rwanda", "Samoa", "San Marino", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone",
        "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain",
        "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania",
        "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda",
        "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu",
        "Venezuela", "Vietnam", "Zambia", "Zimbabwe"
    ];

    // Updated countryZones
    const countryZones = {
        zone1: {
            africa: [
                "Abyssinia", "Algeria", "Angola", "Benin", "Botswana", "Burkina Faso", "Burundi", "Cameroon",
                "Cape Verde", "Central African Republic", "Chad", "Comoros", "Congo", "Cote D'Ivoire", "Djibouti",
                "Equatorial Guinea", "Eritrea", "Ethiopia", "Gabon", "Gambia", "Ghana", "Guinea", "Guinea-Bissau",
                "Kenya", "Lesotho", "Liberia", "Libya", "Madagascar", "Malawi", "Mali", "Mauritania", "Mauritius",
                "Morocco", "Mozambique", "Namibia", "Niger", "Nigeria", "Rwanda", "Sao Tome And Principe", "Senegal",
                "Seychelles", "Sierra Leone", "Somalia", "South Africa", "South Sudan", "Sudan", "Swaziland",
                "Tanzania", "Togo", "Tunisia", "Uganda", "Western Sahara", "Zambia", "Zimbabwe"
            ],
            middleEast: [
                "Bahrain", "Cyprus", "Egypt", "Iran", "Iraq", "Israel", "Jordan", "Kuwait", "Lebanon",
                "Oman", "Qatar", "Saudi Arabia", "Syrian Arab Republic", "United Arab Emirates", "Yemen"
            ],
            schengen: [
                "Austria", "Bulgaria", "Belgium", "Czech", "Croatia", "Denmark", "Estonia", "Finland",
                "France", "Germany", "Greece", "Hungary", "Iceland", "Italy", "Latvia", "Liechtenstein",
                "Lithuania", "Luxembourg", "Malta", "Netherlands", "Norway", "Poland", "Portugal", "Romania",
                "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland"
            ],
            europe: [
                "United Kingdom", "Ireland", "Russia", "Albania", "Andorra", "Armenia", "Azerbaijan", "Belarus",
                "Bosnia and Herzegovina", "Georgia", "Kosovo", "Macedonia", "Moldova", "Monaco", "Montenegro",
                "San Marino", "Serbia", "Turkey", "Ukraine", "Vatican City"
            ]
        },
        zone2: {
            allOthers: [
                "Afghanistan", "American Samoa", "Anguilla", "Antarctica", "Antigua And Barbuda", "Argentina", "Aruba",
                "Australia", "Bahamas", "Bangladesh", "Barbados", "Belize", "Bermuda", "Bhutan", "Bolivia", "Bouvet Island",
                "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Cambodia", "Canada", "Cayman Islands",
                "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Cook Islands", "Costa Rica",
                "Cuba", "Dominica", "Dominican Republic", "Ecuador", "El Salvador", "Falkland Islands (Malvinas)", "Faroe Islands",
                "Fiji", "French Guiana", "French Polynesia", "French Southern Territories", "Gibraltar", "Greenland", "Grenada",
                "Guadeloupe", "Guam", "Guatemala", "Guyana", "Haiti", "Heard Island and Mcdonald Islands", "Honduras", "Hong Kong",
                "India", "Indonesia", "Jamaica", "Japan", "Kazakhstan", "Kiribati", "Korea (Democratic People's Republic of)",
                "Korea (Republic of)", "Kyrgyzstan", "Lao People's Democratic Republic", "Macao", "Malaysia", "Maldives",
                "Marshall Islands", "Martinique", "Mayotte", "Mexico", "Micronesia (Federated States of)", "Mongolia", "Montserrat",
                "Myanmar", "Nauru", "Nepal", "Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niue", "Norfolk Island",
                "Northern Mariana Islands", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines",
                "Pitcairn", "Puerto Rico", "Reunion", "Saint Helena", "Saint Kitts And Nevis", "Saint Lucia", "Saint Pierre And Miquelon",
                "Saint Vincent And The Grenadines", "Samoa", "Singapore", "Solomon Islands", "South Georgia", "South Sandwich Islands",
                "Sri Lanka", "Suriname", "Svalbard And Jan Mayen", "Taiwan", "Tajikistan", "Thailand", "Timor-Leste", "Tokelau",
                "Tonga", "Trinidad And Tobago", "Turkmenistan", "Turks And Caicos Islands", "Tuvalu", "United States", "Uruguay",
                "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Virgin Islands (British)", "Virgin Islands (U.S.)", "Wallis And Futuna"
            ]
        },
        zone3: 'Worldwide',
    };

    const getAllZone1Countries = [...countryZones.zone1.africa, ...countryZones.zone1.middleEast, ...countryZones.zone1.schengen, ...countryZones.zone1.europe];

    const getAllZone2Countries = [...countryZones.zone2.allOthers];

    const getAllCountries = [...getAllZone1Countries, ...getAllZone2Countries];
    
    
    // const initialState = {
    //     personalData: {
    //       surname: '',                        
    //       other_names: '',                    
    //       gender: '',                         
    //       dob: '',                    
    //       place_of_birth: '',                 
    //       marital_status: '',                 
    //       residence_addr1: '',                
    //       state_residence: '',                
    //       residence_lga: '',                  
    //       nationality: '',                    
    //       stateOfOrigin: '',                  
    //       lgaOfOrigin: '',                    
    //       telephone_number: '',               
    //     },
    //     nextOfKin: {
    //       fullName: '',
    //       relationship: '',
    //       address: '',
    //     },
    //     coverDestination: {
    //       passportNo: '',                     
    //       issuance_date: '',                  
    //       expiry_date: '',                    
    //       nin: '',                            
    //       destination: '',                    
    //       startDate: '',                      
    //       endDate: '',                        
    //     },
    //     loginDetails: {
    //       email: '',                          
    //       password: '',                       
    //       confirmPassword: '', 
    //     },
    //     others: {
    //       q1: '',
    //       q2: '',
    //     },
    //   };
      
    const initialState = {
        personalData: {
          surname: 'Doe',
          other_names: 'John',
          gender: 'Male',
          dob: '1990-12-10',
          place_of_birth: 'Cityville',
          marital_status: 'Single',
          residence_addr1: '123 Main St',
          state_residence: 'California',
          residence_lga: 'Los Angeles',
          nationality: 'NG',
          stateOfOrigin: 'California',
          lgaOfOrigin: 'Los Angeles',
          telephone_number: 9087651222,
        },
        nextOfKin: {
          fullName: 'Jane Doe',
          relationship: 'Sister',
          address: '456 Oak St',
        },
        coverDestination: {
          passportNo: 'A12345678',
          issuance_date: '2020-01-31',
          expiry_date: '2030-01-21',
          nin: '1234567890',
          destination: 'USA',
          startDate: '2023-01-01',
          endDate: '2024-01-01',
        },
        loginDetails: {
          email: 'magret.doee@example.com',
          password: 'University2@',
          confirmPassword: 'University2@',
        },
        others: {
          q1: 'Yes',
          q2: 'No',
          image: 'base64EncodedImageString', // Use a sample base64 encoded string for testing
        },
      };
      
      

      
    
    

    const [formData, setFormData] = useState(initialState);

    const handleChange = (section, field, value) => {
        setFormData((prevData) => {
            if (prevData[section][field] === value) return prevData;
            return {
                ...prevData,
                [section]: { ...prevData[section], [field]: value }
            };
        });
    };

    const value = {
        countryList,
        formData,
        handleChange,
        countryZones,
        getAllZone1Countries,
        getAllZone2Countries,
        getAllCountries,
        stateList
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;

