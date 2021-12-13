import {
  Box,
  Button,
  Text,
  Center,
  Image,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import MoonPic from "../attachments/moon.jpeg";
import GalaxySpace from "../attachments/galaxySpace.jpeg";
import Space from "../attachments/sky.jpeg";
import { useColorMode } from "@chakra-ui/color-mode";
import { User } from "../interfaces/types";
import { BsGithub, BsLinkedin, BsFacebook } from "react-icons/bs";
import { AiOutlineTwitter } from "react-icons/ai";
import { FaFacebookSquare } from "react-icons/fa";
import Link from "next/link";

function BasicUsage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>{/*  */}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

const DesignOne = ({ user }: any) => {
  //   const { toggleColorMode, colorMode } = useColorMode();
  //   const image = React.createElement("img");
  console.log(user);
  return (
    <Center flexDir="column">
      <Center
        w="80vw"
        h="35vh"
        backgroundImage={Space.src}
        backgroundSize="cover"
        overflow="hidden"
      />
      <Center w="50%" flexDir="column">
        {/* <Image src={user[0].name} w="40px" /> */}
        (Image here)
        <Heading fontSize="2.5rem" fontFamily="Arial" fontWeight="600">
          {user?.fullName}
        </Heading>
        <Center>
          <Link href={user.LinkedIn}>
            <IconButton
              m={2}
              borderRadius="50%"
              aria-label="linkedin"
              icon={<BsLinkedin color="#006DAC" />}
            />
          </Link>
          <Link href={user.Facebook}>
            <IconButton
              m={2}
              borderRadius="50%"
              aria-label="facebook"
              icon={<BsFacebook color="blue" />}
            />
          </Link>
          <Link href={user.GitHub}>
            <IconButton
              m={2}
              borderRadius="50%"
              aria-label="github"
              icon={<BsGithub />}
            />
          </Link>
          <Link href={user.Twitter}>
            <IconButton
              m={2}
              borderRadius="50%"
              aria-label="twitter"
              icon={<AiOutlineTwitter color="#65B9E9" />}
            />
          </Link>
        </Center>
        <Text textAlign="center" mt="1.5rem" fontSize="1.25rem">
          {user.biography}
        </Text>
        <Link href="ohya">
          {/* <Button p="1.75rem" mt="2rem" colorScheme="blue" fontSize="1.75rem">
            Resume
          </Button> */}
          <BasicUsage />
        </Link>
        <Button mt="5rem">icon</Button>
      </Center>
    </Center>
  );
};
export default DesignOne;
