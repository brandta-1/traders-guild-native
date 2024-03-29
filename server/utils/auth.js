const jwt = require('jsonwebtoken');

const secret = 'testSecret';
const expiration = '2h';

module.exports = {

    authMiddleware: function ({ req }) {
      let token = req.headers.authorization;
      if (req.headers.authorization) {
        token = token.split(' ').pop().trim();
      }
  
      if (!token) {
        return req;
      }
  
      try {
        const { data } = jwt.verify(token, secret, { maxAge: expiration });
        req.user = data;
      } catch (error){
        console.error(error);
        console.log('Invalid token');
      }
  
      return req;
    },
    signToken: function ({ username, _id }) {
      const payload = { username, _id };
  
      return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },
  };