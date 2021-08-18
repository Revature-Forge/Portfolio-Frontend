import { checkDatesInOrder } from "./OtherWorkExpValidation";

const revWorkExpValidation = (employer: string, startDate: string, endDate: string, title: string, responsibilities: string, description: string, technologies: string) => {
    if(employer && startDate && endDate && title && responsibilities && description && technologies){
        return true;
    }
    else{
        return false;
    }
    
}

function revWorkExpErrors(employer: string, startDate: string, endDate: string, title: string, responsibilities: string, description: string, technologies: string) : Array<string> {
    const errorMsgs = new Array<string>();

    if(!employer){
        errorMsgs.push("Populate the required fields")
    }
    else if(!startDate){
        errorMsgs.push("Populate the required fields")
    }
    else if(!endDate){
        errorMsgs.push("Populate the required fields")
    }
    else if(!title){
        errorMsgs.push("Populate the required fields")
    }
    else if(!responsibilities){
        errorMsgs.push("Populate the required fields")
    }
    else if(!description){
        errorMsgs.push("Populate the required fields")
    }
    else if(!technologies){
        errorMsgs.push("Populate the required fields")
    }
    else{
        errorMsgs.push("");
    }

    //check if start date excedes endDate
    if(!checkDatesInOrder(Number(startDate.replaceAll("-", "")), Number(endDate.replaceAll("-", "")))) {
        console.log("dates not in order")
        errorMsgs.push("Start date must precede end date")
    }


    return errorMsgs;
}

export default revWorkExpValidation;
export { revWorkExpErrors };