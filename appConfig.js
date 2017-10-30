module.exports = {
  Components: {
    Dashboard: {
      Routes: 'Add comments here'
    }
    // Auth: {
    //   Schema: 'authentication user schema',
    //   Services: 'authenticatedRoute and decodeToken',
    //   Routes: {
    //     '/auth': [
    //       'POST /register - new user registration',
    //       'POST /login - user login',
    //       'GET /logout - user logout'
    //     ]
    //   }
    // },
    // User: {
    //   Schema: 'base user schema',
    //   Routes: {
    //     '/user': [
    //       "GET /all - returns all user's",
    //       'GET /one - returns a user by query params'
    //     ]
    //   }
    // }
  },
  // App Configuration
  Config: {
    Name: process.env.NAME || 'admin',
    Host: process.env.HOST || 'http://localhost',
    Port: process.env.PORT || '8989'
    // DatabaseName: process.env.DBNAME || 'Apier Dev DB',
    // DatabaseURI: process.env.DB_URI || 'mongodb://localhost/apier-dev',
    // JWTSecret: process.env.JWT_SECRET || 'K}QwjdOl6ca%D)7!aZ|ck!Irl7AYRKhE',
    // BcryptCost: process.env.BCRYPT_COST || 11
  }
};
