import React, { useEffect, useLayoutEffect, useState } from "react";
import { Avatar, Flex, Image, Text } from "@chakra-ui/react";
import { faker } from "@faker-js/faker";

type HomeLeftProps = {};

type FakerData = {
  id: number;
  username: string;
  img: string;
};

const HomeLeft: React.FC<HomeLeftProps> = () => {
  const [fakerData, setFakerData] = useState<FakerData[]>([]);

  useLayoutEffect(() => {
    let i = 0;
    setFakerData([]);
    while (i < 10) {
      setFakerData((prev) => [
        ...prev,
        {
          id: i,
          username: faker.internet.userName(),
          img: faker.image.avatar(),
        },
      ]);
      i++;
    }
  }, []);

  return (
    <Flex
      w="100%"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="lg"
      bg="white"
      overflowX="scroll"
      overflowY="hidden"
      p="15px"
      gap="8px"
    >
      {fakerData.map((data) => (
        <Flex
          key={data.id}
          flexDir="column"
          align="center"
          justifyContent="center"
          cursor="pointer"
        >
          <Avatar
            src={data.img}
            w="56px"
            h="56px"
            p="1.5px"
            border="2px solid red"
          />
          <Text
            fontSize="8pt"
            textAlign="center"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            w="70px"
          >
            {data.username}
          </Text>
        </Flex>
      ))}
    </Flex>
  );
};
export default HomeLeft;
