require("dotenv").config({
  path: `.env`,
})

module.exports = {
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true, // defaults to false
        jsxPragma: `jsx`, // defaults to "React"
        allExtensions: true, // defaults to false
      },
    },
    {
      resolve: `gatsby-source-graphql`,
      options: {
        fieldName: `Storyblok`,
        typeName: `storyblok`,
        url: `https://gapi.storyblok.com/v1/api`,
        headers: {
          Token: process.env.STORYBLOK_TOKEN,
          Version: process.env.STORYBLOK_VERSION,
        },
      },
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
