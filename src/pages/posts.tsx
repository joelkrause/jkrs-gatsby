import { PageProps } from 'gatsby';
import React from 'react';
import Layout from "../templates/layout"

const PostsPage: React.FC<PageProps> = () => (
  <Layout>
    <h1>
      posts
    </h1>
  </Layout>
)

export default PostsPage