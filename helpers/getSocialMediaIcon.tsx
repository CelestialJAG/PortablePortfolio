import React from "react";
import {
  AiFillFacebook,
  AiFillGithub,
  AiFillLinkedin,
  AiFillTwitterCircle,
} from "react-icons/ai";
import { MdEmail } from "react-icons/md";

const getSocialIcons = (link: string) => {
  switch (link) {
    case "GitHub":
      return <AiFillGithub fontSize="1.5rem" />;
    case "LinkedIn":
      return <AiFillLinkedin />;
    case "Twitter":
      return <AiFillTwitterCircle />;
    case "Email":
      return <MdEmail />;
    default:
      return <AiFillFacebook />;
  }
};
export default getSocialIcons;
