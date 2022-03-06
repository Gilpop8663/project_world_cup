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
