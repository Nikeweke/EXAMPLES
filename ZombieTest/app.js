var Browser = require('zombie');

b = new Browser();


b.visit('http://foodcontrol.club/signin', function() {
        b.
          fill('email', 'Driver3@meta.ua').
          fill('pwd', '12').
          pressButton('.btn.btn-primary', function() {
                console.log(b.html());
          });
});
