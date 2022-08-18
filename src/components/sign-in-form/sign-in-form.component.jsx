import { useState } from "react";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  LogInAuthUserWithEmailAndPassword,
} from "../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await LogInAuthUserWithEmailAndPassword(email, password);
      // setCurrentUser(user);
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        alert("Email ID not found, Sign-up Instead!");
      }
      if (error.code === "auth/wrong-password") {
        alert("Wrong Password!");
      }
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  return (
    <div className='sign-in-container'>
      <h2>Already have an account?</h2>
      <span>Sign in with your E-mail</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='E-mail'
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        />

        <FormInput
          label='Password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        />

        <div className='buttons-container'>
          <Button type='submit'>SIGN IN</Button>
          <Button type='button' buttonType='google' onClick={signInWithGoogle}>
            GOOGLE SIGN IN
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
