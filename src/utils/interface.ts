export interface IUser {
  userObj?: IUserObj | null | any;
  setUserObj: React.Dispatch<React.SetStateAction<{}>>;
}

export interface IUserObjProps {
  userObj: IUserObj | null | any;
}

interface IUserObj {
  userId: number;
  email: string;
  userName: string;
}

export interface IWorldCupProps {
  title: string;
  list: IWorldCupItemProps[];
  id: string;
  count: number;
  createdAt: Date;
  comments: IWorldCupCommentProps[];
  creatorId: string;
}

interface IWorldCupItemProps {
  id: string;
  candidate: string;
  roundWin: number;
  roundLose: number;
  champion: number;
}

interface IWorldCupCommentProps {
  id: string;
  text: string;
  createdAt: Date;
  creatorId: string;
  userId: string;
  userImage: string;
}
