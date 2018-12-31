var Router= require('koa-router');
var bodyParser = require('koa-body')();

module.exports = function(app){

    var router = new Router();

    //Welcome Routes
    var welcomeCtrl = require('./../controllers/WelcomeCtrl');
    var adminCtrl = require('./../controllers/adminCtrl');
    var restaurantCtrl = require('./../controllers/restaurantCtrl');
    var riderCtrl = require('./../controllers/riderCtrl');
    var customerCtrl = require('./../controllers/customerCtrl');


    router.get('/', welcomeCtrl.showHomePage);
    router.get('/signup', welcomeCtrl.showSignUpPage);
    router.get('/login', welcomeCtrl.showLoginPage);
    router.get('/dashboard', welcomeCtrl.showDashbaord);
    router.get('/logout', welcomeCtrl.logout);
    router.get('/listrestaurants',adminCtrl.listrestaurants);


    router.post('/signup', welcomeCtrl.signUp);
    router.post('/login', welcomeCtrl.login);
    router.post('/openpayment',customerCtrl.checkout2);

    router.get('/restaurant/:rid',adminCtrl.showRestaurant);
    router.get('/items/:iid',adminCtrl.showItems);
    router.get('/checkout',customerCtrl.checkout);



    return router.middleware();
}
