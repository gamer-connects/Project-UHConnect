export interface PostType {
  id: number;
  content: string;
  tags: string[];
  userID: number;
  gameID: number;
  createdAt: string;
  user: {
    id: number;
    username: string;
    profileImage: string | null;
  };
  game: {
    id: number;
    title: string;
    image: string;
  };
}
