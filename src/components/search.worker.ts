import Fuse from 'fuse.js';

export type SearchResults = {
  category: string;
  title: string;
  urls: string;
  urlsSet: string[];
  episodeName: string;
  episodeUrl: string;
}[];

const fuseOptions = {
  shouldSort: true,
  threshold: 0.8,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ['urls', 'title'],
};

let fuse: any;

const init = async () => {
  const searchData = await fetch('/links.json').then((r) => r.json());
  fuse = new Fuse(searchData, fuseOptions);
};

init();

export async function search(input: string) {
  const found = fuse.search(input);
  return found;
}
