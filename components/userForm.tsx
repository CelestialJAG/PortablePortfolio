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
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AiFillLinkedin, AiFillGithub, AiFillProject } from "react-icons/ai";
import { Formik } from "formik";
import { Form } from "formik";

const UserForm = () => {
  const [inputForms, setInputForms] = useState([]); //array of strings (types)
  const [menuItems, setMenuItems] = useState([ //array of strings (types)
    "LinkedIn",
    "GitHub",
    "Twitter",
    "Facebook",
    "Resume",
    "Project",
  ]);
  const [projCount, setProjCount] = useState(0);

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
              // Look into https://dev.to/capscode/dot-and-bracket-notation-in-javascript-object-12ij
              errors['fullName'] = "Required";
            }
            if (!values.email) {
              errors['email'] = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors['email'] = "Invalid email address";
            }

            return errors;
          }}
          onSubmit={(val, { setSubmitting }) => {
            setSubmitting(false);
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
            <Form onSubmit={handleSubmit}>
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

              {inputForms.map((component, i) => {
                if(component==="Project"){ //project section
                  setProjCount(projCount+1);
                  return(
                    <FormControl key={i} mt={5}>
                      <FormLabel>Project {projCount}</FormLabel>
                      <FormHelperText>Project name</FormHelperText>
                      <Input
                        type="text"
                        name="project-name"
                        onChange={handleChange}
                        defaultValue={values[component]} //store name of project
                      />
                      <FormHelperText>Project description</FormHelperText>
                      {/* <Input
                        h={10}
                        type="text"
                        name="project-name"
                        onChange={handleChange}
                        defaultValue={values[component]} //store name of project
                      /> */}
                    </FormControl>
                  );
                }
                else if(component==="Resume"){ //resume upload
                  return(
                    null
                  );
                }
                else{ //social links
                  return(
                    <FormControl key={i} mt={5}>
                      <FormLabel>{component}</FormLabel>
                      <Input
                        type="text"
                        name={component}
                        onChange={handleChange}
                        defaultValue={values[component]}
                      />
                      <FormHelperText>Paste your {component} account link here.</FormHelperText>
                    </FormControl>
                  );
                }
              })}

              <Flex mt={5}>
                <Menu>
                  <MenuButton as={Button}>Add a new section</MenuButton>
                  <MenuList>
                    {menuItems.map((option, i)=>{
                      return(
                        <MenuItem
                          key={i}
                          value={option}
                          minH="48px"
                          onClick={(e) => {
                            setInputForms([...inputForms, option]); //add specified text field
                            (option!=="Project") && //project option doesnt get deleted
                              menuItems.splice((menuItems.indexOf(e.currentTarget.value)), 1) //delete option from list
                            console.log("added component!");
                          }}
                        >
                          <Icon
                            as={AiFillGithub}
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

              <Button type="submit" mt={5}>
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
