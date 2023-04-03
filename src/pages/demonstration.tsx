import React from 'react';
import Container from '~/components/container';
import DemonstrationCom from '~/components/demonstration';
import Head from 'next/head';

const Demonstration = () => {
  return (
    <>
      <Head>
        <title>Form</title>
      </Head>
      <Container>
        <DemonstrationCom />
      </Container>
    </>
  );
};

export default Demonstration;
