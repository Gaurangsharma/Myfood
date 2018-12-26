var sessionUtils = require('../utils/sessionUtils');

module.exports = {
    showHomePage: function* (next) {
        yield this.render('home',{

        });
    },
    
}