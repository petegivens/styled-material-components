import React from 'react';
import { Icon } from '../icons';

const CommentPath = () => [
  <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" key='path0' />,
];

const CommentIcon = Icon.extend.attrs({
  children: CommentPath,
})``;

export default CommentPath;
export { CommentIcon };
