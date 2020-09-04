const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    name: {type: String, required: true},
    symbols: {type: Array}
});

module.exports = Watchlist = mongoose.model('watchlist', watchlistSchema);