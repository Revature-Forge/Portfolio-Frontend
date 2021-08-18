
//Project imports
import ProjectValidation from "../components/Validation/ProjectValidation";

/*
    Perform the following tests to ensure project validation meets requirements

    - null project name triggers error
    - null project descr triggers error
    - null git link triggers error
    - git link not public triggers eror

    -p2
    - num projects must be 3, this must be tested elsewhere

*/

//Desribe full test suite for proj validation
describe('All Project validation tests: ', function() {

/*  Create project Objects for testing  */
const p1 = {
    name: "JAN ORM",
    desc: "JAN Project",
    responsibilities: "r1:\nr2:\nr3:\nr4:\nr5:\nr6:\nr7:\nr8\n",
    techs: "java, c++, python, html",
    repo: "https://github.com/jhw2167/JAN_ORM_p1",
    workProducts: "idk what this is"
}
var i = 0;
//freeze const obj
//Object.freeze(p1);

//null project name triggers invalid submission
it('null project name triggers invalid submission', function() {
    let temp = Object.values(p1)[i];
    p1.name = "";
    expect(!ProjectValidation(p1)[i++]).toBe(false);
    p1.name = temp;
});


//null responsibilities section triggers invalid submission
it('null desc section triggers invalid submission', function() {
    let temp = Object.values(p1)[i];
    p1.desc = "";
    expect(!ProjectValidation(p1)[i++]).toBe(false);
    p1.desc = temp;
});


//null responsibilities section triggers invalid submission
it('null resp section triggers invalid submission', function() {
    let temp = Object.values(p1)[i];
    p1.responsibilities = "";
    expect(!ProjectValidation(p1)[i]).toBe(false);
    p1.responsibilities = temp;
});

/* BONUS, responsibilites */
//responsibilities must have at least 8 bullet points
it('responsibilities section must have 8 bullet points', function() {
    let temp = Object.values(p1)[i];
    p1.responsibilities = "r1\nr2\nr3\n";
    expect(!ProjectValidation(p1)[i++]).toBe(false);
    p1.responsibilities = temp;
});

//null technologies section triggers invalid submission
it('null technologies section triggers invalid submission', function() {
    let temp = Object.values(p1)[i];
    p1.techs = "";
    expect(!ProjectValidation(p1)[i++]).toBe(false);
    p1.techs = temp;
});


//null github link desc triggers invalid
it('null github link name triggers invalid submission', function() {
    let temp = Object.values(p1)[i];
    p1.repo = "";
    expect(!ProjectValidation(p1)[i++]).toBe(false);
    p1.repo = temp;
});


//null work products is stil allowed
it('null work products is allowable', function() {
    let temp = Object.values(p1)[i];
    p1.workProducts = "";
    expect(!ProjectValidation(p1)[i++]).toBe(true);
    p1.workProducts = temp;
});


//All fields populated returns TRUE
it('All fields populated triggers valid response', function() {
    const isValid = ProjectValidation(p1);
    let allValid = true;
    isValid.forEach((elem) => {allValid = allValid && !elem;});
    expect(allValid).toBe(true);
});

});
//END DESCRIBE TESS