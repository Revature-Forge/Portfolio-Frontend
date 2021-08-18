import industrySkillValidation from "../components/Validation/IndustryEquivalencyValidation";


test('ensure industrySkillValidation returns false when SkillName is passed with a falsy parameter', () => {
    let skillName = "";
    let equivalency = 1;

    let valid = industrySkillValidation(skillName, equivalency);
    expect(valid).toBe(false);
});

test('ensure industrySkillValidation returns true when SkillName and equivalency is passed truthy parameter', () => {
    let skillName = "Java";
    let equivalency = 3;

    let valid = industrySkillValidation(skillName, equivalency);
    expect(valid).toBe(true);
});

test('ensure industrySkillValidation returns false when equivalency is passed truthy parameter and skillName is passed with a truthy value', () => {
    let skillName = "Java";
    let equivalency = 0;

    let valid = industrySkillValidation(skillName, equivalency);
    expect(valid).toBe(false);
});

test('ensure industrySkillValidation returns false when equivalency is passed falsey parameter and skillName is passed with a falsey value', () => {
    let skillName = "";
    let equivalency = 0;

    let valid = industrySkillValidation(skillName, equivalency);
    expect(valid).toBe(false);
});

