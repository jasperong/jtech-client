import React, { Fragment } from 'react';
import { Segment, Header } from 'semantic-ui-react';

const CurrentService = ({ currentService }) => {
  console.log(currentService);
  return (
    <Fragment>
      <Header as="h3">Current Service</Header>
      {currentService ? (
        <Segment>
          <Header as="h4">
            {currentService && currentService.office.alias}
          </Header>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum,
          delectus? Est aliquid doloribus molestiae nemo, quibusdam ullam
          explicabo quod itaque, saepe, ipsa quos? Aut nostrum quos nisi,
          laboriosam hic sint?
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
