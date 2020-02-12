module.exports = {
  siteMetadata: {
    title: 'Graph Ghost!',
    author: 'Casey Smith',
    description: 'Generate GraphQL Schema and Resolvers on the fly, instantly.',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/assets/images/logo.svg',
      },
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-offline',
  ],
}
