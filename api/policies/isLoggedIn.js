module.exports = async function (req, res, proceed) {

    if (req.user) {
        return proceed();
    }
    return res.redirect('/login');
}