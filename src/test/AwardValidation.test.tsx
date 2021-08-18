import awardValidation from "../components/Validation/AwardValidation";

let id = "";
let title = "";
let description = "";
let receivedFrom = "";
let dateReceived = "";
let portfolio = "";

test('ensure awardValidation returns false when passed falsy parameters', () => { 
    let valid = awardValidation(id, title, description, receivedFrom, dateReceived, portfolio)
    expect(valid).toBe(false);
});

test('ensure awardValidation returns true when passed truthy parameters', () => { 
    id = "true";
    title = "true";
    description = "true";
    receivedFrom = "true";
    dateReceived = "true";
    portfolio = "true";

    let valid = awardValidation(id, title, description, receivedFrom, dateReceived, portfolio)
    expect(valid).toBe(true);
});

test('ensure awardValidation returns false when passed falsy id', () => { 
    id = "";

    let valid = awardValidation(id, title, description, receivedFrom, dateReceived, portfolio)
    expect(valid).toBe(false);
});

test('ensure awardValidation returns false when passed falsy title', () => { 
    id = "true";
    title = "";

    let valid = awardValidation(id, title, description, receivedFrom, dateReceived, portfolio)
    expect(valid).toBe(false);
});

test('ensure awardValidation returns false when passed falsy description', () => { 
    title = "true";
    description = "";

    let valid = awardValidation(id, title, description, receivedFrom, dateReceived, portfolio)
    expect(valid).toBe(false);
});

test('ensure awardValidation returns false when passed falsy recievedFrom', () => { 
    description = "true";
    receivedFrom = "";

    let valid = awardValidation(id, title, description, receivedFrom, dateReceived, portfolio)
    expect(valid).toBe(false);
});

test('ensure awardValidation returns false when passed falsy dateReceived', () => { 
    receivedFrom = "true";
    dateReceived = "";

    let valid = awardValidation(id, title, description, receivedFrom, dateReceived, portfolio)
    expect(valid).toBe(false);
});

test('ensure awardValidation returns false when passed falsy portfolio', () => { 
    dateReceived = "true";
    portfolio = "";

    let valid = awardValidation(id, title, description, receivedFrom, dateReceived, portfolio)
    expect(valid).toBe(false);
});