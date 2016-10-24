/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/
  'get /': 'LoginController.ShowLogin',
  // '/': {
  //   view: 'auth/signUp.ejs'
  // },

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/
  // get methods

  'get /twilio': 'TwilioclientController.createToken',

  'get /home': 'AuthController.createToken',
  
  'get /users': 'UserController.List',
  
  'get /users/delete/:id': 'UserController.destroy',

  'get /users/edit/:id': 'UserController.edit',

  'get /browsercall/:client_name': 'BrowserCallController.createToken',

  'get /avail': 'AvailableNumberController.availNum',

  'get /login': 'LoginController.ShowLogin',

  'get /contectNumbers': 'numberController.getContectNumber',

  'get /buyNumber/:number': 'numberController.getbuyNumber',
  
  'get /allocateNumberToUSer/number/:id': 'numberController.getallocateNumberToUSer',

  'get /numbers/delete/:number': 'numberController.releaseNumber',
  
  'get /numbers/music/:number': 'numberController.musicNumber',

  'post /update_music/:number/:id': 'numberController.musicNumber',

  'get /allocateTime/:id': 'UserTimeAllocController.AllocateTime',

  'get /numberslist': 'numberController.numberslist',

  'get /allocateTime/number/:id': 'numberController.AllocateTime',

  'get /dashboard': 'AuthController.dashboard',

  'get /forgotPassword': 'AuthController.getForgotPassword',

  'get /resetPassword/:token': 'AuthController.getResetPassword',

  'get /user/changePassword/:id':  'UserController.getChangePassword',

  'get /Signup': 'LoginController.getSignup',

  'get /activate/:token': 'AuthController.activateUser',

  // Post methods

  'post /login': 'LoginController.Authentication',
  
  'post /create_user': 'UserController.createUser',
  
  'post /update_user/:id': 'UserController.edit',
  
  'post /UserTimeAllocate/AllocateTime/:id': 'UserTimeAllocController.AllocateTime',

  'post /contectNumbers': 'numberController.postContectNumber',

  'post /postbuyNumber': 'numberController.postbuyNumber',

  'post /allocateNumberToUSer': 'numberController.postallocateNumberToUSer',

  'post /allocateTime/number/:id': 'numberController.AllocateTime',

  'post /resetPassword/:token': 'AuthController.resetPassword',

  'post /user/changePassword/:id':  'UserController.postChangePassword',

  'post /Signup': 'LoginController.postSignup',

  'post /forgotPassword': 'AuthController.postForgotPassword',

  // Ajax methos

  'post /postAreaCode': 'numberController.postAreaCode',

  'get /logout': 'AuthController.logout',

  'get /calls': 'CalllogController.call_list',

};

