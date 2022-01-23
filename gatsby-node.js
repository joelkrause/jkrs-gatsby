const path = require('path')
 
 exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions
 
    return new Promise((resolve, reject) => {
        const storyblokEntry = path.resolve('src/templates/post.tsx')
    
        resolve(
          graphql(
            `{
              stories: allStoryblokEntry(filter: {field_component: {eq: "post"}}) {
                edges {
                    node {
                        name
                        full_slug
                        published_at
                        content
                    }
                }
              }
            }`
          ).then(result => {
            if (result.errors) {
              console.log(result.errors)
              reject(result.errors)
            }
    
            const entries = result.data.stories.edges

            entries.forEach((entry) => {
                console.log(entry.node.name)
                const page = {
                    path: `/${entry.node.full_slug}`,
                    component: storyblokEntry,
                    context: {
                        story: entry.node
                    }
                }
                createPage(page)
            })
          })
        )
      })
 }