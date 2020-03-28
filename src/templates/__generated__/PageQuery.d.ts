/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PageQuery
// ====================================================

export interface PageQuery_allEpisode_edges_node_data_links {
  category: string | null;
  title: string | null;
  urls: string | null;
  urlsSet: (string | null)[] | null;
}

export interface PageQuery_allEpisode_edges_node_data {
  episodeName: string | null;
  episodeUrl: string | null;
  episodeDate: any | null;
  filename: string | null;
  links: (PageQuery_allEpisode_edges_node_data_links | null)[] | null;
}

export interface PageQuery_allEpisode_edges_node {
  id: string;
  data: PageQuery_allEpisode_edges_node_data | null;
}

export interface PageQuery_allEpisode_edges {
  node: PageQuery_allEpisode_edges_node;
}

export interface PageQuery_allEpisode {
  edges: PageQuery_allEpisode_edges[];
}

export interface PageQuery {
  allEpisode: PageQuery_allEpisode;
}

export interface PageQueryVariables {
  path: string;
}
