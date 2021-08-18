const loginValidate = (inputs: any) => {
  const errors: { [key: string]: any } = {};

  //Email errors
  if (!inputs.email) {
    errors.email = "Email cannot be left blank";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(inputs.email)) {
    errors.email = "Please enter a vaild email address";
  }

  //Password errors
  if (!inputs.password) {
    errors.password = "Password cannot be left blank";
  } else if (inputs.password.length < 8) {
    errors.password = "Password must be at least 8 characters long";
  }

  return errors;
};

export default loginValidate;
