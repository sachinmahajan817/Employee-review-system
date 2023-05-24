
const User = require("../models/user");
//review controller
const ctrl = {

    //Get review page
    getData: (req, res) => {
        const email = req.query.email;

        res.render('review', { 'email': email });
    },

    //Post Review 
    postData: async (req, res) => {
        try {
            const email = req.query.email;
            const review = req.body.review;
            const user = await User.findOne({ email: email });
            const reviews = user.myReviews;
            reviews.push({
                from: req.user.email,
                reviews: review
            })
            user.myReviews = reviews;
            user.save();
            const deleteUser = await User.update({ email: req.user.email },
                { $pull: { "toReview": { "to": email } } });
            if (req.user.role == true) {
                res.redirect('/admin');
            } else {
                res.redirect('/employee');
            }
        } catch (err) {
            console.log(err);
        }


    }
}

module.exports = ctrl;