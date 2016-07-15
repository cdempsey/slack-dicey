/*
The MIT License (MIT)
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

const Botkit = require('botkit');
const rolz = require('./rolz');

if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET || !process.env.PORT || !process.env.VERIFICATION_TOKEN) {
    console.log('Error: Specify CLIENT_ID, CLIENT_SECRET, VERIFICATION_TOKEN and PORT in environment');
    process.exit(1);
}

var config = {
    debug: false
};

function formatRolzResult(message, data) {
    var username = message.user_name;
    return `${username} rolled ${message.text} and got a result of ${data.result} [dice: ${data.details}]\n`;
};

var controller = Botkit.slackbot(config);

controller.setupWebserver(process.env.PORT, function (err, webserver) {
    controller.createWebhookEndpoints(webserver);
});

controller.spawn({
    token: process.env.VERIFICATION_TOKEN
}).startRTM();

controller.on('slash_command', function (slashCommand, message) {

    if (message.token !== process.env.VERIFICATION_TOKEN) return;

    switch (message.command) {
    case "/roll":

        if (message.text === "" || message.text === "help") {
            slashCommand.replyPublic(message, "Roll dice using the Rolz.org API. See https://rolz.org/wiki/page?w=help&n=index");
        } else if (message.text === "code") {
            slashCommand.replyPublic(message, "See https://github.com/cdempsey/slack-dicey");
        } else {
            rolz.roll(message.text, function (data) {
                slashCommand.replyPublic(message, formatRolzResult(message, JSON.parse(data)));
            }, function (error) {
                slashCommand.replyPrivate(message, "I don't know how to " + message.command + " yet.");
            });
        }

        break;
    default:
        slashCommand.replyPrivate(message, "I don't know how to " + message.command + " yet.");
    }
});
