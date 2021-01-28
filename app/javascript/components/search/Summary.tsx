import "./Summary.scss";

import React from 'react';

interface SummaryProps {
    totalCount: number
    searchTerm: string
}

export const Summary: React.FC<SummaryProps> = (props: SummaryProps) => {
    return (
        <div className="d-flex my-4 px-3">
            <div className="Search-Summary text-left">
                <div className="">
                    <span>Search for:&nbsp;</span>
                    <span className="Search-Term">{props.searchTerm}</span>
                </div>
                <div className="Search-Subtext">
                    found <span className="Search-Count">{props.totalCount}</span> buildpacks
                </div>
            </div>
        </div>
    );
}
