import * as Yup from "yup";


export const signInValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .max(50, "Must be 50 characters or less")
    .min(6, "Must be above 6 characters")
});

export const loginWithOTPCodeValidationSchema = Yup.object().shape({
  otp: Yup.string().required("OTP is required")
});

export const loginWithClassCodeValidationSchema = Yup.object().shape({
  accessCode: Yup.string().required("Access code is required")
});

export const preSignUpValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  otp: Yup.string()
    .required("OTP is required")
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

  gender: Yup.string()
    .required("Gender is required"),

  state: Yup.string()
    .required("State is required"),

  city: Yup.string()
    .required("City is required"),

  zipCode: Yup.string()
    .required("Zipcode is required"),

  country: Yup.string()
    .required("Country is required"),

  addressLine1: Yup.string()
    .required("Address is required")
    .min(5, "Must be above 5 characters!")
});

export const addIndicatorValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name should be at least 2 characters long.")
    .required("Name is required"),

  category: Yup.string()
    .required("Category is Required"),

  type: Yup.string()
    .required("Type is required"),

  weight: Yup.string()
    .required("Weight is required"),

  min_score: Yup.string()
    .required("Minimum score is required"),

  max_score: Yup.string()
    .required("Maximum score is required"),

  uploadedFile: Yup.string()
    .required("Indicator icon is required")
}); 

export const uploadLessonValidationSchema = Yup.object().shape({
  topic: Yup.string()
    .min(2, "Topic should be at least 2 characters long.")
    .required("Topic is required"),

  description: Yup.string()
    .required("Description is Required"),

  date: Yup.string(),

  subject_id: Yup.string(),

  status: Yup.string(),

  thumbnail: Yup.string(),

  video: Yup.string(),

  attachment: Yup.string()

}); 

export const modifyLessonValidationSchema = Yup.object().shape({
  topic: Yup.string()
    .min(2, "Topic should be at least 2 characters long.")
    .required("Topic is required"),

  description: Yup.string()
    .required("Description is Required"),

  date: Yup.string(),

  subject_id: Yup.string(),

  status: Yup.string(),

  thumbnail: Yup.string(),

  video: Yup.string(),

  attachment: Yup.string()

}); 

export const modifyKPIIndicatorValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name should be at least 2 characters long.")
    .required("Name is required"),

  category: Yup.string()
    .required("Category is Required"),

  type: Yup.string()
    .required("Type is required"),

  weight: Yup.string()
    .required("Weight is required"),

  min_score: Yup.string()
    .required("Minimum score is required"),

  max_score: Yup.string()
    .required("Maximum score is required"),

  uploadedFile: Yup.string()
    .nullable()
    .required("Indicator icon is required")
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

export const modifyStudentValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("Kindly provide teacher's first name"),

  lastName: Yup.string()
    .required("Kindly provide teacher's last name"),

  otherNames: Yup.string().nullable(),

  subjects: Yup.array()
    .min(1, "Kindly select at least one (1) subject")
    .nullable()
    .required("Kindly select at least one (1) subject"),

  class_id: Yup.string().required("Student class is required")
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

export const submitTaskValidationSchema = Yup.object().shape({
  solution: Yup.string()
});

export const submitFeedbackValidationSchema = Yup.object().shape({
  task: Yup.array().of(
    Yup.object().shape({
      feedback: Yup.string().required("Feedback cannot be empty"),
      score: Yup.string().required("Score cannot be empty")
    })
  )
});

export const createGistValidationSchema = Yup.object().shape({
  body: Yup.string().required("Content body cannot be empty")
});

