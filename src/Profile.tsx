import React from 'react';

import {
  useSession,
} from "@inrupt/solid-ui-react";


const Profile: React.FC = () => {
  const { session } = useSession();

  return (
    <>
      <p>Logged in</p>
    </>
  );
};

export default Profile;