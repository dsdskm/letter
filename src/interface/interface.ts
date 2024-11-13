export interface Account {
  id: string;
  type: string; // basic, master
  birth: string;
  name: string;
  number: string;
  password: string;
  usage: boolean;
  created: number;
}

export interface Contents {
  id: string;
  number: string;
  url: string; // video
  path: string;
  created: number;
}
