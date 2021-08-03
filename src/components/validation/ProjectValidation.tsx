/*
    Validate (return T, F) the project inputted by the user
    in accordance with the following criteria:
    P1
        - >=1 Project listed 
        - All fields populated with some content
        - Github repo is public
        - >= 8 roles/responsibilities in the project

    P2
        - >= 3 total projects must be entered
        - all criteria met from P1 per each project

        **Typescript**
*/



//Default Exported function that handles general validation - returns boolean array of 'true's
// if all states are valid
//and calls other utility functions as necessary
function ProjectValidation(project: any): string[] {

    ////Work Products is allowed to be null so we put a dummy value in there
    //to make sure it is never null, whatever we put in here wont override the value
    //the user typed into the form since we are just performing error checking here
    project.workProducts = "lorem ipsum";   //dummy string

    //Check to ensure no field is null via iteration
    const errorMsgs = new Array<string>();
    let nullFieldWarning = "Please populate the required fields";

    Object.keys(project).forEach((key: any, keyIndex: any) => {
        if(!Object.values(project)[keyIndex]) {
            errorMsgs.push(nullFieldWarning);
            nullFieldWarning= "!"; 
        } else {
            errorMsgs.push("");
        }
        //We only want null field warning printing once to the console, so we set it to '!'
        //we will tell the error print function to ignore error messages with description "!"          
    });

    //validate roles/respnse
        //8 bp
    const minBullets = 8;
    const rolesRspFieldName = 'responsibilities';
    Object.keys(project).forEach((key: any, keyIndex: any) => {
        
        if(key == rolesRspFieldName && !errorMsgs[keyIndex]) {
            errorMsgs[keyIndex] = 
                checkEnoughBullets(Object.values(project)[keyIndex], minBullets) ?
                "" : "Enter at least 8 bullet points in the Responsibilities section"
        }
    });

    return errorMsgs;
}


//Check if there are enough bullets in roles/responsibilities section
//bullets will be delimitted by \n characters
function checkEnoughBullets(rspbts:any, minBullets: number) {

    //check if string is null/undefined
    if(!rspbts) { return false; }

    //Need to count 7 '\n' instances in text
    const numBullets = (rspbts.match(/\n/g) || '').length + 1;

    return (numBullets >= minBullets);
}

export default ProjectValidation;

