// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'        : '1411025008986071', // your App ID
        'clientSecret'    : '1f4ca627e86b95bd7af96bb38e12a350', // your App Secret
        'callbackURL'     : 'http://localhost:3000/auth/facebook/callback',
        'profileFields'   : ['emails']
    },

    'twitterAuth' : {
        'consumerKey'        : 'q7oiDtFuovUW7bYuONB5erj8H',
        'consumerSecret'     : 'pKlOFwc1E8737tV4aifSAN9O1UFnOxgaswZdFNDDK2rAu3LnBq',
        'callbackURL'        : 'http://localhost:3000/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'         : '542620950462-qcv465k0sc50q0phvoj2l3m5lnase691.apps.googleusercontent.com',
        'clientSecret'     : 'dy8R_gBDd9DWbMabQpC6Xpx4',
        'callbackURL'      : 'http://localhost:3000/auth/google/callback'
    }

};
