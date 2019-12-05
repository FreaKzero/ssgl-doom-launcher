const importAll = r => r.keys().map(r);
const images = importAll(require.context('./', false, /\.(png|jpe?g|svg)$/));

const getCover = imagename =>
  images.find(i => i.search(`${imagename.toLowerCase()}.jpg`) > -1);

export default getCover;
