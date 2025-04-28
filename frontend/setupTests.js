import { vi, expect } from "vitest";
import * as matchers from "@testing-library/jest-dom/matchers";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

expect.extend(matchers);

// Bereinigt DOM nach jedem Test
afterEach(() => {
  cleanup();
});

// Axios vollständig mocken
vi.mock("axios", () => {
  return {
    default: {
      get: vi.fn(() =>
        Promise.resolve({
          data: [{ id: 1, task: "Mocked Task 1" }, { id: 2, task: "Mocked Task 2" }],
        })
      ),
      post: vi.fn(() =>
        Promise.resolve({
          data: { message: "Task added successfully" },
        })
      ),
      delete: vi.fn(() =>
        Promise.resolve({
          data: { message: "Task deleted successfully" },
        })
      ),
    },
  };
});