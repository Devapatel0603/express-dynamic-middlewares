# Express Dynamic Middlewares

This npm package acts as a data security guard for your Express applications. It offers validation for incoming data (emails, usernames, etc.) and provides custom error handling. Additionally, it includes middleware wrapping functions to streamline asynchronous operations and enhance your development experience.

## Installation

Install the package using npm or yarn:

```bash
npm install express-dynamic-middlewares
```

or

```bash
yarn add express-dynamic-middlewares
```

## Usage/Examples

**_ErrorHandler Class_**\
The `ErrorHandler` class is a custom error class that extends the native JavaScript Error class. It allows you to specify a statusCode and message for the error.

```javascript
throw new ErrorHandler(404, "Page not found");
```

**_errorHandler Middleware_**\
The `errorHandler` middleware handles errors thrown in your Express application, providing a standardized JSON response.\
Catches all errors thrown in your application routes and returns a JSON response with:

-   success: false to indicate an error
-   error: message containing the error message or a default "Internal server error"
-   Optional statusCode for specific error classification (defaults to 500)
-   Make sure to use this middleware after all routes

```javascript
app.use(errorHandler);
```

**_asyncHandler Middleware_**\
The `asyncHandler` middleware wraps asynchronous functions to catch errors and pass them to the next middleware. This helps in keeping your route handlers clean and free from try-catch blocks.
It takes two arguments one is function and second is Array to handle specific errors. Array is optional argument.

```javascript
app.get("/get", asyncHandler(getFunction));
```

Optional Error Handling Array: Customize error handling by providing an optional array as the second argument to `asyncHandler`. This array lets you define specific error types and their corresponding HTTP status codes and messages.

```javascript
const errorOptions = [
    {
        type: TypeError,
        statusCode: 400,
        message: "Bad request due to type error",
    },
];

app.get("/data", asyncHandler(getData, errorOptions)); // getData is your asynchronous function
```

**_validator Middleware_**\
The `validator` function creates a middleware for validating parameters in request body.

```javascript
app.post(
    "/register",
    validator(
        "username", //Make sure that request body contain username
        true, // (true means check for emptiness or existence)(Optional)(Default : true)
        false, // (false means don't check for whether it's an email or not)(Optional)(Default : false)
        5, // Minimum length(Optional)(Default : 0)(When 0 don't check for minLenght)
        20, // Maximum length(Optional)(Default : 0)(When 0 don't check for maxLength)
        false // (false means don't check for whether it's phone no. or not)(Optional)(Default : false)
    ),
    asyncHandler(registerUser)
);
```

Additional Validation Middlewares: For your convenience, `express-dynamic-middlewares` offers pre-built validation middlewares like `validateString`, `validateNumber`, and `validateBoolean`.

```javascript
app.get(
    "/get",
    validateString("name"),
    validator("name", true, false, 5, 20, false),
    asyncHandler(getFunction)
);
```

### Example

```javascript
const express = require("express");
const {
    ErrorHandler,
    errorHandler,
    asyncHandler,
    validator,
} = require("express-dynamic-middlewares");

const app = express();

//All routes
app.post(
    "/register",
    validator("email", true, true, 0, 0, false),
    asyncHandler(async (req, res) => {
        //Throw error
        if (username === "admin@gmail.com") {
            throw new ErrorHandler(
                403,
                "This email is not allowed for registration."
            );
        }
        res.json({ success: true, message: "User registered successfully!" });
    })
);

app.use(errorHandler);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
```

#### Handling Custom Errors

To handle specific error types, you can customize one array. This array should contain objects with `type`, `statusCode`, and `message` properties. Add this logic inside your project where `asyncHandler` is used.

```javascript
const express = require("express");
const {
    ErrorHandler,
    errorHandler,
    asyncHandler,
} = require("express-dynamic-middlewares");

const app = express();

const errorTypes = [
    {
        type: TypeError,
        statusCode: 400,
        message: "Type error occurred",
    },
    {
        type: ReferenceError,
        statusCode: 500,
        message: "Reference error occurred",
    },
    {
        type: CastError,
        statusCode: 400,
        message: "Cast error occurred",
    },
];

const getFunction = asyncHandler(async (req, res) => {
    //function...
}, errorOptions); //Pass error options to handle perticular errors

//All routes
app.get("/data", getFunction);

app.use(errorHandler);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
```

## License

[MIT](https://github.com/Devapatel0603/express-dynamic-middlewares/blob/main/LICENCE)

## Authors

[@Dev Patel](https://github.com/Devapatel0603)
