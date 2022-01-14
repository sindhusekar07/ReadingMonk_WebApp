const jwt = require("jsonwebtoken");
exports.createJWT = (email, userId, duration) => {
   const payload = {
      email,
      userId,
      duration
   };
   return jwt.sign(payload, process.env.TOKEN_SECRET, {
     expiresIn: duration,
   });
};

exports.validateAuth = (req, res, output) => {
   var token = req.headers['x-access-token'];
   if (!token) {
      output['auth'] = false;
      output['message'] = 'No token provided.';
      return;
   }

   jwt.verify(token, process.env.TOKEN_SECRET, (err,
                                                decoded) => {
      if (err) {
         output['auth'] = false;
         output['message'] = err;
      } else {
         req.decoded = decoded;
         output['auth'] = true;
         output['message'] = 'success';
      }
   });
}