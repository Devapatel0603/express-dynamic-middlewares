import { ErrorHandler } from "./ErrorHandler.js";

const validator = (
    field,
    isEmpty = true,
    isEmail = false,
    minLength = 0,
    maxLength = 0,
    isPhoneNo = false
) => {
    return (req, res, next) => {
        const data = req.body;
        const value = data[field];

        if (!value) {
            throw new ErrorHandler(404, `${field} is required`);
        }

        if (maxLength !== 0) {
            if (minLength > maxLength) {
                return next(
                    new ErrorHandler(
                        400,
                        `minLength cannot be greater than maxLength`
                    )
                );
            }
        }

        if (isEmpty && !value) {
            if (typeof value === "string") {
                if (value.trim().length === 0) {
                    throw new ErrorHandler(
                        404,
                        `${field} shouldn't be not empty`
                    );
                }
            }
            throw new ErrorHandler(404, `${field} shouldn't be not empty`);
        }

        if (
            isEmail &&
            !/^[0-9a-zA-Z._]+@[a-zA-Z0-9]+[a-zA-Z0-9\.]+\.[a-zA-Z0-9]{2,}$/gi.test(
                value
            )
        ) {
            throw new ErrorHandler(404, `${field} is not a valid email`);
        }

        if (
            minLength !== 0 &&
            typeof value === "string" &&
            value.length < minLength
        ) {
            throw new ErrorHandler(
                404,
                `${field} must be at least ${minLength} characters long`
            );
        }
        if (
            maxLength !== 0 &&
            typeof value === "string" &&
            value.length > maxLength
        ) {
            throw new ErrorHandler(
                404,
                `${field} must be at most ${maxLength} characters long`
            );
        }

        if (isPhoneNo && typeof value === "string") {
            if (!/^[1-9]{1}[0-9]{9}$/gi.test(value)) {
                throw new ErrorHandler(
                    404,
                    `${field} is not a valid phone number number`
                );
            }
        } else if (isPhoneNo && typeof value === "number") {
            if (!/^[1-9]{1}[0-9]{9}$/gi.test(String(value))) {
                throw new ErrorHandler(
                    404,
                    `${field} is not a valid phone number`
                );
            }
        }

        next();
    };
};

const validateString = (field) => {
    return (req, res, next) => {
        const { [field]: value } = req.body;
        if (typeof value !== "string") {
            throw new ErrorHandler(404, `${field} must be String`);
        }
        next();
    };
};

const validateNumber = (field) => {
    return (req, res, next) => {
        const { [field]: value } = req.body;
        if (typeof value !== "number") {
            throw new ErrorHandler(404, `${field} must be Number`);
        }
        next();
    };
};

const validateBoolean = (field) => {
    return (req, res, next) => {
        const { [field]: value } = req.body;
        if (typeof value !== "boolean") {
            throw new ErrorHandler(404, `${field} must be Boolean`);
        }
        next();
    };
};

export { validator, validateBoolean, validateNumber, validateString };
