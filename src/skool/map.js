// Raw Skool JSON -> clean view-models. The UI only ever sees what these functions return,
// so a Skool schema change is contained to mapping.json + this file. Field PATHS live in
// mapping.json (so drift is a data edit); this file holds the transform LOGIC (booleans,
// author composition, markup rendering, recursion). Pure: no DOM, no network.
//
// Confirmed shapes (the reverse-engineering notes, your-community 2026-06):
//   post:    { id, name, labelId, createdAt, metadata:{title,content,upvotes,comments,pinned},
//              user:{firstName,lastName,metadata:{pictureBubble}} }
//   comment: a post with post_type "comment": { metadata:{content,upvotes}, createdAt,
//              user:{...}, children:[...] }
//   member:  { firstName, lastName, metadata:{bio,pictureBubble,online}, member:{role} }

import mapping from './mapping.json' with { type: 'json' };
import { toHtml, toText } from './markup.js';
import { BASE } from './routes.js';

/**
 * @typedef {object} Author
 * @property {string} id Skool user uuid ('' when absent) — used to resolve mentions to profiles.
 * @property {string} name
 * @property {string} handle User slug (the `name` field, e.g. "jane-doe-1234"), for profile URLs.
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} avatar
 */

/**
 * @typedef {object} MentionUser
 * @property {string} id
 * @property {string} handle User slug (`name`), e.g. "jane-doe-1234".
 * @property {string} name Display name (first + last, falling back to the handle).
 * @property {string} avatar
 */

/**
 * @typedef {object} Attachment
 * @property {string} id
 * @property {string} type MIME type, e.g. "image/png".
 * @property {string} name Original file name.
 * @property {boolean} isImage
 * @property {string} thumbUrl Small image URL for the inline thumbnail.
 * @property {string} fullUrl Full-size URL (lightbox zoom / file open).
 */

/**
 * @typedef {object} PostView
 * @property {string} id
 * @property {string} slug
 * @property {string} title
 * @property {string} content
 * @property {string} contentHtml
 * @property {string} contentText
 * @property {number} upvotes
 * @property {number} comments
 * @property {boolean} pinned
 * @property {string} created
 * @property {string | null} labelId
 * @property {Author} author
 * @property {Attachment[]} [attachments]
 */

/**
 * @typedef {object} CommentView
 * @property {string} id
 * @property {string} content
 * @property {string} contentHtml
 * @property {string} contentText
 * @property {number} upvotes
 * @property {string} ts
 * @property {Author} author
 * @property {CommentView[]} replies
 * @property {Attachment[]} [attachments]
 */

/**
 * @typedef {object} NotificationView
 * @property {string} id
 * @property {'post' | 'comment' | 'reply' | 'like' | 'mention' | 'other'} type
 * @property {string} actorName Who triggered it.
 * @property {string} actorAvatar
 * @property {string} text Action text, e.g. "commented on your post" / "liked your comment".
 * @property {string} preview The related post/comment content snippet (may be '').
 * @property {string} href Deep-link to the native Skool view (used as a modifier-click fallback).
 * @property {string} rootPostId The top post's uuid — the post to open in the viewer.
 * @property {string} commentId The target comment uuid for a comment/reply/mention ('' otherwise).
 * @property {string} postSlug The post slug (from link_as) — used to fetch the post if it isn't in
 *   the loaded feed.
 * @property {boolean} unread
 * @property {string} ts ISO timestamp.
 */

/**
 * @typedef {object} MemberView
 * @property {string} name
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} bio
 * @property {string} avatar
 * @property {boolean} online
 * @property {string} role
 */

/**
 * Safely read a dotted path from a nested object. Returns undefined on any missing hop.
 * @param {unknown} obj
 * @param {string} path e.g. "metadata.pictureBubble"
 * @returns {unknown}
 */
export function getPath(obj, path) {
  if (obj == null || !path) return undefined;
  /** @type {unknown} */
  let current = obj;
  for (const key of path.split('.')) {
    if (current == null || typeof current !== 'object') return undefined;
    current = /** @type {Record<string, unknown>} */ (current)[key];
  }
  return current;
}

