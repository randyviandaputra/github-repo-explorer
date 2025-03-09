import React from "react";
import { UseFormRegister, UseFormHandleSubmit, FieldErrors } from "react-hook-form";

interface SearchFormProps {
  register: UseFormRegister<{ username: string }>;
  handleSubmit: UseFormHandleSubmit<{ username: string }>;
  onSearch: (data: { username: string }) => void;
  errors: FieldErrors<{ username: string }>;
}

const SearchForm: React.FC<SearchFormProps> = ({ register, handleSubmit, onSearch, errors }) => (
  <form onSubmit={handleSubmit(onSearch)} className="mb-4 w-full max-w-md" data-testid="search-form">
    <input
      {...register("username", { required: "Username is required" })}
      className={`border p-2 rounded w-full ${
        errors.username ? "border-red-500" : "border-gray-300"
      }`}
      placeholder="Enter username"
    />
    {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}

    <button type="submit" className="bg-blue-500 text-white p-2 mt-2 w-full rounded">
      Search
    </button>
  </form>
);


export default SearchForm;
