import Dexie from 'dexie';
export const db = new Dexie('everyware');

export let loaded: Boolean = false;

function init() {
  db.version(2).stores({
    posts: '++id,title,body,author,date',
  });
  db.open()
    .then(() => {
      loaded = true;
    })
    .catch(error => {
      console.error('Failed to open the database: ', error);
    });
}

init();

export default function Everyware() {
  console.log('hello world');
  return {};
}
