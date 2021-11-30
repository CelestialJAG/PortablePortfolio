import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";

export default function UserForm2() {
  // We initially start with linkedin and github
  const [initialShareables, SetInitialShareables] = useState([
    "LinkedIn",
    "GitHub",
    // "Twitter",
  ]);
  const [shareables, Setshareables] = useState([]);

  return (
    <Center w="100%" flexDirection="column">
      <Menu>
        {/* CONDITIONAL RENDERING: */}
        {/* If initial array is empty and we've already displayed all inputs, then condition becomes false and we no longer care about what's the next condition */}
        {initialShareables.length > 0 && (
          <MenuButton as={Button}>Add a new section</MenuButton>
        )}
        <MenuList>
          {/* We loop over the initial array of social media links and display them as menu items */}
          {initialShareables.map((type, i) => (
            <MenuItem
              key={i}
              // each item has it's specific value that's relative to it's value in the array, so for github, we have MenuItem with value of 'github'
              value={type}
              onClick={(e) => {
                // Splice mutates the array and removes elements from array
                // We find the index of the current social media link, and remove it from initial array by index
                initialShareables.splice(
                  initialShareables.indexOf(e.currentTarget.value),
                  1
                );
                // We then add it to the shareable array that we want inputs for
                Setshareables([...shareables, e.currentTarget.value]);
              }}
            >
              <Icon
                as={type == "GitHub" ? AiFillGithub : AiFillLinkedin}
                borderRadius="full"
              />
              <Text>{type}</Text>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      {/* Initially this will be empty, so it displays nothing, when we change useState, this array then gets values and displays inputs based on value*/}
      {shareables.map((socialLink, i) => (
        //   whenever using map, always use key with respect to index (i)
        //   for each social media link (github/linkedin), display the following inputs below based on the social media link
        <FormControl key={i} w="20%">
          <FormLabel htmlFor={socialLink}>{socialLink}</FormLabel>
          <Input id={socialLink} />
        </FormControl>
      ))}
    </Center>
  );
}
