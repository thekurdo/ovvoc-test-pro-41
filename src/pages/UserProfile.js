import React from 'react';
import { useParams, useHistory } from 'react-router-dom';

// Inner component using hooks (v5 patterns)
function UserProfileInner(props, ref) {
  const { id } = useParams();
  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
  };

  const handleEditUser = () => {
    history.push(`/settings`);
  };

  return (
    <div ref={ref}>
      <h1>User Profile</h1>
      <p>User ID: {id}</p>
      <div>
        <h3>User Details</h3>
        <p>Name: User {id}</p>
        <p>Email: user{id}@example.com</p>
        <p>Role: {props.defaultRole}</p>
      </div>
      <button onClick={handleGoBack}>Go Back</button>
      <button onClick={handleEditUser}>Edit in Settings</button>
    </div>
  );
}

// React.forwardRef pattern
const UserProfile = /* TODO: forwardRef is no longer needed in React 19 - ref is a regular prop */UserProfileInner);

// defaultProps on forwardRef component
UserProfile.defaultProps = {
  defaultRole: 'viewer',
};

export default UserProfile;
