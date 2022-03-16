const db = require('../dbconnection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.home = (req, res) => {
  res.send('Api Working....');
};

// signup
module.exports.signup = (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  // check if email id exists
  let emailCheckQuery = `SELECT email FROM users WHERE email = '${email}' `;

  db.query(emailCheckQuery, async (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      res.send({
        status: false,
        msg: 'Email ID already exists',
      });
    } else {
      // decrypt password
      decryptPwd = await bcrypt.hash(password, 10);

      // insert user data to database
      let insertQuery = `INSERT INTO users(name, email, password) VALUES('${name}', '${email}', '${decryptPwd}')`;
      db.query(insertQuery, (err, result) => {
        if (err) throw err;
        res.send({
          status: true,
          msg: 'User Registered Successfully',
        });
      });
    }
  });
};

// login
module.exports.login = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  // check email id if exists
  let checkEmailQuery = `SELECT * FROM USERS WHERE email = '${email}'`;

  db.query(checkEmailQuery, async (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      let data = {
        name: result[0].name,
        email: result[0].email,
      };
      // compare password to hash
      let checkPWD = await bcrypt.compare(password, result[0].password);
      if (checkPWD === true) {
        let token = jwt.sign(
          {
            data,
          },
          'privatekey'
        );
        res.send({
          status: true,
          token: token,
          result: data,
          msg: 'LogIn Was Successful.',
        });
      } else {
        res.send({
          status: false,
          msg: 'Invalid User, Check Credentials and Retry.',
        });
      }
    } else {
      res.send({
        status: false,
        masg: 'Invalid Email ID',
      });
    }
  });
};

// tutorial
module.exports.tutorial = (req, res) => {
  
  // verify token
  let checkToken = verifyToken(req.token);

  if (checkToken.status === true) {
    let tutorialQuery = `SELECT * FROM tutorial`;
    db.query(tutorialQuery, (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        res.send({
          status: true,
          data: result,
        });
      } else {
        res.send({
          status: false,
          msg: 'No Entries Found.',
        });
      }
    });
  } else {
    res.send({
      status: false,
      msg: 'Invalid Token',
    });
  }
};

// verify token
function verifyToken(token) {
  return jwt.verify(token, 'privatekey', (err, result) => {
    if (err) {
      let response = { status: false };

      return response;
    } else {
      let response = { status: true };
      return response;
    }
  });
}
