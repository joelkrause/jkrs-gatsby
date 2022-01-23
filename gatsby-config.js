module.exports = {
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true, // defaults to false
        jsxPragma: `jsx`, // defaults to "React"
        allExtensions: true, // defaults to false
      },
    },
    {
      resolve: 'gatsby-source-storyblok',
      options: {
        accessToken: 'sZUcBEZiCUQNtT3CQAZrzgtt',
        version: 'draft',
        // languages: ['de', 'at'] // Optional parameter. Omission will retrieve all languages by default.
      }
    }    
    // {
    //   resolve: "gatsby-plugin-prettier-eslint",
    //   options: {
    //     prettier: {
    //       patterns: [
    //         // the pattern "**/*.{js,jsx,ts,tsx}" is not used because we will rely on `eslint --fix`
    //         "**/*.{css,scss,less}",
    //         "**/*.{json,json5}",
    //         "**/*.{graphql}",
    //         "**/*.{md,mdx}",
    //         "**/*.{html}",
    //         "**/*.{yaml,yml}",
    //       ],
    //     },
    //     eslint: {
    //       patterns: "**/*.{js,jsx,ts,tsx}",
    //       customOptions: {
    //         fix: true,
    //         cache: true,
    //       },
    //     },
    //   },
    // }    
  ],  
}
