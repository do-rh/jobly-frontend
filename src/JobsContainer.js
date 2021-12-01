import React, { useEffect, useState, useContext } from "react";
import { Redirect } from "react-router-dom";

import UserContext from "./UserContext";
import SearchForm from './SearchForm';
import JobList from './JobList';
import JoblyApi from "./api";
import Error from "./Error";

import "./JobsContainer.css";

/**Renders list of jobs. 
 * Calls API for list of jobs.
 * 
 * Props: none
 * State: jobList = [{ id, title, salary, equity, companyHandle, companyName }, ...]
 *        searchTerm = "searchTerm for job title"
 *        errors = [error1, ...]
 * Context: Consumes UserContext
 * 
 * Routes -> JobsContainer -> JobList
 * 
 * Location: /jobs
 */
function JobsContainer() {
    const [jobList, setJobList] = useState(null);
    const [searchTerm, setSearchTerm] = useState(null);
    const [errors, setErrors] = useState(null);

    const currUser = useContext(UserContext);

    //Upon searchTerm Change, sets companyList
    useEffect(function fetchJobsWhenMounted() {
        async function fetchJobs() {
            try {
                const jobsResult = await JoblyApi.getJobs(searchTerm);
                setJobList(jobsResult);
            } catch (err) {
                setErrors(err);
            }
        }
        fetchJobs();
    }, [searchTerm]);

    if(!currUser) return <Redirect to="/"/>

    //handles job search in SearchForm
    function handleSearch(search) {
        setSearchTerm(search);
    }

    if (errors) return <Error errors={errors}/>
    else if (!jobList) return <i>Loading...</i>
    else return (
        <div className="JobsContainer">
            <SearchForm handleSearch={handleSearch} />
            {jobList.length === 0
                ? <h3>No jobs, come again later</h3>
                : <JobList jobList={jobList} />
            }
        </div>

    );
}

export default JobsContainer;
