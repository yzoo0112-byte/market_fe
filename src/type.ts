export type User = {
  loginId: string;
  password: string;
  nickname: string;
  userName: string;
  phoneNum: string;
  birth: string;
  email: string;
  addr: string;
}

export type LoginUser = {
  loginId: string;
  password: string;
}
export interface PostForm {

  title: string;
  hashtag: string;
  content: string;
  files: File[];
}
