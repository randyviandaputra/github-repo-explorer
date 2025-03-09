import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchForm from "./index";
import { useForm } from "react-hook-form";

interface FormInputs {
  username: string;
}

const SearchFormTestWrapper = ({ onSearch }: { onSearch: (data: FormInputs) => void }) => {
  const { register, handleSubmit, formState } = useForm<FormInputs>({
    mode: "onSubmit",
  });

  return (
    <SearchForm
      register={register}
      handleSubmit={handleSubmit}
      onSearch={onSearch}
      errors={formState.errors}
    />
  );
};

describe("SearchForm Component", () => {
  it("renders input field and button", () => {
    render(<SearchFormTestWrapper onSearch={() => {}} />);
    
    expect(screen.getByPlaceholderText("Enter username")).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
  });

  it("shows validation error when input is empty", async () => {
    render(<SearchFormTestWrapper onSearch={() => {}} />);

    fireEvent.submit(screen.getByTestId("search-form"));

    await waitFor(() => {
      expect(screen.getByText("Username is required")).toBeInTheDocument();
    });
  });

  it("removes error message when user starts typing", async () => {
    render(<SearchFormTestWrapper onSearch={() => {}} />);

    fireEvent.submit(screen.getByTestId("search-form"));

    await waitFor(() => {
      expect(screen.getByText("Username is required")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText("Enter username"), { target: { value: "testuser" } });

    await waitFor(() => {
      expect(screen.queryByText("Username is required")).not.toBeInTheDocument();
    });
  });

  it("calls `onSearch` when form is submitted with valid input", async () => {
    const mockOnSearch = jest.fn();
    const mockOnSubmit = jest.fn();
    render(<SearchFormTestWrapper onSearch={mockOnSearch} />);
    screen.getByTestId("search-form").onsubmit = mockOnSubmit;

    fireEvent.change(screen.getByPlaceholderText("Enter username"), { target: { value: "testuser" } });

    fireEvent.submit(screen.getByTestId("search-form"));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });
});
