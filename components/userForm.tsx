import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Icon,
  useDisclosure,
  ScaleFade,
  Textarea,
  Heading,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AiFillLinkedin, AiFillGithub, AiFillProject } from "react-icons/ai";
import { Formik } from "formik";
import { Form } from "formik";
import ProfilePic from "./profileInput";
const UserForm = () => {
  const [inputForms, setInputForms] = useState<string[]>([]);
  const [menuItems, setMenuItems] = useState<string[]>([
    // array of strings is denoted with string[]
    "Email",
    "LinkedIn",
    "GitHub",
    "Twitter",
    "Facebook",
  ]);

  return (
    <>
      <Center h="100vh" flexDir="column">
        <Formik
          initialValues={{
            fullName: "",
            Email: "",
            GitHub: "",
            LinkedIn: "",
            Twitter: "",
            Facebook: "",
            biography: "",
            profilePic: null,
            projects: [],
            resume: null,
          }}
          validate={(values) => {
            const errors = {};
            // Look into https://dev.to/capscode/dot-and-bracket-notation-in-javascript-object-12ij
            if (!values.fullName) errors["fullName"] = "Required field";
            if (!values.biography) errors["biography"] = "Required field";
            if (!values.Email) errors["email"] = "Required";
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.Email))
              errors["Email"] = "Invalid email address";
            // Use errors.Email and touched.Email in the code to render display the error message we want
            return errors;
          }}
          onSubmit={(val, { setSubmitting }) => {
            // TODO:
            // Send to DB on submission with confirmation (return toast())
            // TODO:

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
            <Form
              style={{
                display: "flex",
                flexDirection: "column",
                width: "25rem",
                padding: "1rem",
                background: "#2D3748",
                borderRadius: "1rem",
              }}
              onSubmit={handleSubmit}
            >
              <FormControl id="name">
                <FormLabel display="flex" justifyContent="space-between">
                  Full Name
                  <Text color="red.500" mt={2}>
                    {errors.fullName &&
                      touched.fullName &&
                      errors.fullName + "*"}
                  </Text>
                </FormLabel>
                <Input
                  _focus={{ bg: "white", color: "black" }}
                  variant="filled"
                  type="text"
                  name="fullName"
                  onChange={handleChange}
                  value={values.fullName}
                />
              </FormControl>
              <FormControl mt={3} id="bio">
                <FormLabel display="flex" justifyContent="space-between">
                  Biography
                  <Text color="red.500" mt={2}>
                    {errors.biography &&
                      touched.biography &&
                      errors.biography + "*"}
                  </Text>
                </FormLabel>
                <Input
                  _focus={{ bg: "white", color: "black" }}
                  variant="filled"
                  as={Textarea}
                  name="biography"
                  onChange={handleChange}
                  value={values.biography}
                />
                <FormHelperText>
                  Give a brief introduction about yourself
                </FormHelperText>
              </FormControl>
              <FormControl mt={5}>
                <FormLabel fontSize="1.5rem">Resume</FormLabel>
                <input type="file" name="resume" onChange={handleChange} />
              </FormControl>

              <ProfilePic inputHandler={handleChange} />

              <Flex mt={10}>
                <Menu>
                  <MenuButton ml="auto" _focus={{}} as={Button}>
                    Add more social links
                  </MenuButton>
                  <MenuList>
                    {menuItems.map((option, i) => {
                      return (
                        <MenuItem
                          key={i}
                          value={option}
                          minH="48px"
                          onClick={(e) => {
                            values[e.currentTarget.value] = "";
                            menuItems.splice(
                              menuItems.indexOf(e.currentTarget.value),
                              1
                            ); //delete option from list
                            setInputForms([...inputForms, option]); //add specified text field
                          }}
                        >
                          <Icon
                            as={AiFillGithub} //Dynamically get ICON
                            boxSize="2rem"
                            borderRadius="full"
                            mr="12px"
                          />
                          <Text>{option}</Text>
                        </MenuItem>
                      );
                    })}
                  </MenuList>
                </Menu>
              </Flex>
              {inputForms.map((link, i) => (
                <FormControl key={i} mt={5}>
                  <FormLabel>{link}</FormLabel>
                  <Input
                    placeholder={link}
                    type="text"
                    value={values[link]}
                    onChange={handleChange}
                    name={link}
                  />
                </FormControl>
              ))}

              <Button ml="auto" _focus={{}} type="submit" mt={5}>
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Center>
    </>
  );
};

export default UserForm;
