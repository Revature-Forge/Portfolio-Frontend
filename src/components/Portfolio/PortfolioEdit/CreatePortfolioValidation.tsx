const portfolioValidate = (inputs: any) => {
    const errors:{[key: string]: any} = {}

    //Portfolio name error
    if (!inputs.name) {
        errors.name = 'Portfolio Name cannot be left blank'
    }

    return errors

}

export default portfolioValidate;