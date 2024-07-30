/**
 * Interface for defining custom error types with statusCode and message properties.
 */
interface CustomErrorType {
  type: ErrorConstructor;
  statusCode: number;
  message: string;
}

/**
 * A higher-order function that wraps an async function and handles errors.
 * 
 * @param fn The async function to be wrapped.
 * @param errorTypes An optional array of custom error types to handle. Defaults to an empty array.
 * @returns A middleware function that handles the wrapped async function.
 */
declare function asyncHandler<T = any>(
  fn: (req: any, res: any, next: Function) => Promise<T>,
  errorTypes?: CustomErrorType[]
): (req: any, res: any, next: Function) => void;

export { asyncHandler };
