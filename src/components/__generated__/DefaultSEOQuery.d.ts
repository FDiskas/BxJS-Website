/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DefaultSEOQuery
// ====================================================

export interface DefaultSEOQuery_site_siteMetadata {
  title: string | null;
  description: string | null;
  author: string | null;
}

export interface DefaultSEOQuery_site {
  siteMetadata: DefaultSEOQuery_site_siteMetadata | null;
}

export interface DefaultSEOQuery {
  site: DefaultSEOQuery_site | null;
}
