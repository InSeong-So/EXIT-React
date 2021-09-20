import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css'
import Head from 'next/head';

React.useLayoutEffect = useEffect;

const Root = ({ Component }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>ParangChat</title>
      </Head>
      <Component />
    </>
  )
}

// 안정성을 높이기 위해
Root.propTypes = {
  Component: PropTypes.elementType.isRequired,
}

export default Root