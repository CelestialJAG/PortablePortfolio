import UserForm from "../components/forms/userForm";
import getUserId from "../helpers/getUserID";
import Router from "next/router";

const Registration = (props) => {
  return <UserForm user={getUserId(props)} />;
};
export default Registration;

export const getServerSideProps = async (ctx) => {
  const res = await fetch("http://localhost:3000/api/stats", {
    headers: { Cookie: ctx.req.headers.cookie },
  });
  const authenticatedUser = await res.json();

  //API CALL TO DATABASE TO CHECK IF USER ALREADY EXISTS IN DATABASE

  const response = await fetch(
    `http://localhost:3000/api/graphql?query=${getUserId(authenticatedUser)}`,
    {
      method: "GET",
    }
  );
  const { user } = await response.json();
  // if doesn't exist in database then==>   data = undefined
  // else then==>   data = {blahblah:blhblah}

  if (user) {
    return {
      redirect: {
        permanent: false,
        destination: `/user/${getUserId(authenticatedUser)}`,
      },
    };
  } else {
    return { props: { ...authenticatedUser } };
  }
};
