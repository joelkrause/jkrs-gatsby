import { PageProps, useStaticQuery, graphql, Link } from 'gatsby';
import React, {useState} from 'react';
import _ from 'underscore';
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import Layout from "../templates/layout"
import PostListItem from "../components/global/PostListItem"
import PostGroup from "../components/global/PostGroup"
import { breakpoints, colours } from '../styles/styled-components/variables';


const PostsPage: React.FC<PageProps> = () => {
  const [activeTags, setTag] = useState([]);
  
  const setTags = (tag: string) => {
    if(!activeTags.includes(tag)){
      setTag([...activeTags,tag])
    } else {
      const tags = [...activeTags]
      const findIndexOfTag = tags.indexOf(tag)

      if (findIndexOfTag > -1) {
        tags.splice(findIndexOfTag, 1);
      }
      setTag(tags)
    }
  }

  const clearTags = () => {
    setTag([])
  }

  const resultsToShow = (items) => {
    if(activeTags.length){
      const posts = [...items]
      console.log(posts)
      return posts.filter(item => item.content?.categories.some(category => activeTags.find(el => el.uuid === category.uuid)))
    } else {
      return items
    }
  }

  const groupByYear = (items) => {
    const group = _.groupBy(items, function(item) {
        return new Date(item.first_published_at).getFullYear();
    })
    return group
  }

  const isTagActive = (tag) => {
    if(activeTags.find(el => el.uuid === tag.uuid)){
      return true
    }
    return false
  }

const data = useStaticQuery(graphql`
  query Posts {
    Storyblok {
      PostItems {
        items {
          full_slug
          name
          published_at
          first_published_at
          content {
            body
            component
            excerpt
            likes
            post_hero
            post_icon
            categories {
              uuid
              name
            }            
          }
        }
      }
      CategoryItems {
        items {
          name
          uuid
        }
      }      
    }
  }
`)

  return (
  <>
    <PostsHero>
      <div className="container">
        <PostsTitle>
          Articles
        </PostsTitle>
        <PostSearch>
          <FontAwesomeIcon icon={faSearch} />
          <input type="text" />
        </PostSearch>        
        <PostTags>
        <PostTagsList>
          {data.Storyblok.CategoryItems.items.map(node => {
            return (
              <PostTagsListItem key={node.uuid}>
                <button type="button" onClick={() => setTags(node)} className={isTagActive(node) ? 'active' : ''}>
                  {node.name}
                </button>
              </PostTagsListItem>    
            )
          })}
          {activeTags.length > 0 &&
            <PostTagsListItem>
              <button type="button" className="clear" onClick={() => clearTags()}>
                <FontAwesomeIcon icon={faTimesCircle} />Clear Filters
              </button>
            </PostTagsListItem>
          }                    
        </PostTagsList>
        </PostTags>
      </div>
    </PostsHero>
    <PostsGrid>
      <div className="container">
        {_.map(groupByYear(resultsToShow(data.Storyblok.PostItems.items)),function(items,year){
          return (
            <PostGroup key={year} showButton="false" posts={resultsToShow(items)} heading={year} layout="list" />
          )
        })}
      </div>
    </PostsGrid>
  </>
  )
}

export default PostsPage

const PostsHero = styled.div`
  padding:2rem 0;
`

const PostsTitle = styled.h1``

const PostTags = styled.div``

const PostTagsList = styled.ul`
  display:flex;
  align-items:center;
  justify-content:flex-start;
`

const PostsGrid = styled.div``

const PostTagsListItem = styled.li`
  &:not(:last-of-type){
    margin-right:1rem;
  }

  button {
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

    &.clear{ 
      svg {
        margin:0 0.3rem 0 0;
      }
    }

    &.active {
      background-color: blue
    }
  }
`

const PostSearch = styled.div`
  display:none;
  margin:0 0 2.5rem;
  position: relative;
  width:50%;

  svg {
    position:absolute;
    top:50%;
    left:15px;
    z-index:1;
    transform:translateY(-50%);
  }

  input {
    background-color:var(--inputBackground);
    font-size:1.25rem;
    color:var(--inputColor);
    padding:1rem;
    border-radius:3px;
    width:100%;
    padding-left:2.5rem;
  }
`