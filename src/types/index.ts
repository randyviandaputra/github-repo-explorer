export interface User {
  id: number;
  login: string;
}

export interface Repo {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
}
