const User = require('../models/user');
//Register controller
const registerCtrl = {

    //Get register page
    getData: (req, res) => {
        res.render('register')
    },

    //Post data to database
    postData: async (req, res) => {
        try {
            const data = await User.create(req.body);

            res.redirect('login');
        } catch (err) {
            console.log(err);
        }
    }

}

module.exports = registerCtrl;