const express = require('express');
const app = express();
const { PORT, CLIENT_URL } = require('./constants');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const cors = require('cors');

// Import passport middleware
require('./middlewares/passport-middleware');

// Initialize middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(passport.initialize());

// Import routes
const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movies');

// Initialize routes
app.use('/api', authRoutes);
app.use('/api/movies', movieRoutes);

// App start
const appStart = () => {
  try {
    app.listen(PORT, () => {
      console.log(`The app is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
}

appStart();
