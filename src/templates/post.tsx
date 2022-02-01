import React, {useState, useEffect, useReducer } from 'react';
import styled from "styled-components"
import axios from 'axios'
import { formatDistance } from 'date-fns'
import { render } from 'storyblok-rich-text-react-renderer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'

import { breakpoints, colours } from '../styles/styled-components/variables';
 
import Layout from "../templates/layout"
 
const Page = ({ pageContext, location }) => {
    const [state, setState] = useState({
        likes:0,
        usersLikes:[],
        inProgress:false,
        disableLike:false
    })

    // const [state, dispatch] = useReducer(reducer, initialState);

    let story = pageContext.story

    useEffect(() => {
        const localStorage = window.localStorage
        if(localStorage.getItem('user-likes')){
            setStateValue('usersLikes', localStorage.getItem('user-likes').split(','))
        }
        axios.post(`${process.env.GATSBY_FIREBASE}/getLikes`,{post:story.uuid}).then(res => {
            if(res.data.likes){
                setStateValue('likes',res.data.likes)
            }
        }).catch(error => {
            console.log(error)
        })
    }, [])

    const updateLikes = async () => {
        setStateValue('inProgress',true)
        await axios.post(`${process.env.GATSBY_FIREBASE}/updateLike`,{post:story.uuid}).then(res => {
            setStateValue('likes',res.data.likes)
            if(!state.usersLikes.includes(story.uuid)){
                const likes = [...state.usersLikes, story.uuid]
                console.log(likes)
                setStateValue('usersLikes',likes)
                localStorage.setItem('user-likes',likes.join(','))
            }
            setStateValue('disableLike',true)
            setStateValue('inProgress',false)
        }).catch(error => {
            setStateValue('inProgress',false)
            console.log(error)
        })
    }

    const setStateValue = (id,value) => {
        console.log(id)
        console.log(value)
        console.log(JSON.stringify(state,null,2))
        setState({
            ...state,
            [id]: value,
        });
        console.log(JSON.stringify(state,null,2))
    }

    const date = (date: number | Date) => {
        return formatDistance(new Date(date), new Date(),{ addSuffix: true })
    }
 
    return (
        <Layout>
            <PostHero>
                <div className="container">
                    {story.content.post_icon && 
                        <PostHeroIcon>
                            <img src={story.content.post_icon} />
                        </PostHeroIcon>
                    }
                    <PostHeroMeta>
                        <PostDate>Last updated: {date(story.published_at)}</PostDate>
                        <button onClick={() => updateLikes()} className={`${state.inProgress ? 'in-progress' : ''} ${state.disableLike ? 'liked' : 'not-liked'}`}><FontAwesomeIcon icon={state.disableLike ? faHeartSolid : faHeart} /> {state.likes}</button>
                    </PostHeroMeta>
                    <PostTitle>{story.name}</PostTitle>
                    {story.content.excerpt && 
                        <PostExcerpt>{render(story.content.excerpt)}</PostExcerpt>
                    }
                    <pre>{JSON.stringify(state,null,2)}</pre>
                </div>
                {story.content.post_hero && 
                    <div className="container--large">
                        <PostHeroImage>
                            <img src={story.content.post_hero} />
                        </PostHeroImage>
                    </div>
                }
            </PostHero>
            <PostContent>
                <div className="container">
                    {render(story.content.body)}
                </div>
            </PostContent>
            <pre>{JSON.stringify(story,null,2)}</pre>
        </Layout>
    )
}
 
export default Page

const PostHero = styled.div`
    padding: 2rem 0;

    @media (min-width: ${breakpoints.xl}){
        padding:4rem 0;
    }
`

const PostHeroIcon = styled.div`
    margin:0 0 2rem;

    img {
        width:45px;
        height:auto;
        display:block;
    }
`

const PostHeroMeta = styled.div`
    display:flex;
    align-items:center;
    margin:0 0 1rem;

    button {
        transition: all 0.25s;
        opacity:1;

        &.in-progress {
            pointer-events:none;
            opacity:0.5;
        }

        &.liked {
            /* color:red; */
            pointer-events: none;
        }
    }
`

const PostDate = styled.div`
    color:#ccc;
    padding:0 1rem 0 0;
`

const PostTitle = styled.h1``

const PostExcerpt = styled.p``

const PostHeroImage = styled.div`
    margin:4rem 0 2rem;
    text-align:center;
    img {
        display:block;
        width:100%;
        height:auto;
    }
`

const PostContent = styled.article`
    padding:5vw 10vw;
`