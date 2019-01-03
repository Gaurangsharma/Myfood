var sessionUtils = require('../utils/sessionUtils');
var util = require('util');
var databaseUtils = require('../utils/databaseUtils');
var Distance = require('geo-distance');
var rn = require('random-number');

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
        var restid = yield databaseUtils.executeQuery(util.format('select restid as id from items i,type t where t.itemid=i.id and t.id="%s"',kart[0].itemid));
        console.log(kart,restid);

        yield this.render('checkout',{
            kart:kart,
            restid:restid[0].id
        });
    },
    checkout2:function *(next) {
        var data = this.request.body;
        console.log(data);
        var cid = this.currentUser.user.id;
        var delivery = this.request.body.delivery;
        var phone = this.request.body.phone;
        var address = this.request.body.address;
        var lat = this.request.body.lat;
        var lon = this.request.body.lon;
        var payment = this.request.body.payment;
        var numberofitems = this.request.body.numberofitems;
        var dcost = this.request.body.dcost;
        var promocodeid = this.request.body.promocodeid;
        var tcost = this.request.body.tcost;
        var restid = this.request.body.restid;
        var otpid;
        var status=0;
        if (payment==3) status=1;
        if (payment == 3 && delivery == 2){
            this.redirect('/dashboard');
        }
        if (payment==3){
            options = {
                min:100000,
                max:999999,
                integer:true
            }
            var newotp = rn(options);

            var res = yield databaseUtils.executeQuery(util.format('insert into otp(code) values("%s")',newotp));
            otpid = res.insertId;
        } else {
            otpid=1;
        }


        var order = yield databaseUtils.executeQuery(util.format('insert into myorder(customerid,restid,location,promocodeid,deliverytype,status,amount,paymentmode,lat,lon,dcharge,otpid) values("%s","%s","%s","%s","%s","%s","%s","%s","%s","%s","%s","%s")\
        ',cid,restid,address,promocodeid,delivery,status,tcost,payment,lat,lon,dcost,otpid));

        var orderid = order.insertId;
        for(var i=0;i<numberofitems;++i){
            var itemid = this.request.body['itemid'+i];
            var qty = this.request.body['qty'+i];
            var res = yield databaseUtils.executeQuery(util.format('insert into ordermetadata(orderid,itemid,cost,qty) \ ' +
                ' select "%s",t.id,t.price*"%s","%s" from type t where t.id="%s"',orderid,qty,qty,itemid));
        }
        if (payment==3){
            this.redirect('/myorders');
        } else {
            yield this.render('paytm',{
                orderid:orderid,
                amount:tcost
            });
        }

    },
    getpromocodedetails: function *(next) {
        var codename = this.request.body.codename;
        var res = yield databaseUtils.executeQuery(util.format('select * from promocode where name="%s" and active=1',codename));
        if (res.length==0){
            this.body = {flag:false}
        } else {
            this.body = {flag:true,discount:res[0].discount,promocdeid:res[0].id}
        }
    },
    getdeliverycharge: function *(next) {
        var lat = this.request.body.lat;
        var lon = this.request.body.lon;
        var restid = this.request.body.restid;
        var res = yield databaseUtils.executeQuery(util.format('select lat,lon from restaurant where id="%s"',restid));
        if (res.length>0){
            var src={
                lat:lat,
                lon:lon
            }
            var dest={
                lat:res[0].lat,
                lon:res[0].lon
            }
            console.log(src,dest);
            var distance = Distance.between(src,dest).human_readable();
            var multiplier;
            if (distance.unit == 'km') multiplier = 5;
            else multiplier = 0.1;
            console.log(distance);
            this.body={flag:true,val:(distance.distance*multiplier)}
        } else {
            this.body={flag:false}
        }
    },
    showOrderPage : function *(next) {
        if (this.currentUser.role == 'admin' || this.currentUser.role == 'rider'){
            var res = yield databaseUtils.executeQuery(util.format('select myorder.*,rider.name as rname,rider.phone as rphone,rider.id as rid,code from myorder left join riderorder on myorder.id=riderorder.orderid left join rider on riderorder.riderid=rider.id left join otp on myorder.otpid=otp.id order by myorder.status'));
            console.log(res);
            var rider = yield databaseUtils.executeQuery(util.format('select * from rider'));

            yield this.render('order', {
                order: res,
                rider:rider,
            });
        } else if (this.currentUser.role == 'customer') {
            var res = yield databaseUtils.executeQuery(util.format('select m.*,o.code,rider.phone as rphone from myorder m left join otp o on m.otpid=o.id left join riderorder on m.id=riderorder.orderid left join rider on riderorder.riderid=rider.id where customerid="%s" order by status', this.currentUser.user.id));
            yield this.render('order', {
                order: res,
            });
        } else{
            var res = yield databaseUtils.executeQuery(util.format('select * from myorder where restid="%s" order by status', this.currentUser.rest.id));
            yield this.render('order', {
                order: res,
            });
        }
    }

}
