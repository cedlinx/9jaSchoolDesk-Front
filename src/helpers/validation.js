import * as Yup from "yup";
import moment from "moment";


export const signInValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required(),
  password: Yup.string()
    .required()
    .max(50, "Must be 50 characters or less")
    .min(6, "Must be above 6 characters")
});

export const signUpValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name should be at least 2 characters long.")
    .required("Name is required"),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Must Contain at least 8 Characters"),

  password_confirmation: Yup.string()
    .required("Password is required")
    .min(8, "Must Contain at least 8 Characters")
    .oneOf([Yup.ref("password")], "Passwords must and should match"),

  email: Yup.string()
    .email("Invalid email address")
    .min(5, "Must be above 5 characters!")
    .max(225, "Too Long!")
    .required("Email is required"),
  
  phone: Yup.string()
    .required("Phone Number is Required")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Phone number is not valid"
    )
    .min(10, "Must be above 10 digits"),

  pin: Yup.string()
    .required("Pin is Required")
    .matches(
      /^\d{4}$/, 
      "Enter Four (4) Digits"
    ),

  address: Yup.string()
    .required("Address is required")
    .min(5, "Must be above 5 characters!")
});

export const addAssetValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name should be at least 2 characters long.")
    .required("Name is required"),

  pin: Yup.string()
    .required("Pin is Required")
    .matches(
      /^\d{4}$/, 
      "Enter Four (4) Digits"
    ),

  type_id: Yup.string()
    .required("Asset Type is required"),

  assetid: Yup.string()
    .required("Asset ID is required")
    .min(2, "Must be above 2 characters!"),

  transferable: Yup.string()
    .required("Value is required"),

  lng: Yup.string(),

  lat: Yup.string(),

  uploadedFile: Yup.mixed()
}); 

export const modifyAssetValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name should be at least 2 characters long.")
    .required("Name is required"),

  pin: Yup.string()
    .required("Pin is Required")
    .matches(
      /^\d{4}$/, 
      "Enter Four (4) Digits"
    ),

  type_id: Yup.string()
    .required("Asset Type is required"),

  transferable: Yup.string()
    .required("Value is required"),

  lng: Yup.string(),

  lat: Yup.string(),

  uploadedFile: Yup.mixed()
}); 

export const addAssetCategoryValidationSchema = Yup.object().shape({
  type: Yup.string()
    .min(2, "Category Name should be at least 2 characters long.")
    .required("Category Name is required"),

  slug: Yup.string()
    .min(2, "Slug should be at least 2 characters long.")
    .required("Slug is required"),

  description: Yup.string()
    .min(2, "Description should be at least 2 characters long.")
    .required("Description is required"),

  allowEdit: Yup.string()
    .required("Value is required")
}); 

export const reportAssetValidationSchema = Yup.object().shape({
  assetId: Yup.string()
    .required("Asset ID is required"),

  message: Yup.string()
    .required("Value is required")
}); 

export const transferAssetValidationSchema = Yup.object().shape({
  transferTo: Yup.string()
    .email("Invalid email address")
    .min(5, "Must be above 5 characters!")
    .max(225, "Too Long!")
    .required("Email is required"),

  pin: Yup.string()
    .required("Pin is Required")
    .max(4)
    .matches(
      /^\d{4}$/, 
      "Enter Four (4) Digits"
    ),

  id: Yup.string()
    .required("Asset ID is required"),

  transferReason: Yup.string()
  // .required("Longitude is required")
    .min(2, "Must be above 2 characters!")
}); 

export const bulkTransferAssetValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .min(5, "Must be above 5 characters!")
    .max(225, "Too Long!")
    .required("Email is required"),

  codeNumber: Yup.string()
    .required("Code Number is Required")
}); 

export const addUserValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name should be at least 2 characters long.")
    .required("Name is required"),

  group_id: Yup.string()
    .required("Group ID is required"),

  role: Yup.string()
    .required("Role is required"),

  email: Yup.string()
    .email("Invalid email address")
    .min(5, "Must be above 5 characters!")
    .max(225, "Too Long!")
    .required("Email is required"),
  
  phone: Yup.string()
    .required("Phone Number is Required")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Phone number is not valid"
    )
    .min(10, "Must be above 10 digits")
});


export const contactUsValidationSchema = Yup.object().shape({
  firstname: Yup.string()
    .matches("[a-zA-Z]+", {
      message: "Firstname must be at least 2 characters long.",
      excludeEmptyString: false
    })
    .min(2, "First Name should be at least 2 characters.")
    .max(225, "Too long. First Name should be 225 characters long.")
    .required("First Name is required"),

  subject: Yup.string()
    .matches("[a-zA-Z]+", {
      message: "Subject must be at least 2 characters long.",
      excludeEmptyString: false
    })
    .min(2, "Subject should be at least 2 characters.")
    .max(225, "Too long. Subject should be 225 characters long.")
    .required("Subject is required"),

  message: Yup.string()
    .required("Message is required"),

  trainings: Yup.string()
    .required("Training is required"),

  lastname: Yup.string()
    .min(2, "Last Name should be at least 2 characters long.")
    .max(225, "Too long. Last Name should be 255 characters long.")
    .matches("[a-zA-Z]+", {
      message: "Lastname must be alphabets.",
      excludeEmptyString: false
    })
    .required("Last Name is required"),

  email: Yup.string()
    .email("Invalid email address")
    .min(5, "Must be above 5 characters!")
    .max(225, "Too Long!")
    .required("Email is required"),

  phoneNumber: Yup.string()
    .required("Phone Number is Required")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Phone number is not valid"
    )
});

