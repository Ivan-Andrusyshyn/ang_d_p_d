import { CommentInterface } from './commentInterface';

export interface ItemInterface {
  id: number;
  name: string;
  comments: CommentInterface[];
}
