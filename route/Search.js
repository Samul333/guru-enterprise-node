const Profile = require('../model/Profile');
const auth = require('../middleware/auth');
const SearchController = require('../handler/SearchController');
const route = require('express').Router() 


route.post('/',SearchController.search)


module.exports = route;