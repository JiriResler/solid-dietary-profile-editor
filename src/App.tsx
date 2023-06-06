import React from 'react';
import Login from './Login';
import Profile from './Profile';

import {
  useSession,
} from "@inrupt/solid-ui-react";


const App: React.FC = () => {
  const { session } = useSession();

  return (
    <>
      <p>Is logged in: {session.info.isLoggedIn ? "true" : "false"}</p>
      {!session.info.isLoggedIn && <Login />}
      {session.info.isLoggedIn && <Profile/>}
    </>
  );
};

export default App;
