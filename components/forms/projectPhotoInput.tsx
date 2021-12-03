import React, { useState } from "react";
import { Box, Flex, FormLabel, Image, Input } from "@chakra-ui/react";
import photoUpload from "../../helpers/photoUpload";

export default function ProjectPic({ project }) {
  const [dp, setdp] = useState({
    file: "",
    imagePreviewUrl:
      "https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true",
    active: "edit",
  });
  return (
    <Flex flexDir="column" mt={10} textAlign="center">
      <label htmlFor="project-upload">
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
          name="projectPic"
          id="project-upload"
          type="file"
          onChange={(e) => {
            project["projectPic"] = e.currentTarget.value;
            e.preventDefault();
            const reader = new FileReader();
            const file = e.target.files[0];
            reader.onloadend = () => {
              setdp({
                //   @ts-expect-error
                file,
                //   @ts-expect-error
                imagePreviewUrl: reader.result,
              });
            };
            reader.readAsDataURL(file);
          }}
        />
      </label>
    </Flex>
  );
}
