const dotenv = require('dotenv')
dotenv.config()
// console.log(process.env.RIOT_API_KEY)
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const csurf = require('csurf');

const { environment } = require('./config');
const isProduction = environment === 'production';

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const riotRouter = require('./routes/riotApi');
// const eagerRankings = require('./routes/test')
const app = express();

app.enable('trust proxy')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(helmet.crossOriginResourcePolicy({
  policy: 'cross-origin'
}));
// app.use(
//   csurf({
//     cookie: {
//       secure: isProduction,
//       sameSite: isProduction && "Lax",
//       httpOnly: true
//     }
//   })
// );
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(function (req, res, next) {
//   if (process.env.NODE_ENV !== 'development' && !req.secure) {
//     return res.redirect('https://' + req.headers.host + req.url)
//   }

//   next();
// })

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/riot', riotRouter);

const { Op, where } = require('sequelize');
const { Summoner, NormalRanking, Ranking, DoubleUpRanking, HyperRollRanking, Participant, Match, MatchParticipants, SummonerMatches, sequelize, Trait, Unit, ParticipantTrait, ParticipantUnit } = require('./db/models');

// async function eagerRankings() {
//   const summoner = await Summoner.findOne({
//     where: {
//       id: 'waters0lid'
//     },
//     include: [
//       {
//         model: Ranking,
//         include: [
//           {
//             model: NormalRanking
//           },
//           {
//             model: DoubleUpRanking
//           },
//           {
//             model: HyperRollRanking
//           }
//         ]
//       },
//       {
//         model: Match,
//         through: {
//           attributes: []
//         },
//         include: [
//           {
//             model: MatchParticipants,
//             // through: {
//               attributes: ['id'],
//             // },
//             include: [
//               {
//                 model: Participant,
//                 include:[
//                   {
//                     model: Trait,
//                     through: {
//                       attributes: []
//                     }
//                   },
//                   {
//                     model: Unit,
//                     through: {
//                       attributes: []
//                     }
//                   }
//                 ]
//               }
//               ]
//           }
//         ]
//       }
//     ]
//   })
//   let obj = await summoner.toJSON()
//   console.log("thing: ", await obj)
//   // return await summoner
// }
// eagerRankings()

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