/**
 * Read the first non-empty value among one or more candidate dotted paths. A mapping spec value
 * can be a single string (one path) OR an array of strings (try each in order). This lets the
 * comment spec list both the api2 snake_case location AND the legacy camelCase/tree location for
 * each field, so the same mapper handles both the unseen api2 shape and the known tree shape.
 * "Empty" = undefined, null, or '' — so a present-but-blank field falls through to the next path.
 * @param {unknown} obj
 * @param {string | string[]} paths
 * @returns {unknown} The first non-empty value, or undefined.
 */
export function pick(obj, paths) {
  const list = Array.isArray(paths) ? paths : [paths];
  for (const path of list) {
    const value = getPath(obj, path);
    if (value !== undefined && value !== null && value !== '') return value;
  }
  return undefined;
}

/**
 * Build an author view-model from an `author` mapping block and the surrounding raw object.
 * Each spec field may be a single path or an array of candidate paths (see `pick`), so this
 * handles both the post/member shape (single camelCase paths) and the comment shape (snake_case
 * api2 + camelCase fallbacks). The author root may itself be empty (api2's author fields could
 * sit directly on the comment), so we fall back to reading fields off `raw` too.
 * @param {Record<string, string | string[]>} spec author block from mapping.json.
 * @param {unknown} raw The raw post/comment object.
 * @returns {Author}
 */
function mapAuthor(spec, raw) {
  const root = pick(raw, spec._root) ?? raw ?? {};
  const firstName = String(pick(root, spec.firstName) ?? '');
  const lastName = String(pick(root, spec.lastName) ?? '');
  // Some api2 author shapes carry only a single full name (no first/last split). If first+last
  // didn't compose a name, fall back to that full-name path (encoded as a `firstName` candidate).
  const composed = `${firstName} ${lastName}`.trim();
  const avatar = String(pick(root, spec.avatar) ?? '');
  const name = composed || 'Member';
  // id + handle (the user slug) let the UI turn this author into a profile link / @mention.
  // Both spec keys may be absent (e.g. member shape) — `pick` then yields '' and the link is
  // simply not rendered.
  const id = String(pick(root, spec.id) ?? '');
  const handle = String(pick(root, spec.handle) ?? '');
  // When the only hit was a full "name", lastName is '' and firstName holds the whole thing;
  // that's fine for display (name === firstName), and the view-model still resolves.
  return { id, name, handle, firstName, lastName, avatar };
}

/**
 * @param {unknown} value
 * @returns {number} `value` coerced to an integer, or 0.
 */
function asInt(value) {
  const n = Number(value);
  return Number.isFinite(n) ? Math.trunc(n) : 0;
}

/**
 * Parse Skool's `metadata.attachments_data` — a STRINGIFIED JSON array — into displayable
 * attachments. Each entry looks like `{ id, metadata: { content_type, file_name, image_md_url,
 * read_url, image_lg_url? } }`. We surface every attachment with a usable URL and flag images (the
 * common case), preferring a mid-size image URL.
 * @param {unknown} dataString
 * @returns {Attachment[]}
 */
export function parseAttachments(dataString) {
  if (!dataString) return [];
  let arr;
  try {
    arr = JSON.parse(String(dataString));
  } catch {
    return [];
  }
  if (!Array.isArray(arr)) return [];
  return arr
    .map((entry) => {
      const meta = /** @type {Record<string, unknown>} */ (
        entry && typeof entry === 'object' ? (entry.metadata ?? {}) : {}
      );
      const type = String(meta.content_type ?? '');
      const full = String(
        meta.read_url ?? meta.image_md_url ?? meta.image_lg_url ?? meta.src_read_url ?? '',
      );
      const thumb = String(meta.image_sm_url ?? meta.image_md_url ?? full);
      return {
        id: String((entry && entry.id) ?? ''),
        type,
        name: String(meta.file_name ?? ''),
        isImage: /^image\//i.test(type),
        thumbUrl: thumb || full,
        fullUrl: full || thumb,
      };
    })
    .filter((a) => a.fullUrl);
}

