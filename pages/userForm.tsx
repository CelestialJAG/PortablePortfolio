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

const UserForm = ()=>{
  const [shareable, setShareable] = useState([]);
  const [dispLinkedIn, setDispLinkedIn] = useState("flex");
  const [dispGithub, setDispGithub] = useState("flex");
  var projectCount = 0;

  function addUserField(type: String, values, handleChange){
    const typeLower = type.toLowerCase();

    setShareable([...shareable,
      type==="project" ? 
      (
        <FormControl id={"project"+(projectCount++)} mt={5}>
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
      )
      :
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
    ]);
  }

  return(
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
        if (!values.fullName){
            errors.fullName = "Required";
        }
        if (!values.email) {
          errors.email = "Required";
        } 
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = "Invalid email address";
        }
        console.log(errors);
        return errors;
      }}

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

        {shareable.map((component, i)=>{
          return(<Box key={i}>{component}</Box>);
        })}

        <Flex mt={5}>
          <Menu>
            <MenuButton as={Button}>Add a new section</MenuButton>
            <MenuList>
              <MenuItem display={dispGithub} id="github-item" minH='48px' 
                onClick={()=>{
                  addUserField("GitHub", values, handleChange);
                  //setDispGithub("none");
                  console.log("added github!");
                }}
              >
                <Icon
                  as={AiFillGithub}
                  boxSize='2rem'
                  borderRadius='full'
                  mr='12px'
                />
                <Text>GitHub</Text>
              </MenuItem>
              <MenuItem display={dispLinkedIn} id="linkedin-item" minH='40px'
                onClick={()=>{
                  addUserField("LinkedIn", values, handleChange);
                  //setDispLinkedIn("none");
                  console.log("added linkedin!");
                }}
              >
                <Icon
                  as={AiFillLinkedin}
                  boxSize='2rem'
                  borderRadius='full'
                  mr='12px'
                />
                <Text>LinkedIn</Text>
              </MenuItem>
              <MenuItem id="project-item" minH='40px'
                onClick={()=>{
                  addUserField("project", values, handleChange);
                  console.log("added project!");
                }}
              >
                <Icon
                  as={AiFillProject}
                  boxSize='2rem'
                  borderRadius='full'
                  mr='12px'
                />
                <Text>Project</Text>
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        
        <Button type="submit" mt={5}>Submit</Button>
      </Form>
      )}
    </Formik>
  </Center>
  </>
  );
}

export default UserForm;