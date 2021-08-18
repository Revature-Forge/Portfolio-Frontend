import React from 'react';
import { useCookies } from 'react-cookie';
import useForm from './CreatePortfolioHook';
import portfolioValidate from './CreatePortfolioValidation';

const CreatePortfolio = () => {

    const [cookies] = useCookies()

    const {inputs, handleInputChange, handleSubmit, errors} = useForm({name: '', user: cookies['user']}, portfolioValidate)

    const error: {[key: string]: any} = errors

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h6>Portfolio Name</h6>
                <input type="text" name="name" id="name" className="form-input" onChange={handleInputChange} value={inputs.name} />
                {error.name && <p>{error.name}</p>}
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default CreatePortfolio;