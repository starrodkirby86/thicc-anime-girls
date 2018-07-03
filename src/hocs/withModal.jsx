import React from 'react';
import { Modal } from 'semantic-ui-react';

const withModal = (WrappedContent) => (
  (props) => {
    const { trigger, ...rest } = props;
    return (
      <Modal trigger={trigger} closeIcon>
        <Modal.Content>
          <WrappedContent {...rest} />
        </Modal.Content>
      </Modal>
    );
  }
);

export default withModal;