import 'bootstrap/dist/css/bootstrap.min.css';
import validate from './FormValidation';
import useForm from './ValidationHook';

const AccountRegistration = ({ hideModal } : any) => {

    const {inputs, handleInputChange, handleSubmit, errors} = useForm({fname:'', lname:'', email:'', password:'', confirmPassword: ''}, validate, hideModal)

    const error: {[key: string]: any} = errors

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h6>First Name</h6>
                <input type="text" name="fname" id="fname" className="form-input" onChange={handleInputChange} value={inputs.fname} />
                {error.fname && <p style={{color:"red"}}>{error.fname}</p>}
                <h6>Last Name</h6>
                <input type="text" name="lname" id="lname" className="form-input" onChange={handleInputChange} value={inputs.lname} />
                {error.lname && <p style={{color:"red"}}>{error.lname}</p>}
                <h6>Email Address</h6>
                <input type="text" name="email" id="email" className="form-input" onChange={handleInputChange} value={inputs.email} />
                {error.email && <p style={{color:"red"}}>{error.email}</p>}
                <h6>Password</h6>
                <input type="password" name="password" id="passwrod" className="form-input" onChange={handleInputChange} value={inputs.password} />
                {error.password && <p style={{color:"red"}}>{error.password}</p>}
                <h6>Confirm Password</h6>
                <input type="password" name="confirmPassword" id="confirmPassword" className="form-input" onChange={handleInputChange} value={inputs.confirmPassword} />
                {error.confirmPassword && <p style={{color:"red"}}>{error.confirmPassword}</p>}
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
};

export default AccountRegistration;