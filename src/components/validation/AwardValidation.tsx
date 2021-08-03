const awardValidation = (id: string, title: string, description: string, receivedFrom: string, dateReceived: string, portfolio: any) => {
    console.log("IN AWARD VALIDATION");
    if(id && title && description && receivedFrom && dateReceived && portfolio){
        return true;
    }
    else{
        return false;
    }
    
}

export default awardValidation;