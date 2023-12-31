const dbhelper = require("../configs/dbhelper");

const {
  checkLogin,
  signupUser,
} = require("../configs/queries/LoginSignup.Query");

const loginUser = async (email, pass) => {
  return dbhelper.query(checkLogin, [email, pass]).then((result) => {
    console.log(result, "in db helper");

    return result;
  });
};

const signUpUser = async (email, pass) => {
  return dbhelper.query(signupUser, [email, pass, null]).then((result) => {
    console.log(result, "in db helper");

    return result[0].p_signup_success;
  });
};
module.exports = {
  loginUser,
  signUpUser,
};
