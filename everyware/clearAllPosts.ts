import { db } from './';

export default function clearAllPosts() {
  db.table('posts')
    .clear()
    .then(() => {})
    .catch((err: any) => console.error(err));
}
