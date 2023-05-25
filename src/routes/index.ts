import Router from 'express'

export const router = Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("<br><hr><hr><h1 style='text-align: center; color: green'>Welcome my Dudes</h1><hr><hr>");
});

