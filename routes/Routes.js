var Router= require('koa-router');
var bodyParser = require('koa-body')();

module.exports = function(app){

    var router = new Router();

    //Welcome Routes
    var welcomeCtrl = require('./../controllers/WelcomeCtrl');
    router.get('/', welcomeCtrl.showHomePage);
    router.get('/signup', welcomeCtrl.showSignUpPage);
    router.post('/signup', welcomeCtrl.signUp);

    return router.middleware();
}
