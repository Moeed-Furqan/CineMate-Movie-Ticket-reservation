const checkLogin = `SELECT EXISTS (
    SELECT 1
    FROM web_user
    WHERE Email_ID = $1
        and password = $2
);`;

const signupUser = `CALL signup_user($1, $2, $3);`;

module.exports = {
  checkLogin,
  signupUser,
};
