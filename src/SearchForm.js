import React, {useState} from "react";

import "./SearchForm.css";

/**Handles Form Queries. 
 * 
 * Props: handleSearch fn
 * State: searchTerm = "searchTerm"
 * 
 * (CompaniesContainer, JobsContainer) -> SearchForm
 */
function SearchForm({handleSearch}) {
 const [searchTerm, setQuery] = useState("");

 function handleChange(evt) {
   setQuery(evt.target.value);
 }
 
 function handleSubmit(evt) {
   evt.preventDefault();
   handleSearch(searchTerm);
 }

 return (
     <form className="SearchForm" onSubmit={handleSubmit}>
       <input
           id="searchTerm"
           name="searchTerm"
           placeholder="Enter Search Term..."
           value={searchTerm}
           onChange={handleChange}
       />
       <button className="btn btn-primary">Search</button>
     </form>
 );
}

export default SearchForm;