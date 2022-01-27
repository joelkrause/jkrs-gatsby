const path = require('path')

// Create blog pages dynamically
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve('src/templates/post.tsx')
  const result = await graphql(`
  query Posts {
    Storyblok {
      PostItems {
        items {
          full_slug
          name
          published_at
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
    }
  }
  `)
  result.data.Storyblok.PostItems.items.forEach(node => {
    createPage({
      path: `${node.full_slug}`,
      component: blogPostTemplate,
      context: {
        story: node
      },
    })
  })
}