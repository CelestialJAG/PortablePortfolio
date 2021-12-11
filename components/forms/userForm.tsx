import {
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
  Divider,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ErrorMessage, Formik } from "formik";
import { Form } from "formik";
import ProfilePic from "./profileInput";
import getSocialIcons from "../../helpers/getSocialMediaIcon";
import { useUpdate } from "react-use";
import DateInput from "./dateInput";
import ProjectPic from "./projectPhotoInput";
import getUserId from "../../helpers/getUserID";

const UserForm = ({ user }) => {
  const toast = useToast();
  const forceUpdate = useUpdate();
  const [inputForms, setInputForms] = useState<string[]>([
    "LinkedIn",
    "GitHub",
  ]);
  const [menuItems, setMenuItems] = useState<string[]>([
    // array of strings is denoted with string[]
    "Email",
    "Twitter",
    "Facebook",
  ]);

  return (
    <>
      <Center flexDir="column">
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
            if (
              inputForms.indexOf("Email") !== -1 &&
              values.Email &&
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.Email)
            )
              errors["Email"] = "Invalid email address";
            if (
              inputForms.indexOf("LinkedIn") !== -1 &&
              values.LinkedIn &&
              !/^(ftp|http|https):\/\/[^ "]+$/.test(values.LinkedIn)
            )
              errors["LinkedIn"] = "Url must start with http/https";
            if (
              inputForms.indexOf("GitHub") !== -1 &&
              values.GitHub &&
              !/^(ftp|http|https):\/\/[^ "]+$/.test(values.GitHub)
            )
              errors["GitHub"] = "Url must start with http/https";
            if (
              inputForms.indexOf("Twitter") !== -1 &&
              values.Twitter &&
              !/^(ftp|http|https):\/\/[^ "]+$/.test(values.Twitter)
            )
              errors["Twitter"] = "Url must start with http/https";
            if (
              inputForms.indexOf("Facebook") !== -1 &&
              values.Facebook &&
              !/^(ftp|http|https):\/\/[^ "]+$/.test(values.Facebook)
            )
              errors["Facebook"] = "Url must start with http/https";

            values.projects.forEach((el, i) => {
              if (
                !/^(ftp|http|https):\/\/[^ "]+$/.test(el.repoLink) ||
                !/^(ftp|http|https):\/\/[^ "]+$/.test(el.projectLink)
              )
                errors["projects"] = {
                  ...errors["projects"],
                  [i]: "Url must start with http/https",
                };
            });

            // Use errors.Email and touched.Email in the code to render display the error message we want
            return errors;
          }}
          // @ts-expect-error
          onSubmit={(val, { setSubmitting }) => {
            // TODO:
            // Send to DB on submission with confirmation (return toast())
            // TODO:
            fetch("/api/mongo", {
              method: "POST",
              body: JSON.stringify({
                data: { ...val, userID: getUserId(user) },
              }),
            });

            return toast({
              title: "Account created.",
              description: "We've created a design for you!",
              status: "success",
              duration: 4500,
              isClosable: true,
            });
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
                overflow: "auto",
                display: "flex",
                flexDirection: "column",
                width: "25rem",
                padding: "1rem",
                background: "#2D3748",
                borderRadius: "1rem",
              }}
              onSubmit={handleSubmit}
            >
              <FormControl isRequired id="name">
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
              <FormControl isRequired mt={3} id="bio">
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
              <FormControl isRequired mt={5}>
                <FormLabel fontSize="1.5rem">Resume</FormLabel>
                <input type="file" name="resume" onChange={handleChange} />
              </FormControl>
              <ProfilePic inputHandler={handleChange} />
              <Flex mt={5}>
                <Menu>
                  <MenuButton m="0 auto" _focus={{}} as={Button}>
                    Add more social links
                  </MenuButton>

                  <MenuList>
                    {menuItems.map((option: string, i) => {
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
                          {getSocialIcons(option)}
                          <Text ml={1} fontSize="1.15rem">
                            {option}
                          </Text>
                        </MenuItem>
                      );
                    })}
                  </MenuList>
                </Menu>
              </Flex>
              {inputForms.map((link, i) => (
                <FormControl isRequired key={i} mt={5}>
                  <FormLabel display="flex" justifyContent="space-between">
                    {link}

                    <Text ml="auto" color="red.500">
                      {errors[link] && touched[link] && errors[link]}
                    </Text>
                  </FormLabel>

                  <Flex>
                    <Input
                      placeholder={link}
                      type="text"
                      value={values[link]}
                      onChange={handleChange}
                      name={link}
                    />

                    <Button
                      bg="red.500"
                      _hover={{ bg: "red.600" }}
                      _focus={{}}
                      _active={{ bg: "red.700" }}
                      ml={3}
                      borderRadius="50%"
                      onClick={() => {
                        inputForms.splice(inputForms.indexOf(link), 1);
                        setMenuItems([...menuItems, link]);
                      }}
                    >
                      -
                    </Button>
                  </Flex>
                </FormControl>
              ))}
              <Divider mt={5} mb={3} />
              {/*  TODO:PROJECTS*/}
              {values.projects.map((pro: object, i) => (
                <FormControl isRequired key={i} mt={5}>
                  <FormLabel fontSize="1.25rem">Project {i + 1}</FormLabel>
                  <Input
                    onChange={(e) => {
                      pro["projectName"] = e.currentTarget.value;
                    }}
                    placeholder="Name of project"
                  />
                  <FormLabel htmlFor={`input-${i + 1}`} mt={3}>
                    Brief description of the project{" "}
                  </FormLabel>
                  <Textarea
                    onChange={(e) => {
                      pro["projectDescription"] = e.currentTarget.value;
                    }}
                    id={`input-${i + 1}`}
                    placeholder="Describe the project"
                  />

                  <FormLabel htmlFor={`projectlink-${i + 1}`} mt={3}>
                    Project link
                  </FormLabel>
                  <Input
                    id={`projectlink-${i + 1}`}
                    placeholder="https://www.google.com/"
                    onChange={(e) => {
                      pro["projectLink"] = e.currentTarget.value;
                      forceUpdate();
                    }}
                  />
                  {pro["projectLink"] &&
                    !/^(ftp|http|https):\/\/[^ "]+$/.test(
                      pro["projectLink"]
                    ) && (
                      <Text color="red.500">
                        Url must start with http/https
                      </Text>
                    )}
                  {/* TODO: */}
                  <FormLabel htmlFor={`repo-${i + 1}`} mt={3}>
                    Git Repository
                  </FormLabel>
                  <Input
                    id={`repo-${i + 1}`}
                    placeholder="https://github.com/vercel/next.js"
                    onChange={(e) => {
                      forceUpdate();
                      pro["repoLink"] = e.currentTarget.value;
                    }}
                  />
                  {pro["repoLink"] &&
                    !/^(ftp|http|https):\/\/[^ "]+$/.test(pro["repoLink"]) && (
                      <Text color="red.500">
                        Url must start with http/https
                      </Text>
                    )}

                  <FormLabel htmlFor={`dateCreated-${i + 1}`} mt={3}>
                    Created on
                  </FormLabel>
                  <DateInput currentProject={pro} />

                  <ProjectPic project={pro} />
                </FormControl>
              ))}
              {values.projects.length > 0 && (
                <Button
                  bg="red.500"
                  _hover={{ bg: "red.600" }}
                  _active={{ bg: "red.700" }}
                  _focus={{}}
                  mt={3}
                  onClick={() => {
                    values.projects.pop();
                    forceUpdate();
                  }}
                >
                  Remove project
                </Button>
              )}
              <Button
                bg="blue.500"
                _hover={{ bg: "blue.600" }}
                _active={{ bg: "blue.700" }}
                _focus={{}}
                mt={2}
                onClick={() => {
                  values.projects.push({});
                  forceUpdate();
                }}
              >
                Add project
              </Button>
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
