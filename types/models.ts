export interface User {
  id: number;
  username: string;
  password: string;
}
export interface DIARY {
  id: number;
  title: string;
  content: string;
  date: string;
}

export interface TODO {
  id: number;
  content: string;
}

interface EMOTION {
  id: number;
  feel: string;
}

export interface COMMENT {
  id: number;
  content: string;
  emotion_id: number;
}

export interface IMAGE {
  path: string;
  comment_id: number;
}

