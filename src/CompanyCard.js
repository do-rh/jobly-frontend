import React from "react";
import { Link } from 'react-router-dom';

import './CompanyCard.css';

/**Renders company card 
 * 
 * Props: company = { handle, name, description, numEmployees, logoUrl }
 * State: none
 * 
 * CompaniesContainer -> CompanyList -> CompanyCard
 * 
 */

function CompanyCard({ company }) {
    const { name, description, logoUrl, handle } = company;
    return (
        <Link to={`/companies/${handle}`}>
            <div className="Card shadow-sm p-3 mb-5 rounded">
                <h3 className="header">
                    {name}
                    {logoUrl && <img src={logoUrl} alt={`${name} logo`} />}
                </h3>
                <p>{description}</p>
            </div>
        </Link>
    );
}

export default CompanyCard;
