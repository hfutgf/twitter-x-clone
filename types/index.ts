export interface IUser {
  currentUser: IUser;
  createdAt: Date;
  username: string;
  email: string;
  name: string;
  profileImage: string;
  coverImage: string;
  updatedAt: Date;
  _id: string;
  bio: string;
  location: string;
  followers: string[];
  following: string[];
  hasNewNotifications: boolean;
  notifications: string[];
  isFollowing: boolean;
}

export interface IPost {
  body: string;
  comments: number;
  createdAt: Date;
  likes: number;
  updatedAt: Date;
  user: IUser;
  _id: string;
  hasLiked: boolean;
}

export interface INotification {
  _id: string;
  body: string;
  user: IUser;
}
