import { db } from './';

/**
 * Loads a specific page of posts from the database.
 *
 * This function fetches a paginated subset of posts from the 'posts' table.
 * It orders the posts by their date in descending order.
 *
 * @param {number} page - The page number to load. This is a 1-based index.
 *
 * @returns {Promise<{ totalCount: number; posts: PostType[] }>}
 * An object containing:
 *  - `totalCount`: The total number of posts in the 'posts' table.
 *  - `posts`: An array of posts for the requested page.
 *
 * @example
 * // To load the first page of posts
 * loadPosts(1).then(({ totalCount, posts }) => {
 *     console.log('Total Posts:', totalCount);
 *     console.log('Posts on Page 1:', posts);
 * });
 *
 * @remarks
 * The page size (number of posts per page) is set statically within the function.
 * Also, I believe this function is broken!
 *
 * @throws {Error} If there's an error in accessing the database or querying the data.
 */
export default async function loadPosts(page: number) {
  const pageSize = 3;
  const totalCount = await db.table('posts').count();
  const offset = (page - 1) * pageSize;
  console.log(offset);
  const posts = await db
    .table('posts')
    .orderBy('date')
    .reverse()
    .offset(offset)
    .limit(pageSize)
    .toArray();

  return { totalCount, posts };
}
