
const styleInvalidElements = (inputElements: HTMLCollectionOf<Element>) => {
    styleLoop(inputElements);
}

const styleInvalidElement = (element: HTMLElement) => {
    element.setAttribute('style', 'border-left: 3px solid red');     
    element.setAttribute('placeholder', '!');
}

const styleInvalidElementsByName = (inputElements: NodeListOf<HTMLElement>) => {
    styleLoop(inputElements);
}


//Styles a node list of HTML elements without the null check
const styleInvalidElementsByNameNotNull = (inputElements: NodeListOf<HTMLElement>, isValid: boolean) => {
    for(let i = 0; i < inputElements.length; i++)
    {    
        if( !isValid) {
        inputElements.item(i)?.setAttribute('style', 'border-left: 3px solid red');   
        inputElements.item(i)?.setAttribute('placeholder', '!');
        }
        else{
            inputElements.item(i)?.setAttribute('style', 'border-left: 1px solid black');
        }
    }
}

const styleLoop = (inputElements: any) => {
    for(let i = 0; i < inputElements.length; i++){
        
        if(!inputElements.item(i)?.getAttribute('value')){
            inputElements.item(i)?.setAttribute('style', 'border-left: 3px solid red');
            
            inputElements.item(i)?.setAttribute('placeholder', '!');
        }
        else{
            inputElements.item(i)?.setAttribute('style', 'border-left: 1px solid black');
        }
    }
}


export default styleInvalidElements;
export {styleInvalidElementsByName, styleInvalidElementsByNameNotNull, styleInvalidElement};