import { Link } from "@chakra-ui/react";
import React from "react";

const IndexPage = () => {
  return (
    <>
      <Link href="/api/auth/login">login</Link>
      <Link href="/api/auth/logout">logout</Link>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  const res = await fetch("http://localhost:3000/api/stats", {
    headers: { Cookie: ctx.req.headers.cookie },
  });
  const authenticatedUser = await res.json();

  //user isn't authenticated
  if ("error" in authenticatedUser) {
    return { props: {} };
  }
  //user is logged
  return {
    redirect: {
      permanent: false,
      destination: `/registration`,
    },
  };
};
export default IndexPage;
