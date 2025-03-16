const mongoose = require('mongoose');

module.exports = mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDb Connected'))
.catch((e) => console.log(e))