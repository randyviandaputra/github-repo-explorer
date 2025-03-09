import axios from "axios";
import { User, Repo } from "../types";

const API_BASE_URL = import.meta.env.VITE_GITHUB_API_URL;

export const fetchUsers = async (username: string): Promise<User[]> => {
  const { data } = await axios.get(`${API_BASE_URL}/search/users?q=${username}&per_page=5`);
  return data.items;
};

export const fetchRepositories = async (username: string): Promise<Repo[]> => {
  const { data } = await axios.get(`${API_BASE_URL}/users/${username}/repos`);
  return data;
};
