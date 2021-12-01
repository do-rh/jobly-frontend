import React from "react";

/** Renders error view component
 *  Props: [error1, error2, ...]
 *  State: none
 *  
 *  (CompaniesContainer, JobsContainer, CompanyInfo) -> Error
 */
function Error({ errors }) {
    return (
        <div>
            <b>Error fetching data:</b>
            <ul>
                {errors.map((error, idx) => (<li key={idx}>{error}</li>))}
            </ul>
        </div>
    )
}

export default Error;