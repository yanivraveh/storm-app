var express = require('express');
var stormpath = require('express-stormpath');

var app = express();



//trying to get port
app.set('port', (process.env.PORT || 5000));

app.set('views', './views');
app.set('view engine', 'jade');


var stormpathMiddleware = stormpath.init(app, {
  apiKeyFile: 'apiKey-3C1XCR5DD3YKXK0UPKRJPK4ZV.properties',
  application: 'https://api.stormpath.com/v1/applications/7ST6geHE2SaiVYYYVKRn4s',
  secretKey: 'FGHhsdjdfgh345#$%$&sdjdsnvjd#$^&%^SGdfgDFG',
  expandCustomData: true,
  enableForgotPassword: true
});


app.use(stormpathMiddleware);

app.get('/', function(req, res) {
  res.render('home', {
    title: 'Welcome'
  });
});

app.use('/profile',stormpath.loginRequired,require('./profile')());


//app.listen(3000);
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
