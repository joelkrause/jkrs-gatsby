import React from 'react';

// Components
import ContentBlock from './ContentBlock';

const Components = {
    'content_block': ContentBlock,
  }

const ComponentLoader = ({blok}) => {
   if (typeof Components[blok.component] !== 'undefined') {
     const Component = Components[blok.component]
     return (<div><Component blok={blok} /></div>)
   }
   return (<p>The component <strong>{blok.component}</strong> has not been created yet.</p>)        
};

export default ComponentLoader;