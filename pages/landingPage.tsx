import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Link,
} from "@chakra-ui/react";
import { useUser } from "@auth0/nextjs-auth0";
import React, { useState } from "react";
import { Formik } from "formik";
import UserForm from "../components/userForm";
import Profile from "../components/profileInput";

const LandingPage = () => {
  const { user, error, isLoading } = useUser();

  return user ? <UserForm /> : null;
};

export default LandingPage;
