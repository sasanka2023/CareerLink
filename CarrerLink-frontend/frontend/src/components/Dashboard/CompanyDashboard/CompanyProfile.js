import React from 'react';

const CompanyProfile = ({ name, description, profilePic, coverPic }) => {
    return (
        <section className="company-profile">
            <div className="cover-photo">
                <img src={coverPic} alt="Cover Photo" />
            </div>

            <div className="profile-info">
                <div className="profile-picture">
                    <img src={profilePic} alt="Profile Picture"/>
                </div>
                <div className="company-details">
                    <h1>{name}</h1>
                    <p>{description}</p>
                </div>
            </div>
        </section>
    );
};

export default CompanyProfile;

