/**
 * Interface for error handler class (assuming ErrorHandler exists elsewhere).
 */
interface ErrorHandler {
  (statusCode: number, message: string): Error;
}

/**
 * A function to validate a field in a request body with specific validation options.
 * 
 * @param field The name of the field to validate.
 * @param isEmpty (Optional) Whether to check if the field is empty (default: true).
 * @param isEmail (Optional) Whether to check if the field is a valid email (default: false).
 * @param minLength (Optional) The minimum length for the field (default: 0).
 * @param maxLength (Optional) The maximum length for the field (default: 0).
 * @param isPhoneNo (Optional) Whether to check if the field is a valid phone number (default: false).
 * @returns A middleware function that performs validation.
 */
declare function validator(
  field: string,
  isEmpty?: boolean,
  isEmail?: boolean,
  minLength?: number,
  maxLength?: number,
  isPhoneNo?: boolean
): (req: any, res: any, next: Function) => void;


/**
 * A middleware function that validates if a field is a string.
 * 
 * @param field The name of the field to validate.
 * @returns A middleware function that performs validation.
 */
declare function validateString(field: string): (req: any, res: any, next: Function) => void;

/**
 * A middleware function that validates if a field is a number.
 * 
 * @param field The name of the field to validate.
 * @returns A middleware function that performs validation.
 */
declare function validateNumber(field: string): (req: any, res: any, next: Function) => void;

/**
 * A middleware function that validates if a field is a boolean.
 * 
 * @param field The name of the field to validate.
 * @returns A middleware function that performs validation.
 */
declare function validateBoolean(field: string): (req: any, res: any, next: Function) => void;

export { validator, validateBoolean, validateNumber, validateString };
