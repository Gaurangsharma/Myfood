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
    addnewitem :function *(next) {
        console.log(this.request.body.files.itempic.path);

        var itemname = this.request.body.fields.itemname;
        var itempic = this.request.body.files.itempic.path.split('\\')[3];
        var desc = this.request.body.fields.desc;
        var restid = this.currentUser.rest.id;
        try{
        var res = yield databaseUtils.executeQuery(util.format('insert into items(restid,itemname,description,image) values("%s","%s","%s","%s")',restid,itemname,desc,itempic));

        var numberofitems = this.request.body.fields.numberofitems;
        for(var i=1;i<=numberofitems;++i){
            var subitemname = this.request.body.fields['subitemname'+i];
            var subitemdesc = this.request.body.fields['subitemdesc'+i];
            var subitemprice = this.request.body.fields['subitemprice'+i];
            var subitemdisc = this.request.body.fields['subitemdisc'+i];
            var res2 = yield databaseUtils.executeQuery(util.format('insert into type(subname,description,price,discount,rating,itemid) values("%s","%s","%s","%s",0.0,"%s")',subitemname,subitemdesc,subitemprice,subitemdisc,res.insertId));
        }
        }catch (e) {
            console.log(e);
        }

        this.redirect('/dashboard');
    }
}
