import React from 'react';
import {
  MdExitToApp,
} from 'react-icons/md';
import {
  ListGroupItem,
} from 'reactstrap';

import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  <ListGroupItem tag="button" action className="border-light" onClick={firebase.doSignOut}>
    <MdExitToApp /> Signout
  </ListGroupItem>
);

export default withFirebase(SignOutButton);
