const mongoose = require('mongoose');
const db = mongoose.connection;

mongoose.connect('mongodb://localhost:27017/poker-db', { 
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to database!');
});
