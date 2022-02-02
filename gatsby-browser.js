import React from 'react';
import Layout from './src/templates/layout.tsx'

export const wrapPageElement = ({ element, props }) => {
    return <Layout {...props}>{element}</Layout>;
};