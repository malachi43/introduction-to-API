

//NOTE: all anonymous callback passed to this function(asyncWrapper) must be async, else an error is triggered.
function asyncWrapper(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(next)
    }
}

module.exports = asyncWrapper