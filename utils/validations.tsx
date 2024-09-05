export const validations={
    EMAIL:{regex:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,errorMessage:"Please enter a valid email"},
    PASSWORD:{regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/,errorMessage:"Password neeeds to be greater than 8 characters,have atleast one upper and lowercase alphabet,have atleast one special character"},
    FIRSTNAME:{regex:/^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/,errorMessage:"Invalid first name"},
    LASTNAME:{regex:/^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/,errorMessage:"Invalid last name"},
    PHONENUMBER:{regex:/^\+?(\d{1,3})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$/,errorMessage:"Please enter a valid contact number"},
    PINCODE:{regex:/^\d{6}(?:[-\s]\d{4})?$/,errorMessage:"Please check the pincode"},
    PERCENTAGE:{regex:/^(100(?:\.0+)?|\d{1,2}(?:\.\d+)?)$/,errorMessage:"Enter a valid percentage"},
    GRADE:{regex:/^[A-Da-d][+-]?$|^F$|^F[+-]?$/,errorMessage:"Enter a valid grade"},
    GPA:{regex:/^(?:4\.0|[0-3](?:\.\d{1,2})?)$/,errorMessage:"Enter a valid GPA"},
    CGPA:{regex:/^(10(\.0+)?|[0-9](\.\d+)?)$/,errorMessage:"Enter a valid CGPA"}
}