import React, { memo } from 'react';
import Container from '~/components/container';
import DemonstrationCom from '~/components/demonstration';

const Demonstration = memo((props) => {
  return (
    <Container>
      <DemonstrationCom />
    </Container>
  );
});

export default Demonstration;
