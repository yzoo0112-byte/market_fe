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

//게시글
export type Post = {
  postId: number;
  userId: number;
  title: string;
  content: string;
  createAt: Date;
  updateAt?: Date;
  views: number;
  hashtag: string;
  fileList: File[];
}

// 댓글
export type Comment = {
  postId: number;
  nickname?: string;
  comment: string;
  createAt: Date;
  updateAt?: Date;
}

// 댓글 작성자 정보
export type ComUserInfo = {
  //유저 생성번호
  userId: number;
  nickname: string;
}
