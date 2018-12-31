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
    listrestaurants : function *(next) {
        var res = yield databaseUtils.executeQuery(util.format('select * from restaurant'));
        yield this.render('listrestaurant',{
            restaurants:res
        });
    },
    showRestaurant:function *(next) {
        var rid = this.params.rid;
        var res = yield databaseUtils.executeQuery(util.format('select r.*,u.name as uname,u.email as uemail from restaurant r left join user u on r.id=u.rest_id where r.id="%s"',rid));
        console.log(res);


        yield this.render('adminrestaurant',{
            restaurant:res[0]
        });
    },
    showItems : function *(next) {
        var rid = this.params.iid;
        var query = 'select t.*,i.*,r.name as rname,r.id as rid from type t,items i,restaurant r where t.itemid=i.id and i.restid=r.id and r.id="%s"';
        var res = yield databaseUtils.executeQuery(util.format(query, rid));
        console.log(res);
        if (this.currentUser.role == 'customer') {
            yield this.render('customeritems', {
                items: res
            });
        } else {


            yield this.render('items', {
                items: res
            });
        }
    }
}
