import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

const withLoader = (WrappedComponent) => (
  <div>
    <Dimmer active>
      <Loader text="Loading..." />
    </Dimmer>
    <WrappedComponent />
  </div>
);

export default withLoader;
