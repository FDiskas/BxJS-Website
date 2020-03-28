import { existsSync, statSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import fetch from 'node-fetch';
import { differenceInDays, parse, addWeeks, lastDayOfWeek } from 'date-fns';
import MarkdownIt from 'markdown-it';
import { markdownToDocuments } from './episodesToDocuments';

// markdown parser
const md = new MarkdownIt();

// cache
const CACHE_EXPIRES_IN_DAYS = 2;
const cachePath = join(__dirname, 'episode.cache.json');

// episode fetching
const baseUrl = 'https://api.github.com/repos/BuildingXwithJS/bxjs-weekly';
const episodesListUrl = `${baseUrl}/contents/links`;

const getEpisodesJson = async () => {
  if (existsSync(cachePath)) {
    console.log('Episode cache found, validating..');
    const cacheStat = statSync(cachePath);
    if (
      cacheStat.isFile() &&
      differenceInDays(new Date(), new Date(cacheStat.ctimeMs)) <
        CACHE_EXPIRES_IN_DAYS
    ) {
      console.log('Loading episodes from cache...');
      const cachedEpisodes = JSON.parse(readFileSync(cachePath).toString());
      return cachedEpisodes;
    }
  }

  console.log('Fetching episodes from github...');
  const episodes = await fetch(episodesListUrl).then((r) => r.json());
  writeFileSync(cachePath, JSON.stringify(episodes));
  return episodes;
};

export async function sourceNodes({ actions }) {
  const { createNode } = actions;

  const episodes = await getEpisodesJson();

  const allSearchItems = [];
  const allEpisodes = [];
  let docId = 1;

  for (const episode of episodes) {
    const episodeUrl = episode.download_url;
    const filename = episode.name;
    const match = /(\d+)-(\d+)-(.+?)\./.exec(filename);
    if (!match) {
      return;
    }
    const [, year, weeks, episodeName] = match;
    const yearDate = parse(`20${year}-01-01`, 'yyyy-MM-dd', new Date());
    const weekDate = addWeeks(yearDate, parseInt(weeks) - 1);
    const episodeDate = lastDayOfWeek(weekDate);
    const markdown = await fetch(episodeUrl).then((r) => r.text());
    const documents = await markdownToDocuments(markdown);

    // push into array of all links used for searching
    documents
      .map((d) => ({
        ...d,
        episodeName: episodeName.replace(/-/g, ' '),
        episodeUrl: `/${episodeName.replace(/-/g, '')}`,
      }))
      .forEach((item) => allSearchItems.push(item));

    // create new episode and use links inside of it
    const newEpisode = {
      id: `${docId++}`,
      data: {
        filename,
        episodeName: episodeName.replace(/-/g, ' '),
        episodeUrl: `/${episodeName.replace(/-/g, '')}`,
        episodeDate,
        markdown,
        html: md.render(markdown),
        links: documents,
      },
      internal: {
        type: 'episode',
        contentDigest: episodeName,
      },
    };
    allEpisodes.push(newEpisode);
  }

  // save json used for search
  writeFileSync(
    join(__dirname, '..', '..', 'static', 'links.json'),
    JSON.stringify(allSearchItems)
  );
  // import nodes to gatsby
  allEpisodes.forEach((item) => createNode(item));
}
