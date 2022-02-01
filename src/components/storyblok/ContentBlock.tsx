import React from 'react';
import { render } from 'storyblok-rich-text-react-renderer';

const ContentBlock = ({blok}) => {
    return (
        <div className="content_block">
            {render(blok.content)}
        </div>
    );
};

export default ContentBlock;