/*
    Validate (return T, F) the additional work experience entered
     by the user in accordance with the following criteria:
    
     - All component fields contain data
*/

//Default verify otherWorkExpValidation Section
function otherWorkExpValidation(wrkExp: any): Array<string> 
{
    //check to ensure each field is not null
    const errorMsgs = new Array<string>();
    let nullFieldWarning = "Populate the required fields";
    
    Object.keys(wrkExp).forEach((key: any, keyIndex: any) => {

        if(!Object.values(wrkExp)[keyIndex]) {
            errorMsgs.push(nullFieldWarning);
            nullFieldWarning= "!"; 
        } else {
            errorMsgs.push("");
        }
        //We only want null field warning printing once to the console, so we set it to '!'
        //we will tell the error print function to ignore error messages with description "!"

    });


    //check if start date excedes endDate, an error, types are
    //coerced into numbers
    const startDateField = 'startDate';
    if(!checkDatesInOrder(wrkExp.startDate, wrkExp.endDate)) {
        Object.keys(wrkExp).forEach((key: any, keyIndex: any) => { 
            if(key == startDateField) {
                errorMsgs[keyIndex] = "Start date must precede end date";
                errorMsgs[keyIndex+1] = "!";    //We want this to be styled but NOT display a message
            }
        });
    }
    return errorMsgs;
}

//check if the startDate precedes the end date
function checkDatesInOrder(start: number, end: number) {
    if(start > end) {
        return false;
    }
    return true;
}

export default otherWorkExpValidation
export {checkDatesInOrder}