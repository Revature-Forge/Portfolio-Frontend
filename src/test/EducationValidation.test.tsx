import educationValidation from "../components/validation/EducationValidation";

var university = "";
var degree = "";
var graduationDate = "";
var gpa = 0.0;

test('ensure educationValidation returns false when passed falsy parameters', () => {
    let valid = educationValidation(university, degree, graduationDate, gpa);
    expect(valid).toBe(false);
});

test('ensure educationValidation returns true when passed all truthy parameters', () => {
    university = "Loyola University Maryland";
    degree = "Computer Science";
    graduationDate = "05/16/20";
    gpa = 3.8;

    let valid = educationValidation(university, degree, graduationDate, gpa);
    expect(valid).toBe(true);
});

test('ensure educationValidation returns false when university is falsey', () => {
    university = "";

    let valid = educationValidation(university, degree, graduationDate, gpa);
    expect(valid).toBe(false);
});

test('ensure educationValidation returns false when degree is falsey', () => {
    university = "Loyola University Maryland";
    degree = "";

    let valid = educationValidation(university, degree, graduationDate, gpa);
    expect(valid).toBe(false);
});

test('ensure educationValidation returns false when graduationDate is falsey', () => {
    degree = "Computer Science";
    graduationDate = "";

    let valid = educationValidation(university, degree, graduationDate, gpa);
    expect(valid).toBe(false);
});

test('ensure educationValidation returns false when gpa is falsey', () => {
    graduationDate = "05/16/20";
    gpa = 0.0;

    let valid = educationValidation(university, degree, graduationDate, gpa);
    expect(valid).toBe(false);
});