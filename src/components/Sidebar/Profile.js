import React from 'react';
import { Image, MenuItem } from 'semantic-ui-react';

const Profile = () => {
  return (
    <MenuItem>
      <Image
        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        size="tiny"
        circular
        centered
        spaced
      />
      <h5>Jasper Ong</h5>
    </MenuItem>
  );
};

export default Profile;
