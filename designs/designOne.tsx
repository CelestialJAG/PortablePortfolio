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
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";
import React, { useState } from "react";
import MoonPic from "../attachments/moon.jpeg";
import GalaxySpace from "../attachments/galaxySpace.jpeg";
import Space from "../attachments/sky.jpeg";
import { useColorMode } from "@chakra-ui/color-mode";
import { User } from "../interfaces/types";
import { BsGithub, BsLinkedin, BsFacebook } from "react-icons/bs";
import { AiOutlineTwitter } from "react-icons/ai";
import { FaFacebookSquare } from "react-icons/fa";
import Link from "next/link";
import { Document, Page } from "react-pdf";

function BasicUsage({ resume }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    // <>
    // <>

    //   <Modal isOpen={isOpen} onClose={onClose}>
    //     <ModalOverlay />
    //     <ModalContent>
    //       <ModalHeader>Modal Title</ModalHeader>
    //       <ModalCloseButton />
    //       <ModalBody>
    //         <Heading>ohya</Heading>
    //       </ModalBody>

    //       <ModalFooter>
    //         <Button colorScheme="blue" mr={3} onClick={onClose}>
    //           Close
    //         </Button>
    //         <Button variant="ghost">Secondary Action</Button>
    //       </ModalFooter>
    //     </ModalContent>
    //   </Modal>
    // </>
    <>
      <Button onClick={onOpen}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="red">
          <ModalBody bg="red">
            <Heading>ohya</Heading>
            {/*  */}
            <Document file={resume} onLoadSuccess={onDocumentLoadSuccess}>
              {/* <Page pageNumber={pageNumber} /> */}
            </Document>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
    // </>
  );
}

const DesignOne = ({ user }: any) => {
  console.log(user);
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
        {/* <Link href="ohya"> */}
        {/* <Button p="1.75rem" mt="2rem" colorScheme="blue" fontSize="1.75rem">
            Resume
          </Button> */}
        <BasicUsage resume={user.resume} />
        {/* </Link> */}
        <Button mt="5rem">icon</Button>
      </Center>
    </Center>
  );
};
export default DesignOne;
