import * as React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { Seo } from './seo.js';
import '../styles/global.css';
import styled from 'styled-components';

const Header = styled.header`
  background: var(--black);
  color: var(--white);
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  a {
    color: inherit;
    display: inline-block;
    padding: 0.5rem;
    text-decoration: none;
  }
  a:hover,
  a:focus {
    background: var(--white);
    color: var(--black);
  }
`;

const Content = styled.main`
  margin: 3rem auto;
  max-width: 54ch;
`;

export default function Layout({
  children,
  title = false,
  description = false,
  image = false,
  path = false,
}) {
  const data = useStaticQuery(graphql`
    query GetSiteTitle {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const meta = data?.site?.siteMetadata ?? {};
  return (
    <>
      <Seo title={title} description={description} image={image} path={path} />
      <Header>
        <Link to="/">{meta.title}</Link>
        <nav>
          <Link to="/about">About</Link>
        </nav>
      </Header>
      <Content>{children}</Content>
    </>
  );
}
