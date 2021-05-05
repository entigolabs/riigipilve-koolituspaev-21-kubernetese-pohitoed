const express = require("express");

const session = require('express-session');
const redis = require('redis');
const connectRedis = require('connect-redis');
var bodyParser = require('body-parser');

const PORT = process.env.PORT || 3001;

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('trust proxy', 1);
const RedisStore = connectRedis(session)

const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: 6379
})


redisClient.on('error', function (err) {
    console.log('Could not establish a connection with redis. ' + err);
    process.exit(1)
});
redisClient.on('connect', function (err) {
    console.log('Connected to redis successfully');
});

app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // if true only transmit cookie over https
        httpOnly: false, // if true prevent client side JS from reading the cookie 
        maxAge: 1000 * 60 * 60 // session max age in miliseconds
    }
}))

app.get("/api", (req, res) => {
  const sess = req.session;
  if ( typeof sess.counter !== 'undefined' && sess.counter ) {
    sess.counter = sess.counter + 1
  } else {
    sess.counter = 1
  }
  console.log(`Serving /api call from ${process.env.POD_NAME}, this client has visited us ${sess.counter} times!`);
  res.json({ message: `Hello from ${process.env.POD_NAME}! You have visited us ${sess.counter} times!` });
});


app.get("/api/reset", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return console.log(err);
        }
        res.json({ message: "Counter is reset now!" });
    });
});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
