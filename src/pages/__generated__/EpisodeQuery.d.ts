/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: EpisodeQuery
// ====================================================

export interface EpisodeQuery_allEpisode_edges_node_data_links {
  category: string | null;
  title: string | null;
  urls: string | null;
  urlsSet: (string | null)[] | null;
}

export interface EpisodeQuery_allEpisode_edges_node_data {
  episodeUrl: string | null;
  episodeName: string | null;
  filename: string | null;
  episodeDate: any | null;
  links: (EpisodeQuery_allEpisode_edges_node_data_links | null)[] | null;
}

export interface EpisodeQuery_allEpisode_edges_node {
  data: EpisodeQuery_allEpisode_edges_node_data | null;
  id: string;
}

export interface EpisodeQuery_allEpisode_edges {
  node: EpisodeQuery_allEpisode_edges_node;
}

export interface EpisodeQuery_allEpisode {
  edges: EpisodeQuery_allEpisode_edges[];
}

export interface EpisodeQuery {
  allEpisode: EpisodeQuery_allEpisode;
}
