/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllEpisodeQuery
// ====================================================

export interface AllEpisodeQuery_allEpisode_edges_node_data {
  episodeDate: any | null;
  episodeName: string | null;
  episodeUrl: string | null;
}

export interface AllEpisodeQuery_allEpisode_edges_node {
  id: string;
  data: AllEpisodeQuery_allEpisode_edges_node_data | null;
}

export interface AllEpisodeQuery_allEpisode_edges {
  node: AllEpisodeQuery_allEpisode_edges_node;
}

export interface AllEpisodeQuery_allEpisode {
  edges: AllEpisodeQuery_allEpisode_edges[];
}

export interface AllEpisodeQuery {
  allEpisode: AllEpisodeQuery_allEpisode;
}