/**
 * Map a raw feed post (a `postTree.post`) to a clean post view-model.
 * @param {unknown} raw
 * @returns {PostView}
 */
export function mapPost(raw) {
  const spec = mapping.post;
  const content = String(getPath(raw, spec.content) ?? '');
  return {
    id: String(getPath(raw, spec.id) ?? ''),
    slug: String(getPath(raw, spec.slug) ?? ''),
    title: String(getPath(raw, spec.title) ?? ''),
    content,
    contentHtml: toHtml(content),
    contentText: toText(content),
    upvotes: asInt(getPath(raw, spec.upvotes)),
    comments: asInt(getPath(raw, spec.comments)),
    pinned: Boolean(getPath(raw, spec.pinned)),
    created: String(getPath(raw, spec.created) ?? ''),
    labelId: /** @type {string | null} */ (getPath(raw, spec.labelId) ?? null),
    author: mapAuthor(spec.author, raw),
    // Next.js routes camelCase the field (`attachmentsData`); api2 uses snake_case — try both.
    attachments: parseAttachments(
      getPath(raw, 'metadata.attachmentsData') ?? getPath(raw, 'metadata.attachments_data'),
    ),
  };
}

/**
 * Map a raw comment node to a clean comment view-model. Replies are mapped recursively.
 *
 * The REAL api2 comments response (live-captured 2026-06) delivers each comment as a tree node
 * `{ post: CommentPost, children?: [TreeNode, ...] }`, where `CommentPost` is snake_case
 * (`id`, `created_at`, `metadata.content`, `metadata.upvotes?` — may be ABSENT → treat as 0,
 * `user.first_name`/`last_name`/`name`, `user.metadata.picture_bubble`). The node's `children`
 * are the replies. This is shape (1) below.
 *
 * @param {unknown} raw
 * @returns {CommentView}
 */
export function mapComment(raw) {
  const spec = mapping.comment;
  // Three shapes converge here (so the UI never has to care which Skool sent):
  //   1. api2 / Next.js tree node `{ post, children }` (THE REAL api2 shape) — comment fields on
  //      `.post` (snake_case), replies on the node's own `children`.
  //   2. A bare comment post (camelCase) — `metadata.content`, `user.firstName`, `children`.
  //   3. A flat comment object — top-level `content`/`upvotes`, `author` root, `replies`.
  // Each field is read via `pick` over the candidate paths in mapping.json, so all three resolve.
  const node = /** @type {Record<string, unknown> | null} */ (
    raw && typeof raw === 'object' ? raw : null
  );
  const isTreeNode = Boolean(node && 'post' in node && node.post);
  const commentPost = isTreeNode ? node?.post : raw;
  // Replies: on a tree node they hang off the node itself; otherwise off the comment object.
  const rawReplies = isTreeNode ? pick(node, spec.replies) : pick(commentPost, spec.replies);

  const content = String(pick(commentPost, spec.content) ?? '');
  const replies = Array.isArray(rawReplies)
    ? rawReplies.map((/** @type {unknown} */ child) => mapComment(child))
    : [];
  return {
    id: String(pick(commentPost, spec.id) ?? ''),
    content,
    contentHtml: toHtml(content),
    contentText: toText(content),
    upvotes: asInt(pick(commentPost, spec.upvotes)),
    ts: String(pick(commentPost, spec.ts) ?? ''),
    author: mapAuthor(spec.author, commentPost),
    replies,
    attachments: parseAttachments(
      getPath(commentPost, 'metadata.attachments_data') ?? getPath(commentPost, 'metadata.attachmentsData'),
    ),
  };
}

/**
 * Map a `/search/users` result row to a mention candidate (composer autocomplete). `handle` is
 * the user slug (`name`, e.g. "jane-doe-1234") used to build the profile URL; `name` is the
 * display name (first + last, falling back to the handle).
 * @param {unknown} raw
 * @returns {MentionUser}
 */
