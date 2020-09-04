const router = require('express').Router();
const auth = require('../middleware/auth');
const Watchlist = require('../models/watchlistModel');


router.post('/', auth, async (req, res) => {
    try {

        let {name} = req.body;
        name = name.trim();

        if(!name || name.length === 0)
            return res
            .status(400)
            .json({msg: 'Not all fields have been entered.'});

        const newWatchlist = new Watchlist({
            name,
            userId: req.user
        });
            
        const savedWatchlist = await newWatchlist.save();
        res.json(savedWatchlist);

    } catch (e) {
        res.status(500).json({msg: e.message});
    }
});

router.get('/all', auth, async (req, res) => {

    try {

        const watchlists = await Watchlist.find({userId: req.user});
        res.json(watchlists);

    } catch {
        res.status(500).json({msg: e.message});
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {

        const watchlist = await Watchlist.findOne({userId: req.user, _id: req.params.id});
        if(!watchlist)
            return res
            .status(400)
            .json({msg: 'No watchlist found that belongs to the current user'});

        const deletedWatchlist = await Watchlist.findByIdAndDelete(req.params.id);
        res.json(deletedWatchlist);


    } catch (e) {
        res.status(500).json({msg: e.message});
    }
});

router.post('/addSymbol/:id', auth, async (req, res) => {

    try {
        let {symbol} = req.body;
        symbol = symbol.trim();
        symbol = symbol.toUpperCase();
        const watchlist = await Watchlist.findOne({userId: req.user, _id: req.params.id});
        
        if(!watchlist) {
            return res
            .status(400)
            .json({msg: 'No watchlist found that belongs to the current user'});
        }
        
        updatedWatchlist = await Watchlist.findByIdAndUpdate(
            {_id: req.params.id},
            {$push: {symbols: symbol}},
            {new: true}
        );

        res.json(updatedWatchlist);

    } catch (e) {
        res.status(500).json({msg: e.message});
    }
    
});

router.post('/removeSymbol/:id', auth, async (req, res) => {

    try {
        const {symbol} = req.body;
        const watchlist = await Watchlist.findOne({userId: req.user, _id: req.params.id});
        
        if(!watchlist) {
            return res
            .status(400)
            .json({msg: 'No watchlist found that belongs to the current user'});
        }
        
        updatedWatchlist = await Watchlist.findByIdAndUpdate(
            {_id: req.params.id},
            {$pull: {symbols: symbol}},
            {new: true}
        );

        res.json(updatedWatchlist);

    } catch (e) {
        res.status(500).json({msg: e.message});
    }
    
});


module.exports = router;