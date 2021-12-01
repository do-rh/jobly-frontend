import React, { useState, useContext } from "react";

import UserContext from "./UserContext";
import FormField from "./FormField";
import Error from "./Error";

import "./Form.css";

/**Handles Profile Form 
 * 
 * Props: updateUserInfo - fn
 * State: formData, userInfoChanges - boolean,  errors - [err1, ...]
 * 
 * Routes -> ProfileForm
 */
function ProfileForm({ updateUserInfo }) {
    //TODO: Refactor to allow for redirection to homepage if context unavailable.
    //      potentially could add ProtectRoute component to redirect.
    const { username, firstName, lastName, email } = useContext(UserContext);
    const initialData = { username, firstName, lastName, email };

    const [formData, setFormData] = useState(initialData);
    const [userInfoChanges, setUserInfoChanges] = useState(false);
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
        const updateStatus = await updateUserInfo(formData);
        console.log('updateStatus', updateStatus);
        if (updateStatus === true) {
            console.log("updateStatus is a: ", updateStatus);
            setErrors(null);
            setUserInfoChanges(true);
        } else {
            console.log("errors is a: ...", updateStatus);
            setUserInfoChanges(false);
            setErrors(updateStatus);
        };
    }

    //Question: React says: A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component.
    return (
        <form className="ProfileForm" onSubmit={handleSubmit}>
            <div>
                <label htmlFor={'prof-form-username'}>Username</label>
                <input
                    id={'prof-form-username'}
                    name={'prof-form-username'}
                    value={formData.username}
                    onChange={handleChange}
                    disabled={true}
                />
            </div>
            <div>
                <label htmlFor={'prof-form-firstName'}>First Name </label>
                <input
                    id={'prof-form-firstName'}
                    name={'prof-form-firstName'}
                    value={formData.firstName}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor={'prof-form-lastName'}>Last Name </label>
                <input
                    id={'prof-form-lastName'}
                    name={'prof-form-lastName'}
                    value={formData.lastName}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor={'prof-form-email'}>Email </label>
                <input
                    id={'prof-form-email'}
                    name={'prof-form-email'}
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor={'prof-form-password'}>Password to update changes </label>
                <input
                    id={'prof-form-password'}
                    name={'prof-form-password'}
                    value={formData.password}
                    onChange={handleChange}
                    type={'password'}
                />
            </div>

            {(errors) ? <Error errors={errors} /> : null}
            {userInfoChanges && <h6>Changes Saved</h6>}
            <button className="btn btn-primary">Save Changes</button>
        </form>
    );
}

export default ProfileForm;

// <FormField
//                 inputName={"username"}
//                 inputValue={formData.username}
//                 labelName={"Username"}
//                 handleChange={handleChange}
//                 disabled={true} />
//             <FormField
//                 inputName={"firstName"}
//                 inputValue={formData.firstName}
//                 labelName={"First Name"}
//                 handleChange={handleChange} />
//             <FormField
//                 inputName={"lastName"}
//                 inputValue={formData.lastName}
//                 labelName={"Last Name"}
//                 handleChange={handleChange} />
//             <FormField
//                 inputName={"email"}
//                 inputValue={formData.email}
//                 labelName={"Email"}
//                 handleChange={handleChange} />
//             <FormField
//                 inputName={"password"}
//                 inputValue={formData.password}
//                 labelName={"Password"}
//                 handleChange={handleChange}
//                 type="password" />