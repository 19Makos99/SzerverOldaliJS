let expect = require("chai").expect;
let deleteStudentMW = require("../../../../middleware/diak/deleteStudentMW");

describe('deleteStudentMW middleware', () => {
    it('should call next with error when diak is undefined', (done) => {
        const mw = deleteStudentMW({});

        const resMock = {
            locals: {}
        };

        mw({}, resMock, next => {
            expect(resMock.locals).to.be.eql({});
            expect(next).to.be.eql("Nincs meg a törlendő diák");
            done();
        });
    });

    it('should call next with error upon db error', (done) => {
        const mw = deleteStudentMW({});

        const resMock = {
            locals: {
                diak: {
                    remove: cb => {
                        cb('Hiba');
                    }
                }
            }
        };

        mw({}, resMock, next => {
            expect(next).to.be.eql('Hiba');
            done();
        });
    });

    it('should redirect when everything is ok', (done) => {
        const mw = deleteStudentMW({});

        const resMock = {
            locals: {
                diak: {
                    remove: cb => {
                        cb(null);
                    }
                }
            },
            redirect: p1 => {
                expect(p1).to.be.eql("/");
                done();
            }
        };

        mw({}, resMock, next => {
            expect(next).to.be.eql(null);
        });
    });
});