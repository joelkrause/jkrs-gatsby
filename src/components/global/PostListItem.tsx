import React from 'react';
import {Link} from 'gatsby'
import styled from 'styled-components'
import { format, formatDistance } from 'date-fns'

function PostListItem(props) {
    const post = props.post

    const date = (date: number | Date) => {
        return formatDistance(new Date(date), new Date(),{ addSuffix: true })
      }

    return (
        <PostItem to={`/${post.full_slug}`}>
            <PostName>{post.name}</PostName>
            <PostDate>{date(post.published_at)}</PostDate>
      </PostItem>
    );
}

export default PostListItem;

const PostItem = styled(props => <Link {...props} />)`
    display:flex;
    justify-content:space-between;
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

const PostName = styled.div`
    font-size:1.25rem;
`

const PostDate = styled.div`
    color:#ccc;
`