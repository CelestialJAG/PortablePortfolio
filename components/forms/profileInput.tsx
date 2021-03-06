import React, { useState } from "react";
import { Box, Flex, FormLabel, Image, Input } from "@chakra-ui/react";
import photoUpload from "../../helpers/photoUpload";

export default function ProfilePic({ inputHandler }) {
  const [dp, setdp] = useState({
    file: "",
    imagePreviewUrl:
      "https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true",
    active: "edit",
  });
  return (
    <Flex flexDir="column" mt={10} textAlign="center">
      <label htmlFor="photo-upload">
        <FormLabel fontSize="1.5rem" textAlign="left">
          Profile pic
        </FormLabel>
        <Image
          _hover={{ cursor: "pointer", opacity: "0.85" }}
          fit="cover"
          borderRadius="50%"
          w="10rem"
          h="10rem"
          m="0 auto"
          src={dp.imagePreviewUrl}
        />
        <input
          style={{ display: "none" }}
          name="profilePic"
          id="photo-upload"
          type="file"
          onChange={(e) => {
            // console.log(URL.createObjectUReL(e.target.files[0]));
            // console.log(e.target.files);
            // const form = new FormData();
            // form.append("file", e.target.files[0]);
            // console.log(form, "ohya");
            // fetch("http://localhost:3000/api/graphql", {
            //   method: "POST",
            //   headers: { "Content-Type": "multipart/form-data" },
            //   body: form,
            // });
            inputHandler(e);
            photoUpload(e, setdp);
          }}
        />
      </label>
    </Flex>
  );
}