export const studentLoginValidationSchema = Yup.object().shape({
  pin: Yup.string()
    .required("Pin is required")
    .min(4, "Must Contain at least 4 Characters")
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

export const changePinValidationSchema = Yup.object().shape({
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

export const urgentInfoValidationSchema = Yup.object().shape({
  message: Yup.string()
    .required("Message content is required"),

  recipients: Yup.string()
    .when("user", {
      is: (value) => {
        return value && value.includes("recipients");
      },
      then: (rule) => rule.required("Recipients is required")
    }
    ) 
  // .test("recipients", "Recipients is required", function(value, allData) {
  //   console.log(value);
  //   let selectedUsers = allData.parent.user;
  //   console.log(selectedUsers);
  //   let result =  selectedUsers && selectedUsers.includes("recipients");
  //   console.log(result);
  //   return result;
  // }
  // )
  ,
  user: Yup.array()
    .min(1, "Kindly select at least one (1) user")
    .nullable()
    .required("Kindly select at least one (1) user")
});

export const urgentInfoTeacherValidationSchema = Yup.object().shape({
  message: Yup.string()
    .required("Message content is required"),

  student_id: Yup.object().shape({
    label: Yup.string().required("label is required"),
    value: Yup.string().required("value is required")
  })
  // .required("Kindly select a student")

  // user: Yup.array()
  //   .min(1, "Kindly select at least one (1) user")
  //   .nullable()
  //   .required("Kindly select at least one (1) user")
});

export const sendNotificationToParentValidationSchema = Yup.object().shape({
  message: Yup.string()
    .required("Message content is required"),

  recipients: Yup.string().required("Recipients is required")

  // user: Yup.array()
  //   .min(1, "Kindly select at least one (1) user")
  //   .nullable()
  //   .required("Kindly select at least one (1) user")
});

export const assignWardToParentValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .min(5, "Must be above 5 characters!")
    .max(225, "Too Long!")
    .required("Email is required"),

  student_id: Yup.string()
    .required("Kindly select at least one (1) user")
});

export const assignTeacherToClassValidationSchema = Yup.object().shape({
  class_id: Yup.string()
    .required("Kindly select a class"),
  teacher_id: Yup.string()
    .required("Kindly select a teacher")
});

export const rateTeacherValidationSchema = Yup.object().shape({
  comment: Yup.string()
});

export const assignSubjectsToTeacherValidationSchema = Yup.object().shape({
  subjects: Yup.array()
    .min(1, "Kindly select at least one (1) subject")
    .nullable().
    required("Kindly select at least one subject")
});

export const assignSubjectsToStudentValidationSchema = Yup.object().shape({
  subjects: Yup.array()
    .min(1, "Kindly select at least one (1) subject")
    .nullable().
    required("Kindly select at least one subject")
});

export const addStudentValidationSchema = Yup.object().shape({

  // name: Yup.string().required("Name is required"),

  firstName: Yup.string()
    .required("Kindly provide student first name"),

  lastName: Yup.string()
    .required("Kindly provide student last name"),

  otherNames: Yup.string(),

  gender: Yup.string().required("Gender is required"),

  phone: Yup.string(),

  class_id: Yup.string().required("Class is required"),

  guardian_email: Yup.array()
    // .min(1, "Kindly select at least one (1) guardian")
    .nullable()

  // guardian_email: Yup.string().required("Guardian / Parent is email required")
});

export const addNewTaskValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Kindly provide task name"),

  type: Yup.string()
    .required("Kindly provide task type"),

  subject_id: Yup.string().required("Kindly select a subject"),

  // format: Yup.string().required("Kindly select a format").nullable(),

  status: Yup.string().required("Kindly select a status"),

  // audience: Yup.string()
  //   .required("Kindly select assignment mode"),

  // selected_audience: Yup.array()
  //   .when("audience", {
  //     is: (value) => {
  //       console.log(value);
  //       return value && value === 1;
  //     },
  //     then: (rule) => {
  //       rule.min(1, "Kindly select at least one (1) student").required("Kindly select at least one student");
  //     }
  //   })
    
  // // .nullable()
  // // .required("Kindly select at least one (1) student")
  // ,

  due_date: Yup.string().required("Kindly select a due date")

  // attachment: Yup.string()

});

export const assignTaskValidationSchema = Yup.object().shape({
 
  audience: Yup.string()
    .required("Kindly select assignment mode"),

  selected_audience: Yup.array()
    .when("audience", {
      is: (value) => {
        console.log(value);
        return value && value === 1;
      },
      then: (rule) => {
        rule.min(1, "Kindly select at least one (1) student").required("Kindly select at least one student");
      }
    })
    
  // .nullable()
  // .required("Kindly select at least one (1) student")
});

export const modifyTaskValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Kindly provide task name"),

  type: Yup.string()
    .required("Kindly provide task type"),

  subject_id: Yup.string().required("Kindly select a subject"),

  // format: Yup.string().required("Kindly select a format").nullable(),

  status: Yup.string().required("Kindly select a status"),

  // audience: Yup.string()
  //   .required("Kindly select assignment mode"),

  // selected_audience: Yup.array()
  //   .when("audience", {
  //     is: (value) => {
  //       console.log(value);
  //       return value && value === 1;
  //     },
  //     then: (rule) => {
  //       rule.min(1, "Kindly select at least one (1) student").required("Kindly select at least one student");
  //     }
  //   })
    
  // // .nullable()
  // // .required("Kindly select at least one (1) student")
  // ,

  due_date: Yup.string().required("Kindly select a date")

  // attachment: Yup.string()

});


export const addTeacherValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("Kindly provide teacher's first name"),

  lastName: Yup.string()
    .required("Kindly provide teacher's last name"),

  otherNames: Yup.string(),

  // name: Yup.string()
  //   .required("Kindly provide teacher's name"),

  email: Yup.string()
    .email("Invalid email address")
    .min(5, "Must be above 5 characters!")
    .max(225, "Too Long!")
    .required("Email is required"),

  phone: Yup.string().required("Phone is required")

});

