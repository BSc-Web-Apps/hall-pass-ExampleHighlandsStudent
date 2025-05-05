import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import Task from "../components/Task"; // Adjust path as needed

// Mock any components or contexts used by Task
jest.mock("~/lib/TaskContext", () => ({
  useTasks: () => ({
    updateTask: jest.fn(),
    deleteTask: jest.fn(),
  }),
}));

describe("Task", () => {
  test("renders a task", () => {
    const task = {
      id: 1,
      title: "Test Task",
      category: "Test Category",
      isChecked: false,
    };

    render(<Task task={task} />);

    // Just check if the title is displayed
    const titleElement = screen.getByText("Test Task");
    const categoryElement = screen.getByText("Test Category");
    expect(titleElement).toBeTruthy();
    expect(categoryElement).toBeTruthy();
  });

  test("toggles completion status when pressed", () => {
    const mockToggle = jest.fn(); // Create a mock function
    const task = {
      id: 1,
      title: "Test Task",
      category: "Test Category",
      isChecked: false,
    };

    render(<Task task={task} onUpdate={mockToggle} />);

    const checkbox = screen.getByTestId("checkbox"); // Find the checkbox element

    fireEvent(checkbox, "press");

    // Check if our mock function was called
    expect(mockToggle).toHaveBeenCalled();
  });
});
