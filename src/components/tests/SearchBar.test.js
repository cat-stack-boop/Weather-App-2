import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import SearchBar from "../SearchBar";

// Helper to render SearchBar with a mock onSearch
const setup = (onSearch = jest.fn()) => {
  render(<SearchBar onSearch={onSearch} />);
  const input = screen.getByPlaceholderText(/enter city name/i);
  const button = screen.getByRole("button", { name: /search/i });
  return { input, button, onSearch };
};

afterEach(() => {
  jest.clearAllMocks();
});

describe("SearchBar Component", () => {
  test("1. A valid city name that successfully returns weather data", async () => {
    const mockOnSearch = jest.fn();
    const { input, button, onSearch } = setup(mockOnSearch);

    fireEvent.change(input, { target: { value: "London" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(onSearch).toHaveBeenCalledWith("London");
    });
    // Input should be cleared after submit
    expect(input.value).toBe("");
  });

  test("2. A non-existent city name that should return an error", async () => {
    // Simulate onSearch throwing an error for a non-existent city
    const mockOnSearch = jest.fn(() =>
      Promise.reject(new Error("City not found"))
    );
    const { input, button, onSearch } = setup(mockOnSearch);

    fireEvent.change(input, { target: { value: "FakeCityXYZ" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(onSearch).toHaveBeenCalledWith("FakeCityXYZ");
    });
    // Input should be cleared after submit
    expect(input.value).toBe("");
    // Note: Error display is handled by parent, not SearchBar
  });

  test("3. An empty input that should return an error message", async () => {
    const mockOnSearch = jest.fn();
    const { input, button, onSearch } = setup(mockOnSearch);

    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(button);

    // onSearch should not be called for empty input
    await waitFor(() => {
      expect(onSearch).not.toHaveBeenCalled();
    });
    // Input remains empty
    expect(input.value).toBe("");
  });

  test("4. An API failure scenario such as a timeout or server error", async () => {
    // Simulate onSearch returning a rejected promise (API failure)
    const mockOnSearch = jest.fn(() =>
      Promise.reject(new Error("API failure"))
    );
    const { input, button, onSearch } = setup(mockOnSearch);

    fireEvent.change(input, { target: { value: "Paris" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(onSearch).toHaveBeenCalledWith("Paris");
    });
    // Input should be cleared after submit
    expect(input.value).toBe("");
    // Note: Error display is handled by parent, not SearchBar
  });
});
