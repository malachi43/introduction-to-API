

function errorHandler(err, req, res, next) {
    const errObj = {
        msg: err.message || `Internal Server Error`,
        errorCode: err.statusCode || 500
    }
    if (err.name === "ValidationError") {
        errObj.msg = err.details[0].message
    }
    res.status(errObj.errorCode || 500).json({ success: false, msg: errObj.msg || `Internal Server Error. Try again later.` })
}

module.exports = errorHandler