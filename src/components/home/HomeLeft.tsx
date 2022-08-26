import { Flex } from "@chakra-ui/react";
import { User } from "firebase/auth";
import React from "react";
import { useRecoilValue } from "recoil";
import { postState } from "../../atoms/postsAtom";
import Stories from "../Stories";

type HomeLeftProps = {
  user?: User | null;
};

const HomeLeft: React.FC<HomeLeftProps> = ({ user }) => {
  const postStateValue = useRecoilValue(postState);

  console.log(postStateValue);

  return (
    <Flex>
      {user && <Stories />}
      <></>
    </Flex>
  );
};
export default HomeLeft;