export function mapMentionUser(raw) {
  const spec = mapping.mention;
  const first = String(pick(raw, spec.firstName) ?? '');
  const last = String(pick(raw, spec.lastName) ?? '');
  const handle = String(pick(raw, spec.handle) ?? '');
  const name = `${first} ${last}`.trim() || handle || 'Member';
  return {
    id: String(pick(raw, spec.id) ?? ''),
    handle,
    name,
    avatar: String(pick(raw, spec.avatar) ?? ''),
  };
}

/**
 * Map a raw `/self/notifications` message to a notification view-model. The interesting fields live
 * in `metadata.data`, which is a STRINGIFIED JSON blob — we parse it, then read actor/text/target
 * from it. `link_as` is the real relative deep-link (e.g. `/your-community/some-post?p=abcd1234`); we
 * prefix the site origin so clicking opens the NATIVE Skool view of the target.
 * @param {unknown} raw
 * @returns {NotificationView}
 */
export function mapNotification(raw) {
  const spec = mapping.notification;
  /** @type {Record<string, unknown>} */
  let data = {};
  try {
    const parsed = JSON.parse(String(pick(raw, spec.dataString) ?? '{}'));
    if (parsed && typeof parsed === 'object') data = parsed;
  } catch {
    data = {};
  }
  const action = String(pick(data, spec.data.action) ?? pick(raw, spec.action) ?? '');
  const linkAs = String(pick(data, spec.data.linkAs) ?? '');
  const rootPostId = String(pick(data, spec.data.rootPostId) ?? '');
  const postId = String(pick(data, spec.data.postId) ?? '');
  return {
    id: String(pick(raw, spec.id) ?? ''),
    type: notificationType(action),
    actorName: String(pick(data, spec.data.actorName) ?? ''),
    actorAvatar: String(pick(data, spec.data.actorAvatar) ?? ''),
    text: String(pick(data, spec.data.text) ?? ''),
    preview: String(pick(data, spec.data.preview) ?? ''),
    href: linkAs ? `${BASE}${linkAs}` : '',
    rootPostId,
    // For a comment/reply/mention (and like-comment) post_id is the COMMENT and differs from the
    // root; for a new-post / like-post it equals the root, so there's no specific comment to jump to.
    commentId: postId && postId !== rootPostId ? postId : '',
    postSlug: slugFromLinkAs(linkAs),
    unread: Boolean(pick(raw, spec.unread)),
    ts: String(pick(raw, spec.ts) ?? ''),
  };
}

/**
 * Pull the post slug out of a notification's `link_as`, e.g. `/your-community/some-post?p=abcd` ->
 * `some-post`. Returns '' when it can't be parsed.
 * @param {string} linkAs
 * @returns {string}
 */
function slugFromLinkAs(linkAs) {
  const path = String(linkAs).split('?')[0];
  const parts = path.split('/').filter(Boolean); // [group, postSlug]
  return parts[1] ?? '';
}

/**
 * Classify a Skool notification `action` into our coarse type. Order matters: a "mention-comment"
 * is a mention first; an "upvote-post" is a like, not a post.
 * @param {string} action
 * @returns {NotificationView['type']}
 */
function notificationType(action) {
  if (/mention/.test(action)) return 'mention';
  if (/comment/.test(action)) return 'comment';
  if (/upvote|like/.test(action)) return 'like';
  if (/post/.test(action)) return 'post';
  return 'other';
}

/**
 * Map a raw member (a user from the members route) to a clean member view-model.
 * @param {unknown} raw
 * @returns {MemberView}
 */
export function mapMember(raw) {
  const spec = mapping.member;
  const firstName = String(getPath(raw, spec.firstName) ?? '');
  const lastName = String(getPath(raw, spec.lastName) ?? '');
  return {
    name: `${firstName} ${lastName}`.trim() || 'Member',
    firstName,
    lastName,
    bio: String(getPath(raw, spec.bio) ?? ''),
    avatar: String(getPath(raw, spec.avatar) ?? ''),
    online: Boolean(getPath(raw, spec.online)),
    role: String(getPath(raw, spec.role) ?? 'member'),
  };
}
