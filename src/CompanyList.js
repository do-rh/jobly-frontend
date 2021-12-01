import React from "react";

import CompanyCard from './CompanyCard';

/**Renders list of companies. 
 * 
 * Props: companyList = [{ handle, name, description, numEmployees, logoUrl }, ...]
 * State: none
 * 
 * CompaniesContainer -> CompanyList -> CompanyCard
 * 
 */
function CompanyList({ companyList }) {
    return (
        companyList.map(
            company =>
                <CompanyCard
                    company={company}
                    key={company.handle}
                />)
    )
}

export default CompanyList;