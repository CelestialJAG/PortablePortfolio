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
import LandingPage from "./landingPage";
import UserForm from "./userForm";

const IndexPage = () => {
  return (
    <>
      {/* Landing page */}
      <LandingPage />
      <Button>hello</Button>
      <UserForm/>
    </>
  );
};

export default IndexPage;
