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
            <PostTags>
                {post.content.categories.map(node => {
                    return (
                        <PostTag>
                            {node.name}
                        </PostTag>
                    )
                })}
            </PostTags>
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
    transition: all 0.25s;

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
    padding-right:1.5rem;
    img {
        width:35px;
        height:auto;
        display:block;
    }
`

const PostName = styled.div`
    font-size:1.25rem;
    margin:0 1rem 0;
    line-height: 1;
`

const PostTags = styled.div`
    display:flex;
    align-items:center;
    gap:10px;
    margin-left: auto;
`

const PostTag = styled.div`
    color:#fff;
    padding:0.3rem 0.5rem;
    font-size:0.975rem;
    line-height:1;
    border-radius:3px;
    display:flex;
    align-items:center;

    [data-color-scheme="light"] & {
      background-color:#ccc;
    }
    [data-color-scheme="dark"] & {
        background:#333;
    }
`