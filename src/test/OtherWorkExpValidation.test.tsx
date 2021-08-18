

//Project imports
import OtherWorkExpValidation from "../components/Validation/OtherWorkExpValidation";

/*
    Perform the following tests to ensure project validation meets requirements

    - null employer triggers error
    - null descr triggers error
    - null rspbts triggers error
    - null tools triggers eror
    - null start date triggers eror
    - null end data triggers eror
    - End date before start date triggers error

    -p2
    - num projects must be 3, this must be tested elsewhere

*/

const w1 = {
    employer: "Company Inc",
    title: "My Other Work Experience",
    rspbts: "leader, coder, engineer",
    desc: "I did stuff and also things",
    tools: "C++, Java, Python, CSS, HTML, JavaScript",
    startDate: "1625374800000",
    endDate: "1626325200000"
}
var i = 0;
//freeze const obj
//Object.freeze(w1);

//Desribe full test suite for proj validation
describe('All Other Work Experience validation tests: ', function() {

    //null employer triggers error
    it('null employer triggers invalid submission', function() {
        let temp = Object.values(w1)[i];
        w1.employer = "";
        expect(!OtherWorkExpValidation(w1)[i++]).toBe(false);
        w1.employer = temp;
    });


    //null title triggers error
    it('null title triggers invalid submission', function() {
        let temp = Object.values(w1)[i];
        w1.title = "";
        expect(!OtherWorkExpValidation(w1)[i++]).toBe(false);
        w1.title = temp;
    });


    //null responsibilities triggers error
    it('null responsibilities triggers invalid submission', function() {
        let temp = Object.values(w1)[i];
        w1.rspbts = "";
        expect(!OtherWorkExpValidation(w1)[i++]).toBe(false);
        w1.rspbts = temp;
    });


    //null description triggers error
    it('null description triggers invalid submission', function() {
        let temp = Object.values(w1)[i];
        w1.desc = "";
        expect(!OtherWorkExpValidation(w1)[i++]).toBe(false);
        w1.desc = temp;
    });


    //null tools triggers error
    it('null tools triggers invalid submission', function() {
        let temp = Object.values(w1)[i];
        w1.tools = "";
        expect(!OtherWorkExpValidation(w1)[i++]).toBe(false);
        w1.tools = temp;
    });


    //null startDate triggers error
    it('null startDate triggers invalid submission', function() {
        let temp = Object.values(w1)[i];
        w1.startDate = "";
        expect(!OtherWorkExpValidation(w1)[i++]).toBe(false);
        w1.startDate = temp;
    });


    //null endDate triggers error
    it('null endDate triggers invalid submission', function() {
        let temp = Object.values(w1)[i];
        w1.endDate = "";
        expect(!OtherWorkExpValidation(w1)[i++]).toBe(false);
        w1.endDate = temp;
    });


    //end date may not precede start date chronologically
    it('End date may not precede start date', function() {
        w1.endDate = "1625374700000";
        expect(!OtherWorkExpValidation(w1)[6]).toBe(false);
        w1.endDate = "1645374700000";
    });


    //All fields populated correctly returns VALID response
    //null endDate triggers error
    it('All fields populated triggers valid response', function() {
        const isValid = OtherWorkExpValidation(w1);
        let allValid = true;
        isValid.forEach((elem) => {allValid = allValid && !elem;});
        expect(allValid).toBe(true);
    });

});