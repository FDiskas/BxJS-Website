import _ from 'highland';
// gets all links from string
const extractLinks = function (str: string) {
  const results: string[] = [];
  const regex = /\[(.+?)\]\((.+?)\)/g;
  let res = regex.exec(str);
  while (res) {
    const url = res[2];
    results.push(url);
    res = regex.exec(str);
  }
  return results;
};
export const markdownToDocuments = function (text: string) {
  const sections = text.split('## ');
  return _(sections)
    .map(function (section: string) {
      return section.replace(/\r/g, '');
    })
    .filter(
      (section: string) =>
        section.length > 0 && section.replace(/\n/g, '').length > 0
    )
    .flatMap(function (text: string) {
      const _a = text.split(/:\n/g);
      const name = _a[0];
      const linksText = _a[1];
      if (!linksText) {
        console.error('Error processing episode:', text);
        return _([]);
      }
      const sectionName = name.trim();
      const links = linksText.split('\n');
      return _(links)
        .filter((l) => {
          return l.length > 0;
        })
        .map(function (link: string) {
          const urls = extractLinks(link);
          const title = link
            .replace(/\[(.+?)\]\((.+?)\)/g, '$1')
            .replace(/^-/g, '')
            .trim();
          return {
            category: sectionName,
            title: title,
            urls: urls.join(', '),
            urlsSet: urls,
          };
        });
    })
    .filter(function (result) {
      return result;
    })
    .collect()
    .toPromise(Promise);
};
