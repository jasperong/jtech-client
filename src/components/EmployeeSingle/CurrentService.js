import React, { Fragment } from 'react';
import { Segment, Header } from 'semantic-ui-react';

import { m } from '../../utils';

const CurrentService = ({ currentService }) => {
  console.log(currentService);
  return (
    <Fragment>
      <Header as="h3">Current Service</Header>
      {currentService ? (
        <Segment>
          <Header as="h4">
            {currentService.office.alias}
            <Header.Subheader>
              {m(currentService.startTime).format('h A')} -{' '}
              {m(currentService.endTime).format('h A')}
            </Header.Subheader>
          </Header>
          <Header as="h5">
            Work Requested
            <Header.Subheader>{currentService.workRequested}</Header.Subheader>
          </Header>
          <Header as="h5">
            Work Done
            <Header.Subheader>{currentService.workDone}</Header.Subheader>
          </Header>
        </Segment>
      ) : (
        <Segment>
          <Header as="h4">No active service</Header>
        </Segment>
      )}
    </Fragment>
  );
};

export default CurrentService;
