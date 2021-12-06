export default (originals) => {
  return Math.floor(Math.random() * (originals[0].items.results.length - 1));
}