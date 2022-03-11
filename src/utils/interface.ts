export interface IUser {
  userObj?: IUserObj;
  setUserObj: React.Dispatch<React.SetStateAction<{}>>;
  setMakeFetch?: React.Dispatch<React.SetStateAction<boolean>>;
  makeFetch?: boolean;
}

export interface IUserObjProps {
  userObj: IUserObj;
}

export interface IUserObj {
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

export interface IWorldCupItemProps {
  id: string;
  candidate: string;
  roundWin: number;
  roundLose: number;
  champion: number;
}

export interface IWorldCupCommentProps {
  id: string;
  text: string;
  createdAt: Date;
  creatorId: string;
  userId: string;
}
