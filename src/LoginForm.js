import React, { useState } from "react";
import { Redirect } from 'react-router-dom';

import FormField from "./FormField";
import Error from "./Error";

import "./Form.css";

/**Handles user login 
 * 
 * Props: loginUser fn, isAuthed = Boolean
 * State: formData, [error1, ...]
 * 
 * Routes -> LoginForm
 */
function LoginForm({ loginUser, isAuthed }) {

    const initialData = { username: "", password: "" }
    const [formData, setFormData] = useState(initialData);

    const [errors, setErrors] = useState(null);

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(fData => ({
            ...fData,
            [name]: value,
        }));
    }

    //could move the try catch here
    async function handleSubmit(evt) {
        evt.preventDefault();
        console.log('formdata in handleSubmit is', formData)
        const loginStatus = await loginUser(formData);
        console.log('loginStatus', loginStatus)
        if (loginStatus === true) {
            setErrors(null);
        } else {
            setErrors(loginStatus);
        };
    }
    console.log({ isAuthed });
    // console.log('isAuth in LoginForm', isAuthed);
    if (isAuthed) return <Redirect to="/companies" />;

    return (
        <form className="LoginForm" onSubmit={handleSubmit}>
            <FormField
                inputName={"username"}
                inputValue={formData.username}
                labelName={"Username"}
                handleChange={handleChange}
            />
            <FormField
                inputName={"password"}
                inputValue={formData.password}
                labelName={"Password"}
                handleChange={handleChange}
                type="password"
            />
            {(errors) ? <Error errors={errors} /> : null}
            <button className="btn btn-info font-weight-bold">Login</button>
        </form>
    );
}

export default LoginForm;