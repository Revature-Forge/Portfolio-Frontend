
/*
    Component responsible for taking string[] of error messages
    as props and displaying messages to user underneath 
    the form.
*/

//CSS Imports
import "../../css/StaticCriteriaValidation.css"

//React Imports
import React from "react";

//component validation msg
const ValidationMsg = (props: any) => {

    //filter error messges to those that are NOT blank and those
    //that have an actual message, i.e. not an "!" (this is used elsewhere in the code)
    //This "!" is not associated with the "!" printed to the empty boxes to indicate errors
    const errMsgs = props.errors.filter( (error: string) => {return (error && error !=="!") } );
    errMsgs.sort( (a: string, b: string) => {
        return b.length - a.length;
    });

    return (
        <div id="form-component-error-list">
            <ul>
                {errMsgs.map((error: string, i: number) => {
                   return <li key={i}>{error}</li> }
                )}
            </ul>
        </div>
    );
}

//Export to form components
export default ValidationMsg