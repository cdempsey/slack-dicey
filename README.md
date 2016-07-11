# Dicey for Slack

A small [Node.js](https://nodejs.org/en/) application that adds a slash
command to a [Slack](https://slack.com/) team that integrates with
[Rolz.org](https://rolz.org/)'s [API](https://rolz.org/help/api) to allow users
to roll virtual dice.

```
/roll 3d6 - *rolls 3 six-sided dice*
/roll 4d6H3 - *rolls 4 six-sided dice and keep the highest 3*
/roll d100 - *rolls 2 ten-sided dice to generate a number between 1 and 100*
```

See [Rolz Help Page](https://rolz.org/help/index) for more dice expressions that
 can be used.

## Getting Started

These instructions will get you a copy of the project up and running on your
local machine for development and testing purposes. See **Deployment** for notes
on how to deploy the project on a live system.

### Prerequisities

You will need the following on your development machine:
* [Node.js](https://nodejs.org/en/)
* [npm](https://www.npmjs.com/)

See [package.json](package.json) for specific Node modules used in the project.

### Installing

To get the project up and running on your development machine you'll need to
ensure all of the software under **Prerequisities** is installed and running
correctly.

```
git clone https://github.com/cdempsey/slack-dicey.git
cd <project root directory>
npm install
npm test
```

## Running the tests

After working through **Getting Started** and the **Prerequisities** running the
test only requires:

```
cd <project root directory>
npm test
```

## Deployment

While the target deployment environment is to run the code on
[AWS Lambda](https://aws.amazon.com/lambda/) behind
[AWS API Gateway](https://aws.amazon.com/api-gateway/) there isn't any tie
between the code and AWS. Any runtime environment capable of running
[Node.js](https://nodejs.org/en/) that is Internet addressable should work.

After completing the steps under **Installation** developers on OSX or Linux can:

```
chmod u+x aws.sh
./aws.sh
```

Which will create a new file, dicey.zip, in a new sub-directory named /build that
can be used to upload as a
[AWS Lambda deployment package](http://docs.aws.amazon.com/lambda/latest/dg/nodejs-create-deployment-pkg.html)

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available,
see the [tags on this repository](https://github.com/cdempsey/slack-dicey/tags).

## Authors

* **Chris Dempsey** - *Initial work*

See also the list of [contributors](contributors.md) who participated in this
project.

## License

This project is licensed under the MIT License - see the
[LICENSE.md](LICENSE.md) file for details
