var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Users = require('../models/users');
var Projects = require('../models/projects');

var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/');
};

router.use(function timelog(req, res, next) {
    console.log('Time: ', Date('1995-12-17T03:24:00'));
    next();
});

module.exports = function (passport) {
    
    // GET login
    router.get('/', function(req, res) {
      res.render('index', {
          title: '1845 S Michigan Ave',
          message: req.flash('message')
      });
    });
    /* POST login */
    router.post('/login', passport.authenticate('login', {
        successRedirect: '/home',
        failureRedirect: '/',
        failureFlash: true
    }));

    /* GET signup */
    router.get('/signup', function (req, res) {
        res.render('signup', {
            message: req.flash('message')
        });
    });
    /* POST signup */
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/home',
        failureRedirect: '/signup',
        failureFlash: true
    }));
    
    /* GET home */
    router.get('/home', isAuthenticated, function (req, res) {
        res.render('angulartest', {
            title: 'Home | 1845 S Michigan Ave',
            user: req.user
        });
    });
    /* POST home */
    router.post('/home', isAuthenticated, function (req, res) {
        var newProject = new Projects();
        newProject.title = req.param('title');
        newProject.status = req.param('status');
        newProject.save(function (err) {
            if (err) return console.log(err);
            res.redirect('/home');
        });
    });
    
    /* GET profile */
    router.get('/profile', isAuthenticated, function (req, res) {
        res.render('profile', {
            title: 'Profile | 1845 S Michigan Ave',
            user: req.user
        });
    });
    /* GET profile/editfirst */
    router.get('/profile/editfirst', isAuthenticated, function (req, res) {
        res.render('profile', {
            title: 'Profile | 1845 S Michigan Ave',
            user: req.user,
            edit: 'first'
        });
    });
    /* POST profile/editfirst */
    router.post('/profile/editfirst', isAuthenticated, function (req, res) {
        var email = req.user.email;
        var newName = req.param('firstname');
        Users.update({ 'email': email }, { $set: { 'firstname': newName } }, function (err, user) {
            if (err) return console.log(err);
            res.redirect('/profile');
        });
    });
    /* GET profile/editlast */
    router.get('/profile/editlast', isAuthenticated, function (req, res) {
        res.render('profile', {
            title: 'Profile | 1845 S Michigan Ave',
            user: req.user,
            edit: 'last'
        });
    });
    /* POST profile/editlast */
    router.post('/profile/editlast', isAuthenticated, function (req, res) {
        var email = req.user.email;
        var newName = req.param('lastname');
        Users.update({ 'email': email }, { $set: { 'lastname': newName } }, function (err, user) {
            if (err) return console.log(err);
            res.redirect('/profile');
        });
    });
    /* GET profile/editpic */
    router.get('/profile/editpic', isAuthenticated, function (req, res) {
        res.render('profile', {
            title: 'Profile | 1845 S Michigan Ave',
            user: req.user,
            edit: 'pic'
        });
    });
    /* POST profile/editpic */
    router.post('/profile/editpic', isAuthenticated, function (req, res) {
        var email = req.user.email;
        var newPic = req.param('pic');
        Users.update({ 'email': email }, { $set: { 'pic': newPic } }, function (err, user) {
            if (err) return console.log(err);
            res.redirect('/profile');
        });
    });
    
    /* GET page2 */
    router.get('/page2', isAuthenticated, function (req, res) {
        res.render('page2', {
            title: 'page2 | 1845 S Michigan Ave',
            user: req.user
        });
    });
    
    /* GET admin */
    router.get('/admin', isAuthenticated, function (req, res) {
        if (req.user.role==='admin') {
            res.render('admin', {
                title: 'Admin | 1845 S Michigan Ave',
                user: req.user
            });
        }
        res.redirect('/home');
    });
    
    /* GET logout */
    router.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
    
    // data
    // pull projects
    router.get('/projects', function (req, res) {
        Projects.find(function (err, docs) {
            if (err) return console.log(err);
            console.log('Asif: Pulled all projects from database');
            res.json(docs);
        });
    });
    // add project
    router.post('/projects', function (req, res) {
        var newProject = new Projects();
        newProject.title = req.body.title;
        newProject.status = req.body.status;
        newProject.save(function (err) {
            if (err) return console.log(err);
            console.log('Asif: Added 1 project to database');
            res.redirect('/home');
        });
    });

    return router;
    
};