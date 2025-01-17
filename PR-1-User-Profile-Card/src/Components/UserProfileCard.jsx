import React from "react";
import "./UserProfileCard.css";

const UserProfileCard = ({ 
  name,email,profilePic,phone,address,age,company,website,bio}) => {
  return (
    <div className="profile-card">
      {/* Profile Picture */}
      {profilePic ? (
        <img 
          src={profilePic} 
          alt={`${name}'s Profile`} 
          className="profile-card-image" 
        />
      ) : (
        <div className="profile-card-placeholder">No Image Available</div>
      )}

      <div className="profile-card-content">
        <h2 className="profile-card-name">{name}</h2>
        <p className="profile-card-email">{email}</p>
        {bio && <p className="profile-card-bio">{bio}</p>}

        <div className="profile-card-details">
          {phone && <p><strong>Phone:</strong> {phone}</p>}
          {age && <p><strong>Age:</strong> {age}</p>}
          {company && <p><strong>Company:</strong> {company}</p>}
          {address && <p><strong>Address:</strong> {address}</p>}
          {website && (
            <p>
              <strong>Website:</strong>{" "}
              <a 
                href={website} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                {website}
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
