import React from 'react';
import { Message } from 'semantic-ui-react';

const SuccessMessage = ({ message = '' }) => (
  <Message success>
    <Message.Content>{message}</Message.Content>
  </Message>
);

export default SuccessMessage;
