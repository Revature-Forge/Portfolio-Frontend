
import revWorkExpValidation from "../components/Validation/RevatureWorkExpValidation";

var employer = "";
var startDate = "";
var endDate = "";
var title = "";
var responsibilities = "";
var description = "";
var technologies = "";

test('ensure revWorkExpValidation returns false when passed falsey parameters', () => {
    

    let valid = revWorkExpValidation(employer, startDate, endDate, title, responsibilities, description, technologies);
    expect(valid).toBe(false);
});

test('ensure revWorkExpValidation returns true when passed all truthy parameters', () => {
    employer = "Revature";
    startDate = "05/16/2021";
    endDate = "08/12/2021";
    title = "Associate";
    responsibilities = "Training";
    description = "12 week training program with QC, audits, and projects";
    technologies = "Frameworks";

    let valid = revWorkExpValidation(employer, startDate, endDate, title, responsibilities, description, technologies);
    expect(valid).toBe(true);
});

test('ensure revWorkExpValidation returns false when employer is falsey', () => {
    employer = "";

    let valid = revWorkExpValidation(employer, startDate, endDate, title, responsibilities, description, technologies);
    expect(valid).toBe(false);
});

test('ensure revWorkExpValidation returns false when startDate is falsey', () => {
    employer = "Revature";
    startDate = "";

    let valid = revWorkExpValidation(employer, startDate, endDate, title, responsibilities, description, technologies);
    expect(valid).toBe(false);
});

test('ensure revWorkExpValidation returns false when endDate is falsey', () => {
    startDate = "05/16/2021";
    endDate = "";

    let valid = revWorkExpValidation(employer, startDate, endDate, title, responsibilities, description, technologies);
    expect(valid).toBe(false);
});

test('ensure revWorkExpValidation returns false when title is falsey', () => {
    endDate = "08/12/2021";
    title = "";

    let valid = revWorkExpValidation(employer, startDate, endDate, title, responsibilities, description, technologies);
    expect(valid).toBe(false);
});

test('ensure revWorkExpValidation returns false when responsibilities is falsey', () => {
    title = "Associate";
    responsibilities = "";

    let valid = revWorkExpValidation(employer, startDate, endDate, title, responsibilities, description, technologies);
    expect(valid).toBe(false);
});

test('ensure revWorkExpValidation returns false when description is falsey', () => {
    responsibilities = "Training";
    description = "";

    let valid = revWorkExpValidation(employer, startDate, endDate, title, responsibilities, description, technologies);
    expect(valid).toBe(false);
});

test('ensure revWorkExpValidation returns false when technologies is falsey', () => {
    description = "12 week training program with QC, audits, and projects";
    technologies = "";

    let valid = revWorkExpValidation(employer, startDate, endDate, title, responsibilities, description, technologies);
    expect(valid).toBe(false);
});