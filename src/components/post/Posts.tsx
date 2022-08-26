import { Avatar, Flex, Image, Text } from "@chakra-ui/react";
import { collection, doc, getDocs, query } from "firebase/firestore";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { Post } from "../../atoms/postsAtom";
import { userDataState } from "../../atoms/userDataAtom";
import { firestore } from "../../firebase/clientApp";

type PostsProps = {};

const Posts: React.FC<PostsProps> = () => {
  const [userStateValue, setUserStateValue] = useRecoilState(userDataState);
  const postsData = userStateValue?.posts;

  const getPosts = async () => {
    const userPostDocRef = query(
      collection(firestore, `/users/${userStateValue.userData.uid}/posts`)
    );
    const postDocs = await getDocs(userPostDocRef);
    const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setUserStateValue((prev) => ({
      ...prev,
      posts: posts as Post[],
    }));
  };

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userStateValue.userData.uid]);

  //   console.log(userStateValue);

  return (
    <Flex mt={5}>
      {postsData?.map((post) => (
        <Flex flexDir="column" key={post.id}>
          <Flex align="center">
            <Avatar src={post.profileImg} mr={2} />
            <Text fontSize="10pt">{post.username}</Text>
          </Flex>
          <Image
            src={post.imageURL}
            alt=""
            w="100%"
            h="100%"
            objectFit="contain"
          />
          <Text>{post.caption}</Text>
        </Flex>
      ))}
    </Flex>
  );
};
export default Posts;