export const modifyWardProfileValidationSchema = Yup.object().shape({
  firstName: Yup.string(),

  lastName: Yup.string(),

  otherNames: Yup.string(),

  email: Yup.string()
    .email("Invalid email address")
    .min(5, "Must be above 5 characters!")
    .max(225, "Too Long!")
    .nullable()

  // phone: Yup.string().required("Phone is required")

});

export const modifyTeacherValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("Kindly provide teacher's first name"),

  lastName: Yup.string()
    .required("Kindly provide teacher's last name"),

  otherNames: Yup.string(),

  // name: Yup.string()
  //   .required("Kindly provide teacher's name"),

  email: Yup.string()
    .email("Invalid email address")
    .min(5, "Must be above 5 characters!")
    .max(225, "Too Long!")
    .required("Email is required"),

  phone: Yup.string().required("Phone is required")

});

export const modifyProprietorValidationSchema = Yup.object().shape({
  firstName: Yup.string(),

  lastName: Yup.string(),

  otherNames: Yup.string(),

  email: Yup.string()
    .email("Invalid email address")
    .min(5, "Must be above 5 characters!")
    .max(225, "Too Long!")
    .required("Email is required"),

  address: Yup.string()

  // phone: Yup.string().required("Phone is required")

});

export const saveNotificationsValidationSchema = Yup.object().shape({
  channel: Yup.string().required("Kindly select a channel")

});

export const modifyGuardianValidationSchema = Yup.object().shape({
  firstName: Yup.string(),

  lastName: Yup.string(),

  otherNames: Yup.string().nullable(),

  email: Yup.string()
    .email("Invalid email address")
    .min(5, "Must be above 5 characters!")
    .max(225, "Too Long!")
    .required("Email is required"),

  address: Yup.string()

  // phone: Yup.string().required("Phone is required")

});

export const modifyStudentProfileValidationSchema = Yup.object().shape({
  firstName: Yup.string(),

  lastName: Yup.string(),

  otherNames: Yup.string().nullable(),

  email: Yup.string()
    .email("Invalid email address")
    .min(5, "Must be above 5 characters!")
    .max(225, "Too Long!")
    .nullable(),

  address: Yup.string()

  // phone: Yup.string().required("Phone is required")

});

export const addClassValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Kindly provide a name"),

  description: Yup.string()

});

export const addSubjectValidationSchema = Yup.object().shape({
  subjects: Yup.array()
    .min(1, "Kindly select at least one (1) subject")
    .nullable().
    required("Kindly select at least one subject")
});

export const editSubjectValidationSchema = Yup.object().shape({
  subject: Yup.string()
    .required("Subject name is required")
});

export const modifyClassValidationSchema = Yup.object().shape({
  name: Yup.string(),

  description: Yup.string(),
  
  subjects: Yup.array()
    .min(1, "Kindly select at least one (1) subject")
    .nullable().
    required("Kindly select at least one subject")

});

export const inviteGuardianValidationSchema = Yup.object().shape({
  message: Yup.string(),

  email: Yup.string()
    .email("Invalid email address")
    .min(5, "Must be above 5 characters!")
    .max(225, "Too Long!")
    .required("Email is required"),

  // name: Yup.string()
  //   .required("Kindly provide a name")

  firstName: Yup.string()
    .required("First Name is required")
    .min(2, "First Name should be at least 2 characters"),

  lastName: Yup.string()
    .required("Last Name is required")    
    .min(2, "Last Name should be at least 2 characters"),

  otherNames: Yup.string()
});

export const stepOneValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First Name is required")
    .min(2, "First Name should be at least 2 characters"),

  lastName: Yup.string()
    .required("Last Name is required")    
    .min(2, "Last Name should be at least 2 characters"),

  otherNames: Yup.string(),

  email: Yup.string().email("Invalid email address").required("Email is required"),

  phone: Yup.string()
    .required("Phone Number is Required")
    .matches(
      /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,
      "Phone number is not valid"
    ),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Must Contain at least 8 Characters"),

  password_confirmation: Yup.string()
    .required("Password is required")
    .min(8, "Must Contain at least 8 Characters")
    .oneOf([Yup.ref("password")], "Passwords must and should match")
});

export const stepTwoValidationSchema = Yup.object().shape({
  addressLine1: Yup.string()
    .required("Address is required")    
    .min(2, "Last Name should be at least 2 characters"),

  country: Yup.string()
    .nullable()
    .required("Country is required"),

  state: Yup.string()
    .required("State is required"),

  city: Yup.string()
    .required("City is required")

});

export const stepThreeValidationSchema = Yup.object().shape({
  uploadedImage: Yup.mixed()
    
});