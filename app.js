const express = require('express');
const request = require('request-promise-native');
const { URL } = require('url');

const MESSAGE_CONSTANT = require('./util/message-constant');

const retryUtil = require('./util/promise-retry');

const REQUEST_RETRY = 3;

const app = express();

app.get('/', (req, res) => {

    try{
        const url = new URL(req.query.url);
        const allowParallel = req.query.parallel;

        const retryMethod = allowParallel === 'true' ? 'callParallel' : 'callSequential';

        retryUtil[retryMethod](
            request,
            [{ uri: url.href, resolveWithFullResponse: true }],
            REQUEST_RETRY)
            .then((result) => {
                res.send({ message: MESSAGE_CONSTANT.success, responseStatus: result.statusCode });
            })
            .catch((error) => {
                res.send({ message: MESSAGE_CONSTANT.fail, responseStatus: -1 });
            });
    }catch(error) {
        res.send({ message: MESSAGE_CONSTANT.invalid, responseStatus: -1, error });
    }

});

app.listen(3000, () => console.log('Your server is up and listening at 3000'));

module.exports = app;

