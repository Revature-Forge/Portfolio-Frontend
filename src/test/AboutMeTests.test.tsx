import {aboutMeValidateEmail, aboutMeValidateBio, aboutMeValidatePhone} from '../components/validation/AboutMeValidation';
/**
 * Test file to test the proper functionality of the AboutMe validation
 * and page.
 * 
 * @author Kyle Castillo
 */

/**
 * Tests of the validation component within the AboutMe.tsx
 */
const validBio = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a,"
const validEmail1 = "emailisValid@gmail.com";
const validEmail2 = "emailisValid@gmail.net";
const validEmail3 = "email.is.valid@gmail.org";
const validPhone1 = "909-123-4567";
const validPhone2 = "9091234567";
const validPhone3 = "(909)-123-4567";

describe("Tests to ensure proper validation for aboutMeValidateBio", () =>{
    it("Returns false if nothing was submitted", () =>{
        expect(aboutMeValidateBio("")).toBeFalsy();
    });
    it("Returns false if the bio is too short", () =>{
        expect(aboutMeValidateBio("This is too short of a bio")).toBeFalsy();
    });
    it("Returns true if the bio is valid", () => {
        expect(aboutMeValidateBio(validBio)).toBe(true);
    });
});

describe("Tests to ensure proper validation for aboutMeValidateEmail",() =>{
    it("Returns false if nothing was submitted", () =>{
        expect(aboutMeValidateEmail("")).toBeFalsy();
    });
    it("Returns false if the email is not in a valid format", () =>{
        expect(aboutMeValidateEmail("invalid")).toBeFalsy();
        expect(aboutMeValidateEmail("alsoinvalid.com")).toBeFalsy();
        expect(aboutMeValidateEmail("alsoinvalid@something")).toBeFalsy();
    });
    it("Returns true if the email is in a valid format", () =>{
        expect(aboutMeValidateEmail(validEmail1)).toBe(true);
        expect(aboutMeValidateEmail(validEmail2)).toBe(true);
        expect(aboutMeValidateEmail(validEmail3)).toBe(true);
    });
});

describe("Tests to ensure proper validation for aboutMeValidatePhone", () =>{
    it("Returns false if nothing was submitted", () =>{
        expect(aboutMeValidatePhone("")).toBeFalsy();
    });
    it("Returns false if the phone is not in a valid format",() =>{
        expect(aboutMeValidatePhone("invalid")).toBeFalsy();
        expect(aboutMeValidatePhone("909123456789A")).toBeFalsy();
    });
    it("Returns true if the phone number is in a valid format", () =>{
        expect(aboutMeValidatePhone(validPhone1)).toBe(true);
        expect(aboutMeValidatePhone(validPhone2)).toBe(true);
        expect(aboutMeValidatePhone(validPhone3)).toBe(true);
    });
});

