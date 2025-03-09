import { fetchUsers, fetchRepositories } from "./api";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("GitHub API Service", () => {
  it("fetches users successfully", async () => {
    const mockUsers = { items: [{ id: 1, login: "testuser" }] };
    mockedAxios.get.mockResolvedValue({ data: mockUsers });

    const users = await fetchUsers("testuser");
    expect(users).toEqual(mockUsers.items);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://api.github.com/search/users?q=testuser&per_page=5"
    );
  });

  it("fetches repositories successfully", async () => {
    const mockRepos = [{ id: 1, name: "test-repo", stargazers_count: 5 }];
    mockedAxios.get.mockResolvedValue({ data: mockRepos });

    const repos = await fetchRepositories("testuser");
    expect(repos).toEqual(mockRepos);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://api.github.com/users/testuser/repos"
    );
  });

  it("handles API errors", async () => {
    mockedAxios.get.mockRejectedValue(new Error("API Error"));
    await expect(fetchUsers("erroruser")).rejects.toThrow("API Error");
  });
});
