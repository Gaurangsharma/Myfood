var Router= require('koa-router');
var bodyParser = require('koa-body')();

module.exports = function(app){

    var router = new Router();

    //Welcome Routes
    var welcomeCtrl = require('./../controllers/WelcomeCtrl');
    router.get('/', welcomeCtrl.showHomePage);
    router.get('/signup', welcomeCtrl.showSignUpPage);
    router.get('/login', welcomeCtrl.showLoginPage);
    router.get('/dashboard', welcomeCtrl.showDashbaord);
    router.get('/logout', welcomeCtrl.logout);



    router.post('/signup', welcomeCtrl.signUp);
    router.post('/login', welcomeCtrl.login);

    return router.middleware();
}
