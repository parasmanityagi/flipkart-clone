
const { PaytmChecksum } = require('../paytm/PaytmChecksum');
const { paytmMerchantKey, paytmParams } = require('../server');
const formidable = require('formidable');
const https = require('https');




const addPaymentGateway = async (req, res) => {
    try {
        const paytmCheckSum = await PaytmChecksum.generateSignature(paytmParams, paytmMerchantKey);
        const params = {
            ...paytmParams,
            'CHECKSUMHASH': paytmCheckSum
        };

        res.status(200).json(params);
    } catch (error) {
        console.error(`Error generating Paytm checksum: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};


const paytmResponse = (req, response) => {
    const form = new formidable.IncomingForm();
    let paytmCheckSum = req.body.CHECKSUMHASH;
    delete req.body.CHECKSUMHASH;

    let isVerifySignature = PaytmChecksum.verifySignature(req.body, paytmMerchantKey, PaytmChecksum);
    if (isVerifySignature) {
        let paytmParams = {};
        paytmParams['MID'] = req.body.PAYTM_MID;
        paytmParams['ORDER_ID'] = req.body.ORDERID;
        
        PaytmChecksum.generateSignature(paytmParams, paytmMerchantKey).then(function(checksum) {
            paytmParams['CHECKSUMHASH']= checksum;

            let post_data = JSON.stringify(paytmParams);

            let options = {
                hostname: 'securegw-stage.paytm.in',
                port:443,
                path:'/order/status',
                headers:{
                    'Content-Type' : 'application/json',
                    'Content-Length' : post_data.length,
                }
            }

            let res = '';
            let post_req = https.request(options, function(pos_res) {
                pos_res.on('data', function(chunk){
                    res += chunk;
                });
                pos_res.on('end', function(){
                    let result = JSON.parse(res)
                    response.redirect('')
                });

                post_req.write(post_data);
                post_req.end();
            })
        })
    }

}

module.exports = { addPaymentGateway, paytmResponse }