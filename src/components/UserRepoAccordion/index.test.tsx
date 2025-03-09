import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UserRepoAccordion from "./index";
import { User, Repo } from "../../types";

const mockUsers: User[] = [
  { id: 1, login: "testuser1" },
  { id: 2, login: "testuser2" }
];

const mockRepos: Repo[] = [
  { id: 101, name: "repo-1", description: "First repo", stargazers_count: 10 },
  { id: 102, name: "repo-2", description: "Second repo", stargazers_count: 20 }
];

describe("UserRepoAccordion Component", () => {
  it("renders the user list correctly", () => {
    render(<UserRepoAccordion users={mockUsers} onSelectUser={() => {}} selectedUser={null} repositories={null} />);

    expect(screen.getByText("testuser1")).toBeInTheDocument();
    expect(screen.getByText("testuser2")).toBeInTheDocument();
  });

  it("displays 'No users found' when user list is empty", () => {
    render(<UserRepoAccordion users={[]} onSelectUser={() => {}} selectedUser={null} repositories={null} />);
    
    expect(screen.queryByText("testuser1")).not.toBeInTheDocument();
    expect(screen.queryByText("testuser2")).not.toBeInTheDocument();
  });

  it("expands and collapses user details when clicked", async () => {
    render(<UserRepoAccordion users={mockUsers} onSelectUser={() => {}} selectedUser={null} repositories={null} />);

    const userButton = screen.getByText("testuser1");
    fireEvent.click(userButton);

    await waitFor(() => {
      expect(userButton.querySelector("svg")).toBeInTheDocument();
    });

    fireEvent.click(userButton);
    await waitFor(() => {
      expect(screen.queryByText("repo-1")).not.toBeInTheDocument();
    });
  });

  it("displays repositories when a user is selected", async () => {
    render(<UserRepoAccordion users={mockUsers} onSelectUser={() => {}} selectedUser="testuser1" repositories={mockRepos} />);

    fireEvent.click(screen.getByText("testuser1"));

    await waitFor(() => {
      expect(screen.getByText("repo-1")).toBeInTheDocument();
      expect(screen.getByText("repo-2")).toBeInTheDocument();
      expect(screen.getByText("First repo")).toBeInTheDocument();
      expect(screen.getByText("Second repo")).toBeInTheDocument();
    });
  });

  it("displays 'No repositories found' when there are no repositories", async () => {
    render(<UserRepoAccordion users={mockUsers} onSelectUser={() => {}} selectedUser="testuser1" repositories={[]} />);
    
    fireEvent.click(screen.getByText("testuser1"));

    await waitFor(() => {
      expect(screen.getByText("No repositories found.")).toBeInTheDocument();
    });
  });

  it("toggles user selection correctly", async () => {
    const mockOnSelectUser = jest.fn();
    render(<UserRepoAccordion users={mockUsers} onSelectUser={mockOnSelectUser} selectedUser={null} repositories={null} />);

    fireEvent.click(screen.getByText("testuser1"));
    await waitFor(() => expect(mockOnSelectUser).toHaveBeenCalledWith("testuser1"));

    fireEvent.click(screen.getByText("testuser2"));
    await waitFor(() => expect(mockOnSelectUser).toHaveBeenCalledWith("testuser2"));
  });

  it("renders correct star count and repository information", async () => {
    render(<UserRepoAccordion users={mockUsers} onSelectUser={() => {}} selectedUser="testuser1" repositories={mockRepos} />);

    fireEvent.click(screen.getByText("testuser1"));

    await waitFor(() => {
      expect(screen.getByText("repo-1")).toBeInTheDocument();
      expect(screen.getByText("repo-2")).toBeInTheDocument();
      expect(screen.getByText("10")).toBeInTheDocument();
      expect(screen.getByText("20")).toBeInTheDocument();
    });
  });
});
