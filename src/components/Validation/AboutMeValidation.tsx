/**
 * A validtion component to validate the information in the about me component
 * prior to allowing it to be displayed on the webpage.
 * 
 * @author Kyle Castillo
 */

/**
 * A validation function to check and see if the bio meets a fixed character length. Additionally this checks to see if the 
 * bio is not fasly.
 * @param bio A string representation of the bio submitted by a user.
 * @return true if the bio meets the designated length, false if its falsy or too short.
 */
  export const aboutMeValidateBio = (bio:string) =>{
    //Check to see if the bio is falsy.
    if(!bio){
        return false;
    //Check to see if the bio is at least a certain number of characters long.
    } else if(bio.length < 100){
        return false;
    //The bio meets bare minimum critieria to be submitted.
    } else {
        return true;
    }
}

/**
 * A validation function to check and see if the email matches an expected RegEx.
 * @param email A string representation of the email submitted by a user.
 * @returns true if the email is valid or false if its invalid in structure.
 */
export const aboutMeValidateEmail = (email:string) =>{
    const emailRegEx = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    //Check to see if the email is falsy.
    if(!email){
        return false;
    //Check to see if the email matches a RegEx for an email.
    } else if(!emailRegEx.test(email)){
        return false;
    //The email meets the bare minimum criteria to be submitted.
    } else {
        return true;
    }
}

/**
 * A validation function to check and see if the phone matches an expected RegEx.
 * @param phone A string representation of the phone number submitted by a user.
 * @returns true if the phone number is valid or false if its invalid in structure.
 */
export const aboutMeValidatePhone = (phone:string) =>{
    const phoneRegEx = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    //Check to see if the phone is falsy
    if(!phone){
        return false;
    //Check to see if the phone number matches a RegEx for a phone number.
    } else if(!phoneRegEx.test(phone)){
        return false;
    //The phone number meets the bare minimum requirements to be submitted.
    } else {
        return true;
    }
}
