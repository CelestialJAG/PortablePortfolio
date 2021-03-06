import { Button } from "@chakra-ui/react";
import { GetServerSidePropsContext, NextPageContext } from "next";
import React from "react";
import DesignOne from "../../designs/designOne/designOne";
import { User } from "../../interfaces/types";

const user = (props) => {
  const user: User = props.user;
  return <DesignOne user={user} />;
};
export default user;
<Button> </Button>;
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { id } = ctx.params;
  const response = await fetch(
    `http://localhost:3000/api/graphql?query=${id}`,
    { method: "GET" }
  );
  const { user } = await response.json();
  return { props: { user } };
};
