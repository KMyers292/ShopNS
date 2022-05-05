//===================================================================================================================================================================//
//                                                         Error Middleware Functions                                                                                //
//===================================================================================================================================================================//

// Middleware function that throws a 404 status code and new error.
export const notFound = (req, res, next) => {

    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

//===================================================================================================================================================================//

// Middleware that handles errors passed from the 'asyncHandler' middleware during async routes.
// Will console.log the stack trace if environment is in production mode.
export const errorHandler = (err, req, res, next) => {

    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};