export const modifyUserValidationSchema = Yup.object().shape({
  // firstName: Yup.string()
  // 	.required("First Name is required")
  // 	.max(100, "Must be 100 characters or less"),
  // lastName: Yup.string()
  // 	.required("Last Name is required")
  // 	.max(100, "Must be 100 characters or less"),
  // secondName: Yup.string()
  // 	.required("Second Name is required")
  // 	.max(100, "Must be 100 characters or less"),
  name: Yup.string()
    .required("Name is required")
    .max(100, "Must be 100 characters or less"),
  phone: Yup.string()
    .required("Phone Number is Required")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Phone number is not valid"
    )
    .min(10, "Must be above 10 digits"),
  // stateOfResidence: Yup.string()
  // 	.required("State of residence cannot be empty"),
  // city: Yup.string()
  // 	.required("City cannot be empty"),
  address: Yup.string()
    .required("House Address cannot be empty")
  // nearestBusStop: Yup.string()
  // 	.required("Nearest Bus stop cannot be empty")

});

export const modifyWebsiteDetailsValidationSchema = Yup.object().shape({
  websiteName: Yup.string()
    .required("Website Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .min(5, "Must be above 5 characters!")
    .max(225, "Too Long!")
    .required("Email is required"),
  phone: Yup.string()
    .required("Phone Number is Required")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Phone number is not valid"
    )
    .min(10, "Must be above 10 digits"),

  tagline: Yup.string().required("Tagline is required"),

  copyright: Yup.string().required("Copyright info is required")
	
});

export const verifyAssetValidationSchema = Yup.object().shape({

  serialNumber: Yup.string()
    .min(2, "Must be above 2 characters!"),

  phone: Yup.string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Phone number is not valid"
    )
    .min(10, "Must be above 10 digits")
});

export const reportFoundAssetValidationSchema = Yup.object().shape({

  asset_name: Yup.string().required("Asset name cannot be empty")
    .min(2, "Must be above 2 characters!"),

  location: Yup.string().required("Location cannot be empty")
    .min(2, "Must be above 2 characters!"),

  identifier: Yup.string().required("Asset Identifier cannot be empty")
    .min(2, "Must be above 2 characters!"),
		
  asset_description: Yup.string()
    .matches(/.{2,}/, {
      excludeEmptyString: true,
      message: "Must be above 2 characters!"
    }),
	
  name: Yup.string()
    .matches(/.{2,}/, {
      excludeEmptyString: true,
      message: "Must be above 2 characters!"
    }),
		
  email: Yup.string()
    .notRequired()
    .when("email", {
      is: (value) => value?.length,
      then: (rule) => rule.email("Invalid email address")
        .min(5, "Must be above 5 characters!")
        .max(225, "Too Long!")
    }),

  phone: Yup.string()
    .notRequired()
    .when("phone", {
      is: (value) => value?.length,
      then: (rule) => rule.min(10, "Must be above 10 digits").matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "Phone number is not valid"
      )
    })
},
[
  // Add Cyclic deps here because when require itself
  ["phone", "phone"], ["email", "email"]
]
);

export const forgotPasswordValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required()
});

export const requestVerificationLinkValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required()
});

export const emailVerificationValidationSchema = Yup.object().shape({
  email: Yup.string().email("Enter a valid email address").required("Required")
});

export const resetPasswordValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .min(5, "Must be above 5 characters!")
    .max(225, "Too Long!")
    .required("Email is required"),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Must Contain at least 8 Characters"),

  password_confirmation: Yup.string()
    .required("Password is required")
    .min(8, "Must Contain at least 8 Characters")
    .oneOf([Yup.ref("password")], "Passwords must and should match")
});

export const formatDate = (date) => {
  return moment(date, "hh:mm A").format("\"hh:mm A\"");
};

const getAdayBeforeToday = () => {
  let today = new Date();
  today.setDate(today.getDate() - 1);
  return today;
};

export const changePasswordValidationSchema = Yup.object().shape({
  current_password: Yup.string()
    .required("The Current Password is required")
    .min(8, "Must be at least 8 Characters"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Must Contain at least 8 Characters"),

  password_confirmation: Yup.string()
    .required("Password is required")
    .min(8, "Must Contain at least 8 Characters")
    .oneOf([Yup.ref("password")], "Passwords must and should match")
});
