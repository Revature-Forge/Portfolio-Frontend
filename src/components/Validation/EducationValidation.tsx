
const educationValidation = (university: string, degree: string, graduationDate: string, gpa: number) => {
    if(university && degree && graduationDate && gpa){
        return true;
    }
    else{
        return false;
    }
    
}

function educationValidationErrors(university: string, degree: string, graduationDate: string, gpa: number) : Array<string> {
    const errorMsgs = new Array<string>();
    if(!university){
        errorMsgs.push("Populate the required fields");
    }
    else if(!degree){
        errorMsgs.push("Populate the required fields");
    }
    else if(!graduationDate){
        errorMsgs.push("Populate the required fields");
    }
    else if(!gpa){
        errorMsgs.push("Populate the required fields");
    }
    else{
        errorMsgs.push("");
    }

    return errorMsgs;
}

export default educationValidation;
export { educationValidationErrors };