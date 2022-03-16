const express = require('express');
const router = express.Router();

// contoller path
const controller = require('../controller/controller');

router.get('/home', requiredToken, controller.home);

// signup route
router.post('/signup', controller.signup);

// login route
router.post('/login', controller.login);

// courses route
router.get('/tutorial', requiredToken, controller.tutorial);

// requiretoken
function requiredToken(req, res, next) {
  let headers = req.headers['token'];

  if (typeof headers !== undefined && headers !== '') {
    req.token = headers;
    next();
  } else {
    res.send({
      status: false,
      msg: 'Token Required',
    });
  }
}

module.exports = router;
