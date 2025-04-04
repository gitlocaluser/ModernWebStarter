const isAuthenticated = (req, res, next) => {
    // Check if user is logged in
    if (!req.user) {
        return res.redirect('/login');
    }
    next();
};

const isSubscribed = (req, res, next) => {
    // Check if user has active subscription
    if (!req.user || !req.user.subscription || req.user.subscription.status !== 'active') {
        return res.redirect('/pricing');
    }
    next();
};

module.exports = { isAuthenticated, isSubscribed };