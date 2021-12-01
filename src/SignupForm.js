import React, { useState } from "react";
import { Redirect } from 'react-router-dom';

import FormField from "./FormField";
import Error from "./Error";

import "./Form.css";

/**Handles user signup 
 * 
 * Props: signupUser - fn, isAuthed - boolean
 * State: formData, errors - [err1, ...]
 * 
 * Routes -> SignupForm
 */
function SignupForm({ signupUser, isAuthed }) {
    const initialData = { username: "", password: "", firstName: "", lastName: "", email: "" }
    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState(null);

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(fData => ({
            ...fData,
            [name]: value,
        }));
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        const signupStatus = await signupUser(formData);
        if (signupStatus === true) {
            setErrors(null);
        } else {
            setErrors(signupStatus);
        };
    }

    if (isAuthed) return <Redirect to="/companies" />;

    return (
        <form className="SignupForm" onSubmit={handleSubmit}>
            <FormField
                inputName={"username"}
                inputValue={formData.username}
                labelName={"Username"}
                handleChange={handleChange}
            />
            <FormField
                inputName={"firstName"}
                inputValue={formData.firstName}
                labelName={"First Name"}
                handleChange={handleChange} />
            <FormField
                inputName={"lastName"}
                inputValue={formData.lastName}
                labelName={"Last Name"}
                handleChange={handleChange} />
            <FormField
                inputName={"email"}
                inputValue={formData.email}
                labelName={"Email"}
                handleChange={handleChange} />
            <FormField
                inputName={"password"}
                inputValue={formData.password}
                labelName={"Password"}
                handleChange={handleChange}
                type="password" />
            {(errors) ? <Error errors={errors} /> : null}            
            <button className="btn btn-primary">Sign Up!</button>
        </form>
    );
}

export default SignupForm;
