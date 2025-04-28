import { expect } from "vitest";
import * as matchers from "@testing-library/jest-dom/matchers";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

expect.extend(matchers);

// Bereinigt DOM nach jedem Test
afterEach(() => {
  cleanup();
});