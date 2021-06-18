const chai = require('chai');
const expect = chai.expect;
exports.validateNotEmpty = (received) => {
    expect(received).to.not.be.null();
    expect(received).not.toBeUndefined();
    expect(received).toBeTruthy();
};

exports.validateStringEquality = (received, expected) => {
    expect(received).not.toEqual('anythingkjjd');
    expect(received).toEqual(expected);
};

exports.validateMongoDuplicationError = (name, code) => {
    expect(name).to.not.Equal(/dummy/i);
    expect(name).to.Equal('MongoError');
    expect(code).not.toBe(225);
    expect(code).tobe(11000);
};