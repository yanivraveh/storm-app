var express = require('express');
var stormpath = require('express-stormpath');
var path = require('path');
var app = express();


//get port
app.set('port', (process.env.PORT || 5000));

app.set('trust proxy',true);
//app.enable('trust proxy'); the same as above

//app.set('images', './images');

app.set('views', './views');
app.set('view engine', 'jade');


var stormpathMiddleware = stormpath.init(app, {
  //apiKeyFile: 'apiKey-3C1XCR5DD3YKXK0UPKRJPK4ZV.properties',
  enableGoogle: true,
  website: true,

  social: {
    google: {

      clientId: '378165731416-r6263m0dta0h5nccdtg8k95a59h75f6a.apps.googleusercontent.com',
      clientSecret: '9wPjfbx7vxHRZOvIqQ5DjZlP',
    },
  },

  web: {
    login: {
      view: path.join(__dirname,'views','login.jade') // My custom login view
    },
    register: {
      view: path.join(__dirname,'views','register.jade'), //
      fields: {
        givenName: {
          placeholder: "שם פרטי"
        },
        username: {
          placeholder: "שם משתמש"
        },
        middleName: {
          placeholder: "שם אמצעי"
        },
        surname: {
          placeholder: "שם משפחה"
        },
        email: {
          placeholder: "אימייל"
        },
        password: {
          placeholder: "סיסמא"
        },
        passwordConfirm: {
          placeholder: "וידוא סיסמא"
        }
      }
    },
    forgotPassword: {
      view: path.join(__dirname,'views','forgot-password.jade') //
    },
    changePassword: {
      view: path.join(__dirname,'views','change-password.jade') //
    },
/*    verificationComplete: {
      view: path.join(__dirname,'views','verification_complete.jade') //
    },
    verificationEmailSent: {
      view: path.join(__dirname,'views','verification_email_sent.jade') //
    },
    verificationFailed: {
      view: path.join(__dirname,'views','verification_failed.jade') //
    },*/
    verifyEmail: {
      view: path.join(__dirname,'views','verify.jade') //
    }


  },

//  secretKey: 'FGHhsdjdfgh345#$%$&sdjdsnvjd#$^&%^SGdfgDFG',
  //expandCustomData: true,
  expand: {
    customData: true,
  },
  enableForgotPassword: true,

  client: {
    apiKey: {
      id: '3C1XCR5DD3YKXK0UPKRJPK4ZV',
      secret: '8bXqQlMr6/i86YtNMO1zgwtzayiAGDGjrd2BJ+RnkAg'
    }
  },
  //application: 'https://api.stormpath.com/v1/applications/7ST6geHE2SaiVYYYVKRn4s',
  application: {
    href: 'https://api.stormpath.com/v1/applications/7ST6geHE2SaiVYYYVKRn4s'
  }


});


app.use(stormpathMiddleware);
app.use('/images/', express.static(__dirname + '/images/'));
app.use('/css/', express.static(__dirname + '/css/'));
app.use('/js/', express.static(__dirname + '/js/'));
app.use('/img/', express.static(__dirname + '/img/'));
app.use('/fonts/', express.static(__dirname + '/fonts/'));

app.get('/', function(req, res) {
  res.render('home', {
    title: 'מערכת א.מ.ל.'
  });
});

app.use('/profile',stormpath.loginRequired,require('./profile')());


//app.listen(3000);
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
