let expect = require("chai").expect;
let getStudentsMW = require("../../../middleware/diak/getStudentsMW");

describe('getStudentsMW middleware', () => {
    it('should return all the users from the db', (done) => {
        const mw = getStudentsMW({
            DiakModel: {
                find: (p1, cb) => {
                    expect(p1).to.be.eql({});
                    cb(null, ['diak1', 'diak2']);
                }
            }
        });

        const resMock = {
            locals: {}
        };

        mw({}, resMock, next => {
            expect(next).to.be.eql(undefined);
            expect(resMock.locals.diakok).to.be.eql(['diak1', 'diak2']);
            done();
        });
    });

    it('should call next with error upon db error', (done) => {
        const mw = getStudentsMW({
            DiakModel: {
                find: (p1, cb) => {
                    expect(p1).to.be.eql({});
                    cb('Hiba', null);
                }
            }
        });

        const resMock = {
            locals: {}
        };

        mw({}, resMock, next => {
            expect(next).to.be.eql('Hiba');
            expect(resMock.locals).to.be.eql({});
            done();
        });
    });
});