module.exports.signup_get = (req, res) => {
    res.render('signup');
}

module.exports.login_get = (req, res) => {
    res.render('login');
}

module.exports.signup_post = async (req, res) => {
    const {email, password} = req.body;
    console.log(email, password);
    res.send('new user create');
}

module.exports.login_post = async (req, res) => {
    const {email, password} = req.body;
    res.send('logined');
}
