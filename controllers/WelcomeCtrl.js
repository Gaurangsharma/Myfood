var sessionUtils = require('../utils/sessionUtils');
var util = require('util');
var databaseUtils = require('../utils/databaseUtils');

module.exports = {
    showHomePage: function* (next) {
        yield this.render('home',{

        });
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
                var name = this.request.body.fields.name;
                var email = this.request.body.fields.email;
                var pwd = this.request.body.fields.pwd;
                console.log(name, email, pwd);
                var res = yield databaseUtils.executeQuery(util.format('insert into admintable (name,email,pwd) values("%s","%s","%s")', name, email, pwd));
            } else if (signuptype == 1) {
                var name = this.request.body.fields.name;
                var email = this.request.body.fields.email;
                var pwd = this.request.body.fields.pwd;
                console.log(name, email, pwd);
                var res = yield databaseUtils.executeQuery(util.format('insert into customer (name,email,pwd) values("%s","%s","%s")', name, email, pwd));
            } else if (signuptype == 2) {
                var name = this.request.body.fields.name[0];
                var email = this.request.body.fields.email[0];
                var pwd = this.request.body.fields.pwd;

                var name = this.request.body.fields.name[1];
                var email = this.request.body.fields.email[1];
                var pic = this.request.body.files.pic[1].path.split('\\')[3];
                var address = this.request.body.fields.address;
                var phone = this.request.body.fields.phone;
                var license = this.request.body.fields.license;
                var openingtime = this.request.body.fields.openingtime;
                var closingtime = this.request.body.fields.closingtime;
                var openingdays = this.request.body.fields.openingday;

                console.log(name, email, pic, address, phone, openingtime, closingtime, openingdays, license);


                var res = yield databaseUtils.executeQuery(util.format('insert into restaurant(name,email,pic,address,phone,openingtime,closingtime,openingdays,license) values("%s","%s","%s","%s","%s","%s","%s","%s","%s")', name, email, pic, address, phone, openingtime, closingtime, openingdays, license));
                console.log(name, email, pwd, res.insertId);
                res = yield databaseUtils.executeQuery(util.format('insert into user(name,email,pwd,rid) values("%s","%s","%s","%s")', name, email, pwd, res.insertId));

            } else if (signuptype == 3) {
                var name = this.request.body.fields.name;
                var pwd = this.request.body.fields.pwd;
                var phone = this.request.body.fields.phone;
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
    }

    
}