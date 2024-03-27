
function notFound(req, res, next) {
    res.status(404).send(`<h2><i>PAGE NOT FOUND</i></h2>`)
}

module.exports = notFound