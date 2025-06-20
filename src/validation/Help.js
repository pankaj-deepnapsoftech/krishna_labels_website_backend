import { object, string } from "yup";

export const HelpValidation = object({
    name: string().required("Name is required field"),
    mobile: string().required("Mobile is required field"),
    type: string()
    .oneOf(['Help', 'Quites'], "Type must be either 'Help' or 'Quites'")
    .required("Type is required field"),
});



