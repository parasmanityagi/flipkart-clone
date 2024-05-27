const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { v4 } = require('uuid');

const Connection = require('./database/db');
const DefaultData = require('./default');
const router = require('./routes/route');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const uuid = v4;

// Apply middleware
app.use(cors()); // Enable all CORS requests, configure more strictly for production
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Setup routes
app.use('/', router);


const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
const URL = process.env.DB_URL || `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.hwlyqmj.mongodb.net/flipkartclone`;
Connection(URL);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
}

app.listen(PORT, () => {
    console.log(`Server is running successfully on port number ${PORT}`);
});
DefaultData();



let paytmMerchantKey = process.env.PAYTM_MERCHANT_KEY;
let paytmParams = {};
paytmParams['MID'] = process.env.PAYTM_MID;
paytmParams['WEBSITE'] = process.env.PAYTM_WEBSITE;
paytmParams['CHANNEL_ID'] = process.env.PAYTM_CHANNEL_ID;
paytmParams['INDUSTRY_TYPE_ID'] = process.env.PAYTM_INDUSTRY_TYPE_ID;
paytmParams['ORDER_ID'] = uuid();
paytmParams['CUST_ID'] = process.env.PAYTM_CUST_ID;
paytmParams['TXN_AMOUNT'] = '100';
paytmParams['CALLBACK_URL'] = '/callback';
paytmParams['EMAIL'] = 'test.website@gmail.com';
paytmParams['MOBILE_NO'] = '12345678899';


// Check if any required environment variable is undefined
for (let key in paytmParams) {
    if (paytmParams[key] === undefined) {
        throw new Error(`Environment variable ${key} is not set`);
    }
}


module.exports = { paytmMerchantKey, paytmParams }