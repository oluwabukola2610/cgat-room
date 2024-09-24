import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { store } from "./src/app/store";
import { Join } from "./src/app/pages/Join";
import { ChatRoom } from "./src/app/pages/chatRoom";

import { MemoryRouter } from "react-router-dom"; // Import MemoryRouter for testing

const renderWithReduxAndRouter = (component: JSX.Element) => {
  return render(
    <Provider store={store}>
      <MemoryRouter>{component}</MemoryRouter>
    </Provider>
  );
};
describe("Join component", () => {
  test("allows user type username", () => {
    renderWithReduxAndRouter(<Join />);
    const inputElement = screen.getByPlaceholderText(/Enter username/i);
    fireEvent.change(inputElement, { target: { value: "Mary!" } });
    expect(inputElement).toHaveValue("Mary!");

    const sendButton = screen.getByRole("button", { name: /Join/i });
    fireEvent.click(sendButton);

  });
});

describe("ChatRoom component", () => {
  test("renders chat room header", () => {
    renderWithReduxAndRouter(<ChatRoom />);
    const headerElement = screen.getByText(/Chat Room/i);
    expect(headerElement).toBeInTheDocument();
  });

  test("renders sign out button", () => {
    renderWithReduxAndRouter(<ChatRoom />);
    const signOutButton = screen.getByRole("button", { name: /Sign Out/i });
    expect(signOutButton).toBeInTheDocument();
  });
});
