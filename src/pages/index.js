import * as React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import Layout from '../components/layout';
import styled from 'styled-components';

const Image = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  [data-gatsby-image-wrapper] {
    border: 3px solid var(--black);
    border-radius: 50%;
  }
`;

export default function IndexPage() {
  const data = useStaticQuery(graphql`
    query GetBlogPosts {
      allMdx(sort: { fields: frontmatter___date, order: DESC }) {
        nodes {
          slug
          id
          frontmatter {
            title
            date(fromNow: true)
          }
        }
      }
      allSanityEpisode(
        sort: { fields: date, order: DESC }
        filter: { youtubeID: { ne: null } }
        limit: 20
      ) {
        nodes {
          id
          title
          guest {
            name
          }
          gatsbyPath(filePath: "/episode/{SanityEpisode.slug__current}")
        }
      }
    }
  `);

  const posts = data.allMdx.nodes;
  const episodes = data.allSanityEpisode.nodes;
  return (
    <Layout>
      <Image>
        <StaticImage
          src="../images/ivana-la-61jg6zviI7I-unsplash.jpg"
          alt="a corgi sitting on a bed with red paper hearts all over it. it looks unamused."
          placeholder="blurred"
          width={300}
          height={300}
        />
      </Image>
      <h1>Hello frontend Masters!</h1>
      <Link to="/about">About this site</Link>
      <h2>Check out my recent blog posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={post.slug}>{post.frontmatter.title}</Link>{' '}
            <small>posted {post.frontmatter.date}</small>
          </li>
        ))}
      </ul>
      <h2>
        Latest episodes of <em>Learn With Jason</em>
      </h2>
      <ul>
        {episodes.map((episode) => (
          <li key={episode.id}>
            <Link to={episode.gatsbyPath}>
              {episode.title} (with {episode.guest?.[0]?.name})
            </Link>
          </li>
        ))}
      </ul>
      <a href="https://www.learnwithjason.dev/">
        Watch all episodes of <em>Learn With Jason</em>
      </a>
    </Layout>
  );
}
