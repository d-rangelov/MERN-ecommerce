import React, { useState, useEffect } from "react";
import { Button, Form, Icon, Message, Segment } from "semantic-ui-react";
import Link from "next/link";
import catchErrors from "../utils/catchErrors";

const INITIAL_USER = {
  email: "",
  password: ""
};

function Signup() {
  const [user, setUser] = useState(INITIAL_USER);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const isUser = Object.values(user).every(userProperty =>
      Boolean(userProperty)
    );

    isUser ? setDisabled(false) : setDisabled(true);
  }, [user]);

  function handleChange(event) {
    const { name, value } = event.target;
    setUser(prevState => ({ ...prevState, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setLoading(true);
      setError("");
      console.log(user);

      //Make a request to sign up user
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Message
        attached
        icon="privacy"
        header="Welcome Back!"
        content="Login with email and password"
        color="blue"
      />
      <Form error={Boolean(error)} loading={loading} onSubmit={handleSubmit}>
        <Message error header="Oops!" content={error} />
        <Segment>
          <Form.Input
            fluid
            icon="envelope"
            type="email"
            iconPosition="left"
            label="Email"
            placeholder="Email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            label="Password"
            type="password"
            placeholder="Password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />

          <Button
            icon="sing in"
            type="submit"
            color="orange"
            content="Login"
            disabled={disabled || loading}
          />
        </Segment>
      </Form>
      <Message attached="bottom" warning>
        <Icon name="help" />
        New user?{" "}
        <Link href="/signup">
          <a>Sign up here</a>
        </Link>{" "}
        instead
      </Message>
    </>
  );
}

export default Signup;
