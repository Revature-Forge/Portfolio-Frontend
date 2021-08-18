const validate = (inputs: any) => {
    const errors:{[key: string]: any} = {}

    //First Name errors
    if (!inputs.fname) {
        errors.fname = 'First Name cannot be left blank'
    }

    //Last Name errors
    if (!inputs.lname) {
        errors.lname = 'Last Name cannot be left blank'
    }

    //Email errors
    if (!inputs.email) {
        errors.email = 'Email cannot be left blank'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(inputs.email)) {
        errors.email = 'Please enter a valid email address'
    }

    //Password errors
    if (!inputs.password) {
        errors.password = 'Password cannot be left blank'
    } else if (inputs.password.length < 8) {
        errors.password = 'Password must be at least 8 characters long'
    }

    //Confirm password errors
    if (inputs.password.length >= 8) {
        if (inputs.confirmPassword !== inputs.password) {
            errors.confirmPassword = 'Passwords must match'
        }
    }

    return errors

}

export default validate;