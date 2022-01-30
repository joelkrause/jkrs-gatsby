import React from 'react';
import {Link} from 'gatsby'
import styled from 'styled-components'


const PostListItem = ({post}) => {
    return (
        <PostItem to={`/${post.full_slug}`}>
            {post.content.post_icon &&
                <PostIcon>
                    <img src={post.content.post_icon} />
                </PostIcon>
            }
            <PostName>{post.name}</PostName>
      </PostItem>
    );
}

export default PostListItem;

const PostItem = styled(props => <Link {...props} />)`
    display:flex;
    align-items:center;
    padding:1.25rem 1rem;
    border-radius:3px;
    margin: 0 -1rem;

    &:hover {
        background:#f8f8f8;
        [data-color-scheme="light"] & {
            background:#f8f8f8;
        }
        [data-color-scheme="dark"] & {
            background:#333;
        }
    }

    &:not(:last-of-type){
        margin:0 -1rem 1rem;
    }
`

const PostIcon = styled.div`
    padding-right:1rem;
    img {
        width:35px;
        height:auto;
        display:block;
    }
`

const PostName = styled.div`
    font-size:1.25rem;
`

const PostDate = styled.div`
    color:#ccc;
    margin-left:auto;
`