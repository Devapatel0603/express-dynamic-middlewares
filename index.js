class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}

const errorHandler = (err, req, res, next) => {
    const message = err.message || "Internal server error";
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        error: message,
    });
};

const asyncHandler = (fn, errorTypes = [{}]) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            const matchedErrorType = errorTypes.find(
                (e) => error instanceof e.type
            );
            if (matchedErrorType) {
                error.statusCode = matchedErrorType.statusCode;
                error.message = matchedErrorType.message;
            }
            next(error);
        }
    };
};
