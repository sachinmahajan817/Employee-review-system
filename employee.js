const User = require("../models/user");

//Employee Controller
const ctrl = {

    //Get Employee Page
    getData: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.user.email });
            const myReview = user.myReviews;
            const toReview = user.toReview;
            res.render('index', { 'myReview': myReview, 'toReview': toReview, 'email': req.user.email, 'name': req.user.name });
        } catch (err) {
            console.log(err);
        }

    }
}

module.exports = ctrl;