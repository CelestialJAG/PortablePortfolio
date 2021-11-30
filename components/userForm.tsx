import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Image,
  Select,
  Text,
  Icon,
  useDisclosure,
  ScaleFade,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AiFillLinkedin, AiFillGithub, AiFillProject } from "react-icons/ai";
import { Formik } from "formik";
import { Form } from "formik";

const UserForm = () => {
  const [shareable, setShareable] = useState([]);
  const [dispLinkedIn, setDispLinkedIn] = useState("flex");
  const [dispGithub, setDispGithub] = useState("flex");
  var projectCount = 0; // Big nono in React, we only do useState in React land

  //   FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:
  function addUserField(type: String, values, handleChange) {
    const typeLower = type.toLowerCase();

    // Problem: Let's break this down for a sec. You pass in a type of input with the values so that you change them, then pushed the html elements in an array and looped thru the array and displayed each element in the array,
    // Solution: Instead of pushing html elements into array and rendering elements from array, it would be better if you pushed a bunch of objects/strings into the array, then loop thru array, iterate over each object/string, and rendering it's properties in html elements.

    // Check file: userForm2.tsx

    setShareable([
      ...shareable,
      type === "project" ? (
        <FormControl id={"project" + projectCount++} mt={5}>
          <FormLabel>Project {projectCount}</FormLabel>
          <FormHelperText>Project name</FormHelperText>
          <Input
            type="text"
            name={typeLower}
            onChange={handleChange}
            defaultValue={values.projects[projectCount]}
          />
          <FormHelperText>Project description</FormHelperText>
          <Input
            type="text"
            name={typeLower}
            onChange={handleChange}
            defaultValue={values.projects[projectCount]}
          />
        </FormControl>
      ) : (
        <FormControl id={typeLower} mt={5}>
          <FormLabel>{type}</FormLabel>
          <Input
            type="text"
            name={typeLower}
            onChange={handleChange}
            defaultValue={values[typeLower]}
          />
          <FormHelperText>Paste your {type} account link here.</FormHelperText>
        </FormControl>
      ),
    ]);
  }

  //   FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:

  return (
    <>
      <Center flexDir="column">
        <Formik
          initialValues={{
            fullName: "",
            email: "",
            linkedin: "",
            github: "",
            projects: [],
            resume: null,
          }}
          validate={(values) => {
            const errors = {};
            if (!values.fullName) {
              // FIXME:FIXME:FIXME:FIXME:
              // Always use square bracket notation when adding properties to an object since dot notation will return 'undefined'
              // Look into https://dev.to/capscode/dot-and-bracket-notation-in-javascript-object-12ij
              // FIXME:FIXME:FIXME:FIXME:
              errors.fullName = "Required";
            }
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }

            return errors;
          }}
          onSubmit={(val, { setSubmitting }) => {
            setSubmitting(false);
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
              </FormControl>

              <FormControl id="email" mt={5}>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                />
                <FormHelperText>We'll never share your email.</FormHelperText>
              </FormControl>

              {shareable.map((component, i) => {
                return <Box key={i}>{component}</Box>;
              })}

              <Flex mt={5}>
                <Menu>
                  <MenuButton as={Button}>Add a new section</MenuButton>
                  <MenuList>
                    <MenuItem
                      // FIXME:FIXME:FIXME:FIXME:
                      // Instead of changing display style whenever you click, try doing conditional rendering
                      // FOR EXAMPLE: dispGithub && <MenuItem>blah blah</MenuItem>
                      // The above line means: if dispGithub is true, continue to next condition, if next condition doesn't resolve to boolean value, render it
                      // FIXME:FIXME:FIXME:FIXME:
                      display={dispGithub}
                      id="github-item"
                      minH="48px"
                      onClick={() => {
                        addUserField("GitHub", values, handleChange);
                        //setDispGithub("none");
                        console.log("added github!");
                      }}
                    >
                      <Icon
                        as={AiFillGithub}
                        boxSize="2rem"
                        borderRadius="full"
                        mr="12px"
                      />
                      <Text>GitHub</Text>
                    </MenuItem>
                    <MenuItem
                      // FIXME:FIXME:FIXME:FIXME:
                      //Refer to line 152–156
                      // FIXME:FIXME:FIXME:FIXME:
                      display={dispLinkedIn}
                      id="linkedin-item"
                      minH="40px"
                      onClick={() => {
                        addUserField("LinkedIn", values, handleChange);
                        //setDispLinkedIn("none");
                        console.log("added linkedin!");
                      }}
                    >
                      <Icon
                        as={AiFillLinkedin}
                        boxSize="2rem"
                        borderRadius="full"
                        mr="12px"
                      />
                      <Text>LinkedIn</Text>
                    </MenuItem>
                    <MenuItem
                      id="project-item"
                      minH="40px"
                      onClick={() => {
                        addUserField("project", values, handleChange);
                        console.log("added project!");
                      }}
                    >
                      <Icon
                        as={AiFillProject}
                        boxSize="2rem"
                        borderRadius="full"
                        mr="12px"
                      />
                      <Text>Project</Text>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Flex>

              <Button type="submit" mt={5}>
                Submit
              </Button>
            </form>
          )}
        </Formik>
      </Center>
    </>
  );
};

export default UserForm;
