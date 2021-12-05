import {
  Link,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Icon,
  IconButton,
  Text,
  Select,
  Input,
  Slide,
  ScaleFade,
  useToast,
} from "@chakra-ui/react";
import React from "react";
// import LandingPage from "./landingPage";
import UserForm from "../components/forms/userForm";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0";
import getUserId from "../helpers/getUserID";
const IndexPage = (props) => {
  const { user } = useUser();
  console.log(user);

  return "error" in props ? (
    <Link href="/api/auth/login">log in</Link>
  ) : (
    <>
      <Link href="/api/auth/logout">log out</Link>
      <UserForm />
    </>
  );
};
export const getServerSideProps = async (ctx) => {
  const res = await fetch("http://localhost:3000/api/stats", {
    headers: { Cookie: ctx.req.headers.cookie },
  });
  const user = await res.json();

  return { props: user };
};

export default IndexPage;
