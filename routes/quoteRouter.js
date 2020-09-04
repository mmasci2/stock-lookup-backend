const router = require('express').Router();
const Axios = require('axios');

router.get('/:symbol', async (req, res) => {
    try {
        const symbol = req.params.symbol;
        const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE` +
        `&symbol=${symbol}&apikey=${process.env.AV_KEY}`;

        let stockRes = await Axios.get(url, null, null);

        if(JSON.stringify(stockRes.data['Global Quote']) === '{}'){
            return res
            .status(400)
            .json({msg: 'Stock symbol does not exist.'});
        }

        stockRes = stockRes.data['Global Quote'];

        const formattedStockData = {
            symbol: stockRes['01. symbol'],
            open: parseFloat(stockRes['02. open']).toFixed(2),
            high: parseFloat(stockRes['03. high']).toFixed(2),
            low: parseFloat(stockRes['04. low']).toFixed(2),
            price: parseFloat(stockRes['05. price']).toFixed(2),
            volume: stockRes['06. volume'],
            lastTradingDay: stockRes['07. latest trading day'],
            prevClose: parseFloat(stockRes['08. previous close']).toFixed(2),
            change: parseFloat(stockRes['09. change']).toFixed(2),
            chgPercent: parseFloat(stockRes['10. change percent']).toFixed(2)
        };

        res.json({stock: formattedStockData});

    } catch (e) {
        res.status(500).json({msg: e.message});
    }
});

module.exports = router;