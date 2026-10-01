import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import ChatInterface from "./ChatInterface";

vi.mock("@ai-sdk/react", () => ({
  useChat: () => ({
    messages: [],
    sendMessage: vi.fn(),
    status: "ready",
    stop: vi.fn(),
  }),
}));

describe("ChatInterface", () => {
  it("renders the input and Send button", () => {
    render(<ChatInterface />);
    expect(
      screen.getByPlaceholderText(/type a sentence to translate/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send/i })).toBeInTheDocument();
  });

  it("disables Send until there's input", async () => {
    render(<ChatInterface />);
    const input = screen.getByPlaceholderText(/type a sentence to translate/i);
    await userEvent.type(input, "hello");
    expect(input).toHaveValue("hello");
  });
});
