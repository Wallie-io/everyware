import Dexie from 'dexie';
const db = new Dexie('everyware');

/**
function ImmutableChain(value) {
  return {
    add: function (number) {
      return ImmutableChain(value + number);
    },
    multiply: function (number) {
      return ImmutableChain(value * number);
    },
    getValue: function () {
      return value;
    },
  };
}
**/

function where(location: ['indexeddb']) {}

export let loaded: Boolean = false;

function init() {
  db.version(1).stores({
    posts: '++id,title,body,author',
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
  return {
    where,
  };
}

/**
// Usage
const result = ImmutableChain(5)
    .add(10)
    .multiply(2)
    .getValue();
**/
