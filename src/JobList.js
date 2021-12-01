import React, { useState, useContext } from "react"; //will be needed for application functionality
import JobCard from "./JobCard";
// import UserContext from "./UserContext";
// import JoblyApi from './api';

/**Renders list of jobs. 
 * 
 * Props: [{ id, title, salary, equity, companyHandle, companyName }, ...]
 * State: none
 * 
 * (JobsContainer, CompanyInfo) -> JobList -> JobCard
 * 
 */
function JobList({ jobList }) {
    return (

        jobList.map(
            job => <JobCard job={job} key={job.id} />)
    );
}

export default JobList;

//TODO FINISH APPLICATION FUNCTIONALITY
    // const user = useContext(UserContext);
    // async function getInitialJobs() {
    //     return await JoblyApi.getUserJobs(user.username);
    // }
    // //1) Determine what API is giving back for .jobs / .applications? (should be job_id)
    // //2) Create new set for lookup
    // //3) Create handleApply function to pass down to jobCard
    //     //a) API call to add to applications for user
    //     //b) Either re-call the api or, could use an effect. tbd.

    // const [userJobList, setUserJobList] = useState(getInitialJobs());

            // FIXME
        //ConsumeContext(username) --> getJobsApplied --> make as Set
        //State: Get list of jobs user has applied to

        //fn to call the api to apply
        //appStatus: true/false as prop to JobCard

        // if job user applied to in job list
            // pass in true to applied prop
        // else
            // pass in false to applied prop
        // add applied prop to JobCard