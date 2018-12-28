var sessionUtils = require('../utils/sessionUtils');
var util = require('util');
var databaseUtils = require('../utils/databaseUtils');

module.exports = {
    showHomePage: function* (next) {
        yield this.render('index',{

        });
    },
    logout: function* (next) {
        var sessionId = this.cookies.get("SESSION_ID");
        if(sessionId) {
            sessionUtils.deleteSession(sessionId);
        }
        this.cookies.set("SESSION_ID", '', {expires: new Date(1), path: '/'});

        this.redirect('/');
    },
    showSignUpPage:function *(next) {
        yield this.render('home',{

        });
    },
    signUp:function *(next) {

        console.log('yahaan aaya');

        var signuptype = this.request.body.fields.type;
        var msg;
        try {
            if (signuptype == 0) {
                var name = this.request.body.fields.name[0];
                var email = this.request.body.fields.email[0];
                var pwd = this.request.body.fields.pwd[0];
                console.log(name, email, pwd);
                var res = yield databaseUtils.executeQuery(util.format('insert into admintable (name,email,pwd) values("%s","%s","%s")', name, email, pwd));
            } else if (signuptype == 1) {
                var name = this.request.body.fields.name[0];
                var email = this.request.body.fields.email[0];
                var pwd = this.request.body.fields.pwd[0];
                console.log(name, email, pwd);
                var res = yield databaseUtils.executeQuery(util.format('insert into customer (name,email,pwd) values("%s","%s","%s")', name, email, pwd));
            } else if (signuptype == 2) {
                var name = this.request.body.fields.name[0];
                var email = this.request.body.fields.email[0];
                var pwd = this.request.body.fields.pwd[0];

                var name = this.request.body.fields.name[1];
                var email = this.request.body.fields.email[1];
                var pic = this.request.body.files.pic[1].path.split('\\')[3];
                var address = this.request.body.fields.address;
                var phone = this.request.body.fields.phone[0];
                var license = this.request.body.fields.license;
                var openingtime = this.request.body.fields.openingtime;
                var closingtime = this.request.body.fields.closingtime;
                var openingdays = this.request.body.fields.openingday;

                console.log(name, email, pic, address, phone, openingtime, closingtime, openingdays, license);


                var rest_id = yield databaseUtils.executeQuery(util.format('insert into restaurant(name,email,pic,address,phone,openingtime,closingtime,openingdays,license) values("%s","%s","%s","%s","%s","%s","%s","%s","%s")', name, email, pic, address, phone, openingtime, closingtime, openingdays, license));
                console.log(name, email, pwd, rest_id.insertId);
                var user_id = yield databaseUtils.executeQuery(util.format('insert into user(name,email,pwd) values("%s","%s","%s")', name, email, pwd));
                console.log( user_id.insertId);
                res = yield databaseUtils.executeQuery(util.format('insert into user_rest(user_id,rest_id) values("%s","%s")',user_id.insertId,rest_id.insertId));


            } else if (signuptype == 3) {
                var name = this.request.body.fields.name[2];
                var pwd = this.request.body.fields.pwd[1];
                var phone = this.request.body.fields.phone[1];
                var ahdaar = this.request.body.fields.adhaar;
                var pic = this.request.body.files.pic[0].path.split('\\')[3];
                console.log(name,pwd,phone,ahdaar,pic);
                var res = yield databaseUtils.executeQuery(util.format('insert into rider(name,pwd,phone,adhaar,pic) values("%s","%s","%s","%s","%s")',name,pwd,phone,ahdaar,pic));

            }
            msg='Login To Continue';
        }catch (e) {
            console.log(e);
        }

        if (msg){
            yield this.render('home',{
                msg:msg,
            });
        } else {
            yield this.render('home',{
                msg:'Error...!!!',
            });
        }
    },
    showLoginPage:function *(next) {
        yield this.render("login",{});
    },
    login:function *(next) {
        var email = this.request.body.email;
        var pwd= this.request.body.pwd;
        var res;
        res = yield databaseUtils.executeQuery(util.format('select * from admintable where email="%s" and pwd="%s"',email,pwd));
        if (res.length>0){
            // login admin
            var user = {
                user:res[0],
                role:'admin'
            }
            sessionUtils.saveUserInSession(user,this.cookies);
            this.redirect('/dashboard');
        } else {
            res = yield databaseUtils.executeQuery(util.format('select * from customer where email="%s" and pwd="%s"',email,pwd));
            if (res.length>0){
                // login customer
                var user = {
                    user:res[0],
                    role:'customer'
                }
                sessionUtils.saveUserInSession(user,this.cookies);
                this.redirect('/dashboard');
            } else {
                res = yield databaseUtils.executeQuery(util.format('select * from rider where phone="%s" and pwd="%s"',email,pwd));
                if (res.length>0){
                    // login rider
                    var user = {
                        user:res[0],
                        role:'rider'
                    }
                    sessionUtils.saveUserInSession(user,this.cookies);
                    this.redirect('/dashboard');
                }
                else {
                    res = yield databaseUtils.executeQuery(util.format('select * from user where email="%s" and pwd="%s"',email,pwd));
                    if (res.length>0){
                        var rest = yield databaseUtils.executeQuery(util.format('select * from user u left join user_rest ur on u.id = ur.user_id left join restaurant r on ur.rest_id=r.id where u.email="%s" and pwd="%s"',email,pwd));
                        if (rest.length>1){
                            // manage multiple restaurant
                            var user = {
                                user:res[0],
                                role:'mulrest',
                                rest:rest
                            }
                            sessionUtils.saveUserInSession(user,this.cookies);
                            this.redirect('/predashboard');
                        } else {
                            // save user in session
                            var user = {
                                user:res[0],
                                role:'restaurant',
                                rest:rest[0]
                            }
                            sessionUtils.saveUserInSession(user,this.cookies);
                            this.redirect('/dashboard');

                        }
                    } else {
                        // redirect no such email or password
                        yield this.render('login',{
                            msg:'error'
                        });
                    }
                }
            }
        }
    },
    showDashbaord:function *(next) {
        yield this.render('dashboard',{});
    }
}