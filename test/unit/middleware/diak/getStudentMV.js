let expect = require("chai").expect;
let getStudentMW = require("../../../../middleware/diak/getStudentMW");

describe('getStudentMW middleware', () => {
    it('should do nothing when diakid is undefined', (done) => {
        const mw = getStudentMW({
            DiakModel: {}
        });

        const resMock = {
            locals: {}
        };

        mw({params:{}}, resMock, next => {
            expect(next).to.be.eql(undefined);
            done();
        });
    });

    it('should return a user from the db', (done) => {
        const mw = getStudentMW({
            DiakModel: {
                findOne: (p1, cb) => {
                    expect(p1._id).to.be.eql('100');
                    cb(null, 'diak')
                }
            }
        });

        const resMock = {
            locals: {}
        };

        mw({params:{diakid: '100'}}, resMock, next => {
            expect(resMock.locals.diak).to.be.eql('diak');
            expect(next).to.be.eql(undefined);
            done();
        });
    });

    it('should call next with error upon db error', (done) => {
        const mw = getStudentMW({
            DiakModel: {
                findOne: (p1, cb) => {
                    expect(p1._id).to.be.eql('100');
                    cb('Hiba', null)
                }
            }
        });

        const resMock = {
            locals: {}
        };

        mw({params:{diakid: '100'}}, resMock, next => {
            expect(resMock.locals.diak).to.be.eql(undefined);
            expect(next).to.be.eql('Hiba');
            done();
        });
    });
});