import { React, useState, useEffect, useContext } from "react";
import { useParams, Redirect } from 'react-router-dom';

import UserContext from "./UserContext";
import JobList from "./JobList";
import JoblyApi from './api';
import Error from "./Error";

import "./CompanyInfo.css";

/**Renders company information. 
 * Calls API for company information.
 * 
 * Props: none
 * State: company = { handle, name, description, numEmployees, logoUrl }
 *        errors = [error1, ...]
 * Context: consumes UserContext
 * 
 * Routes -> CompanyInfo -> JobList
 * 
 * Location: /companies/:handle
 */
function CompanyInfo() {
    const [company, setCompany] = useState(null);
    const [errors, setErrors] = useState(null);
    const currUser = useContext(UserContext);

    const { handle } = useParams();

    //Upon initial render, set company to company result.
    useEffect(function getCompanyInfoOnMount() {
        async function getCompanyInfo() {
            try {
                console.log('fetch company is running - handle: ', handle)
                const companyResult = await JoblyApi.getCompany(handle);
                setCompany(companyResult);
            } catch (err) {
                setErrors(err);
            }
        }
        getCompanyInfo();
    }, []);

    if(!currUser) return <Redirect to="/"/>

    if (errors) return <Error errors={errors} />
    else if (!company) return <i>Loading...</i>
    else return (
        <div>
            <div className="company-header">
                <h2>{company.name}</h2>
                <p className="description">{company.description}</p>
            </div>
            {company.jobs.length === 0
                ? <h3>No jobs for {company}</h3>
                : <JobList jobList={company.jobs} />
            }
        </div>
    );
}

export default CompanyInfo;