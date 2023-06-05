export interface User {
  id: number;
  username: string;
  password: string;
}
export interface Diary {
  id: number;
  title: string;
  content: string;
  date: string;
}

export interface Todo {
  id: number;
  content: string;
}

export interface Emotion {
  id: number;
  feel: string;
}

export interface Comment {
  id: number;
  content: string;
  emotion_id: number;
}

export interface Image {
  path: string;
  comment_id: number;
}

