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
// import LandingPage from "../components/landingPage";
const IndexPage = (props) => {
  return (
    <>
      {/* <Link href="/api/auth/logout">log out</Link> */}
      {/* <Link href="/api/auth/logout">log out</Link> */}
      <UserForm user={props} />
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

// 3 cases:

// case 1
// Signed in and doesn't have data
// Todo : Show button that says "create your design now!"

// case 2
// Signed in and has data
// Todo : Show button that says "check out your design now!"

// case 3
// Not signed in
// Todo : Show button "signin/register"
