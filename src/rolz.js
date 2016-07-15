/*The MIT License (MIT)
Copyright (c) 2016 Chris Dempsey <cdallas@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/*
 * NodeJS module for working with the Rolz.org API ( https://rolz.org/help/api )
 */

const https = require('https');

const rolzOptions = {
    host: 'rolz.org',
    path: '/api/?',
    port: 443,
    method: 'GET',
    accept: '*/*'
};

function buildRolzURI(diceExpression, type) {
    return `https://${rolzOptions.host}:${rolzOptions.port}${rolzOptions.path}${diceExpression}.${type}`;
}

function isInvalidDiceExpression(result) {
    return result.indexOf('invalid dice code') > -1;
}

function callRolzAPI(rolzUrl, callback, errorback) {
    https.get(rolzUrl, (response) => {
            let resultData = '';
            response.setEncoding('utf8');
            response
                .on('data', (data) => {
                    resultData += data;
                })
                .on('end', (data) => {
                    if (data !== undefined) {
                        resultData += data;
                    }
                    if (isInvalidDiceExpression(resultData)) {
                        errorback(resultData);
                    } else {
                        callback(resultData);
                    }
                })
        })
        .on('error', (error) => {
            errorback(error);
        });
}

exports.roll = function (diceExpression, callback, errorback) {
    callRolzAPI(buildRolzURI(diceExpression, "json"), callback, errorback);
}

exports.simpleRoll = function (diceExpression, callback, errorback) {
    callRolzAPI(buildRolzURI(diceExpression, "simple"), callback, errorback);
}
