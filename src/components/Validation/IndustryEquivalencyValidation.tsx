const IndustryEquivalencyValidation = (skillName: string, equivalence: number) => {
    
    if (skillName && equivalence) {
        return true;
    }else if (skillName && equivalence == 0) {
        console.log("Cannot have a skill with 0 experience.");
        return false;
    } else if(equivalence > 0 ) {
        console.log("Please enter a skill name.");
        return false;
    } else if (!skillName && equivalence == 0 ) {
        console.log("Please enter a skill name and cannot have a skill with 0 experience.") 
        return false;
        
    }

}
export default IndustryEquivalencyValidation;
