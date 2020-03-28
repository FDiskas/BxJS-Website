/* eslint-disable @typescript-eslint/no-var-requires */
const path = require(`path`);
require('ts-node').register({ files: true });
exports.createPages = async ({ actions: { createPage }, graphql }) => {
  // mdx news rendering
  const episodeTemplate = path.resolve('./src/templates/episode.tsx');
  const episodesResult = await graphql(`
    {
      allEpisode {
        distinct(field: data___episodeUrl)
      }
    }
  `);
  if (episodesResult.errors) {
    return Promise.reject(episodesResult.errors);
  }
  episodesResult.data.allEpisode.distinct.forEach((episodeUrl) => {
    createPage({
      path: episodeUrl,
      component: episodeTemplate,
      context: {},
    });
  });
  return Promise.resolve();
};
