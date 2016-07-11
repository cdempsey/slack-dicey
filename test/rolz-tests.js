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

const assert = require('chai').assert;
const rolz = require('../rolz');

/*
 * This tests the ../rolz.js module.
 *
 * Be aware that this tets actually calls the Rolz API. In general, this is a
 * Bad Idea(tm) but it also ensure no changes to the Rolz API or internal code
 * breaks everything.
 */
describe('Rolz Module', function() {
    describe('a simple 3d6 roll', function() {
        it('should generate a number between 3 and 18', (done) => {
            assert.doesNotThrow(() => {
                rolz.simpleRoll('3D6', (data) => {
                    try {
                        assert.isNotNull(data, "result shouldn't be null");
                        assert.isUndefined(data, "result shouldn't be undefined");
                        assert.isNumber(data, "should be a number");
                        assert.isAtLeast(data, 3, "should be 3 or more");
                        assert.isAtMost(data, 18, "should be 18 or less");
                    } finally {
                        done();
                    }
                });
            })
        });
    });
    describe('a normal 3d6 roll', function() {
        it('should generate a valid JSON reponse', (done) => {
            assert.doesNotThrow(() => {
                rolz.roll('3D6', (data) => {
                    try {
                        assert.isNotNull(data, "result shouldn't be null");
                        assert.isUndefined(data, "result shouldn't be undefined");
                        assert.isNumber(data.result, " data.result should be a number");
                        assert.isAtLeast(data.result, 3, "should be 3 or more");
                        assert.isAtMost(data.result, 18, "should be 18 or less");
                        assert.isNotNull(data.input, "data.input shouldn't be null");
                        assert.isUndefined(data.input, "data.input shouldn't be undefined");
                        assset.isOk(data.input, "3D6", "data.input should be '3D6'")
                        assert.isNotNull(data.details, "data.details shouldn't be null");
                        assert.isUndefined(data.details, "data.details shouldn't be undefined");
                    } finally {
                        done();
                    }
                }, (error) => {
                    try {
                        assert.fail();
                    } finally {
                        done();
                    }
                });
            })
        });
    });
    describe('a simple d100 roll', () => {
        it('should generate a number between 1 and 100', (done) => {
            rolz.simpleRoll('1D100', (data) => {
                try {
                    assert.isNotNull(data, "result shouldn't be null");
                    assert.isUndefined(data, "result shouldn't be undefined");
                    assert.isNumber(data, "should be a number");
                    assert.isAtLeast(data, 1, "should be 1 or more");
                    assert.isAtMost(data, 100, "should be 100 or less");
                } finally {
                    done();
                }
            });
        })
    });
    describe('a simple 4d6 drop the lowest dice roll', function() {
        it('should generate a number between 3 and 18', (done) => {
            rolz.simpleRoll('4D6H3', (data) => {
                try {
                    assert.isNotNull(data, "result shouldn't be null");
                    assert.isUndefined(data, "result shouldn't be undefined");
                    assert.isNumber(data, "should be a number");
                    assert.isAtLeast(data, 3, "should be 3 or more");
                    assert.isAtMost(data, 18, "should be 18 or less");
                } finally {
                    done();
                }
            });
        });
    });
    describe('a malformed dice expression', () => {
        it('should call the passed in error callback', (done) => {
            rolz.simpleRoll('4Z6Z3', (data) => {
                try {
                    assert.fail();
                } finally {
                    done();
                }
            }, (error) => {
                try {
                    assert.isNotNull(error, "error shouldn't be null");
                    assert.isUndefined(error, "error shouldn't be undefined");
                    assert.isOk(error.indexOf('invalid dice code') > -1, "error should contain 'invalid dice code'")
                } finally {
                    done();
                }
            });
        })
    });
});
