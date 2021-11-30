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

const LandingPage = () => {
  const { user, error, isLoading } = useUser();

  return user ? (
    <Center flexDir="column">
      <Formik
        initialValues={{
          fullName: "",
          email: "",
          linkedIn: "",
          others: "",
          resume: null,
        }}
        // validate={(values) => {
        //   const errors = {};
        //   if (!values.email) {
        //     errors.email = "Required";
        //   } else if (
        //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        //   ) {
        //     errors.email = "Invalid email address";
        //   }
        //   return errors;
        // }}

        onSubmit={(val, { setSubmitting }) => {
          console.log(val);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <FormControl id="name">
              <FormLabel>Full Name</FormLabel>
              <Input
                type="text"
                name="fullName"
                onChange={handleChange}
                value={values.fullName}
              />
              <FormHelperText>We'll never share your name.</FormHelperText>
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                onChange={handleChange}
                value={values.email}
              />
              <FormHelperText>We'll never share your email.</FormHelperText>
            </FormControl>
            <button type="submit">Submit</button>
          </form>
        )}
      </Formik>
    </Center>
  ) :
   <Flex bg="gray.700" p={5} w="100%" justifyContent="flex-end">
    <Center>
      {/* <Button> */}

      <Link href="/api/auth/login">Click me</Link>
      {/* </Button> */}
    </Center>
  </Flex>

  null;
};

export default LandingPage;
