const express = require('express');
const router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// router.get('/api/csrf/restore', (req, res) => {
//   const csrfToken = req.csrfToken();
//   res.cookie('XSRF-TOKEN', csrfToken);
//   res.status(200).json({
//       'XSRF-TOKEN': csrfToken
//   });
// });

if (process.env.NODE_ENV === 'production') {
  const path = require('path');

  router.get('/', (req, res) => {
      // res.cookie('XSRF-TOKEN', req.csrfToken());
      return res.sendFile(
          path.resolve(__dirname, '../../frontend',  'index.html')
      );
  });

  router.use(express.static(path.resolve('../frontend/build')));

  router.get(/^(?!\/?api).*/, (req, res) => {
      // res.cookie('XSRF-TOKEN', req.csrfToken());
      return res.sendFile(
          path.resolve(__dirname, '../../frontend',  'index.html')
      );
  });
}

if (process.env.NODE_ENV !== 'production') {
  router.get('/api/csrf/restore', (req, res) => {
      res.cookie('XSRF-TOKEN', req.csrfToken());
      return res.json({});
  });
}

module.exports = router;
