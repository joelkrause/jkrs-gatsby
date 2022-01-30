import React, {useState, useEffect } from 'react';
import styled from "styled-components"
import axios from 'axios'
import { formatDistance } from 'date-fns'
import { render } from 'storyblok-rich-text-react-renderer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'

import { breakpoints, colours } from '../styles/styled-components/variables';
 
import Layout from "../templates/layout"
 
const Page = ({ pageContext, location }) => { 
    const [likes, setLikes] = useState(0);
    let story = pageContext.story

    useEffect(() => {
        axios.post('http://localhost:5001/jkrs-dev/us-central1/getLikes',{post:story.uuid}).then(res => {
            if(res.data.likes){
                setLikes(res.data.likes)
            }
        }).catch(error => {
            console.log(error)
        })        
    })

    const updateLikes = async () => {
        await axios.post('http://localhost:5001/jkrs-dev/us-central1/updateLike',{post:story.uuid}).then(res => {
            setLikes(res.data.likes)
        }).catch(error => {
            console.log(error)
        })
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
                        <button onClick={() => updateLikes()}><FontAwesomeIcon icon={faHeart} /> {likes ? likes : 0}</button>
                    </PostHeroMeta>
                    <PostTitle>{story.name}</PostTitle>
                    {story.content.excerpt && 
                        <PostExcerpt>{render(story.content.excerpt)}</PostExcerpt>
                    }
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