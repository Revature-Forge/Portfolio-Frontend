import certificationValidation from "../components/validation/CertificationValidation";

let portfolio = "";
let name = "";
let certId = "";
let issuedBy = "";
let issuedOn = "";

test('ensure certificationValidation returns false when passed falsy parameters', () => {
    let valid = certificationValidation(portfolio, name, certId, issuedBy, issuedOn)
    expect(valid).toBe(false);
});

test('ensure certificationValidation returns true when passed truthy parameters', () => {
    portfolio = "true";
    name = "true";
    certId = "true";
    issuedBy = "true";
    issuedOn = "true";

    let valid = certificationValidation(portfolio, name, certId, issuedBy, issuedOn)
    expect(valid).toBe(true);
});

test('ensure certificationValidation returns false when passed falsy portfolio', () => {
    portfolio = "";

    let valid = certificationValidation(portfolio, name, certId, issuedBy, issuedOn)
    expect(valid).toBe(false);
});

test('ensure certificationValidation returns false when passed falsy name', () => {
    portfolio = "true";
    name = "";

    let valid = certificationValidation(portfolio, name, certId, issuedBy, issuedOn)
    expect(valid).toBe(false);
});

test('ensure certificationValidation returns false when passed falsy certId', () => {
    name = "true";
    certId = "";

    let valid = certificationValidation(portfolio, name, certId, issuedBy, issuedOn)
    expect(valid).toBe(false);
});

test('ensure certificationValidation returns false when passed falsy issuedBy', () => {
    certId = "true";
    issuedBy = "";

    let valid = certificationValidation(portfolio, name, certId, issuedBy, issuedOn)
    expect(valid).toBe(false);
});

test('ensure certificationValidation returns false when passed falsy issuedOn', () => {
    issuedBy = "true";
    issuedOn = "";

    let valid = certificationValidation(portfolio, name, certId, issuedBy, issuedOn)
    expect(valid).toBe(false);
});
