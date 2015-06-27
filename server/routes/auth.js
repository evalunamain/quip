module.exports = function(app) {  

	

var auth = function(req, res, next){ 
    if (!req.isAuthenticated()) {
        res.send(401);
    } else {
        next();   
    } 
}; 

//SIGNUP
app.post('/api/signup', function (req, res, next) {
    passport.authenticate('local-signup', function(err, user, info) {
    if (err) {
      return next(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (!user) {
      return res.send({err: err, info: info, success : false, message : 'authentication failed' });
    }

    req.login(user, function (err, user) {
        if(err){
            return next(err);
        }
        return res.send({success : true, message : 'authentication succeeded' });
    });
  })(req, res, next);
});

//LOGIN
app.post('/api/login', function (req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
    if (err) {
      return next(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (!user) {
      return res.status(401).send({err: err, info: info, success : false, message : 'authentication failed' });
    }

    req.login(user, function (err) {
        if(err){
            return next(err);
        }

        user = user.toObject();
        delete user.local; //Don't send back credentials
        return res.send({ success : true, message : 'authentication succeeded', user: user });
    }); 

  })(req, res, next);
});

//LOGGEDIN
app.get('/api/loggedin', function(req, res) { 
    if (!req.isAuthenticated()) {
        res.status(401).send({message: "You're not logged in!"});
    } else {
        var user = req.user.toObject();
        delete user.local;
        res.send(user);
    }
     
}); 

//LOGOUT
app.get('/api/logout', function(req, res) { 
    if (!req.isAuthenticated()) {
        res.status(401).send({message: "You're not logged in!"});
    } else {
        req.logOut();
        req.session.destroy();
        res.send(200);
    }
     
}); 

};