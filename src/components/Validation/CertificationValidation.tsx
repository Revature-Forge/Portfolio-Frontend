const certificationValidation = (portfolio: any, name: string, certId: string, issuedBy: string, issuedOn: string) => {
    console.log("IN CERTIFICATION VALIDATION");
    if(portfolio && name && certId && issuedBy && issuedOn){
        return true;
    }
    else{
        return false;
    }
    
}

export default certificationValidation;