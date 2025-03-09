import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import SearchForm from "./components/SearchForm";
import UserRepoAccordion from "./components/UserRepoAccordion";
import { fetchUsers, fetchRepositories } from "./services/api";
import { User, Repo } from "./types";

const App: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<{ username: string }>();
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");

  const { data: users, refetch, isLoading: isLoadingUsers, error: usersError } = useQuery<User[]>({
    queryKey: ["users", username],
    queryFn: () => fetchUsers(username),
    enabled: !!username,
  });

  const { data: repositories, isLoading: isLoadingRepos, error: reposError } = useQuery<Repo[]>({
    queryKey: ["repos", selectedUser],
    queryFn: () => fetchRepositories(selectedUser!),
    enabled: !!selectedUser,
  });

  const onSearch = ({ username }: { username: string }) => {
    setUsername(username);
    refetch();
  };

  return (
    <div className="flex flex-col items-center p-5 w-full min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">GitHub Repositories Explorer</h1>
      <SearchForm register={register} handleSubmit={handleSubmit} onSearch={onSearch} errors={errors} />
      
      {isLoadingUsers && <p>Loading users...</p>}
      {usersError instanceof Error && <p className="text-red-500">{usersError.message}</p>}
      

      {users && users.length > 0 && (
        <>
          <p className="text-gray-700 text-lg font-semibold mb-2">Showing users for "{username}"</p>
          <UserRepoAccordion users={users || []} onSelectUser={setSelectedUser} selectedUser={selectedUser} repositories={repositories || []} />
        </>
      )}
      
      {isLoadingRepos && <p>Loading repositories...</p>}
      {reposError instanceof Error && <p className="text-red-500">{reposError.message}</p>}
      </div>
  );
};

export default App;