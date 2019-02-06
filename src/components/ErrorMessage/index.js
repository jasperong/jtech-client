import React from 'react';
import { Message } from 'semantic-ui-react';
const ErrorMessage = ({ error = '' }) => (
  <Message error>
    <Message.Content>{error}</Message.Content>
  </Message>
);

export default ErrorMessage;
