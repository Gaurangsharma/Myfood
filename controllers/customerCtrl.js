var sessionUtils = require('../utils/sessionUtils');
var util = require('util');
var databaseUtils = require('../utils/databaseUtils');

module.exports = {
    showHomePage: function* (next) {
        yield this.render('home',{

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
    checkout : function *(next) {;
        var kart = this.cookies.get("kart");
        kart = JSON.parse(kart);
        console.log(kart);


        yield this.render('checkout',{
            kart:kart
        });
    },
    checkout2:function *(next) {

    },
    getpromocodedetails: function *(next) {
        var codename = this.request.body.codename;
        var res = yield databaseUtils.executeQuery(util.format('select * from promocode where name="%s"',codename));
        if (res.length==0){
            this.body = {flag:false}
        } else {
            this.body = {flag:true,discount:res[0].discount,promocdeid:res[0].id}
        }
    }

}
