import React from "react";
import { render,screen } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";
import userEvent from '@testing-library/user-event'
// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
    render(<CheckoutForm />)
    const header = screen.getByText(/checkout form/i)
    expect(header).toBeInTheDocument()
});

test("form shows success message on submit with form details", async() => {
    render(<CheckoutForm />);

    const address = screen.getByLabelText(/address/i)
    const submit = screen.getByRole("button");

    userEvent.type(address,"Portland");
    userEvent.click(submit);

    const success = await screen.findByTestId('successMessage')
    expect(success).toBeInTheDocument();
    expect(screen.getByText(/portland/i)).toBeInTheDocument()
});
