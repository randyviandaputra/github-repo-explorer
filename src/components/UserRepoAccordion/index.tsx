import React, { useState } from "react";
import { Repo, User } from "../../types";
import { FaStar, FaChevronUp, FaChevronDown } from "react-icons/fa";

interface UserRepoAccordionProps {
  users: User[];
  onSelectUser: (username: string) => void;
  selectedUser: string | null;
  repositories: Repo[] | null;
}

const UserRepoAccordion: React.FC<UserRepoAccordionProps> = ({ users, onSelectUser, selectedUser, repositories }) => {
  const [openUser, setOpenUser] = useState<string | null>(null);

  const handleUserClick = (username: string) => {
    if (openUser === username) {
      setOpenUser(null);
    } else {
      setOpenUser(username);
      onSelectUser(username);
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-4 rounded-md shadow-lg">
      {users.map((user) => (
        <div key={user.id} className="border-b border-gray-300">
          <button
            className="w-full text-left p-2 font-bold flex justify-between items-center bg-gray-100 rounded"
            onClick={() => handleUserClick(user.login)}
          >
            {user.login}
            <span>{openUser === user.login ? <FaChevronUp /> : <FaChevronDown />}</span>
          </button>
          {openUser === user.login && selectedUser === user.login && repositories && (
            <div className="bg-white p-2 mt-2 rounded-md">
              {repositories.length > 0 ? (
                repositories.map((repo) => (
                  <div key={repo.id} className="border p-2 mb-2 rounded-md bg-gray-200">
                    <div className="flex justify-between items-center">
                      <p className="font-semibold">{repo.name}</p>
                      <span className="flex items-center text-sm">
                        {repo.stargazers_count} <FaStar className="ml-1 text-yellow-500" />
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{repo.description || "No description available"}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No repositories found.</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default UserRepoAccordion;
