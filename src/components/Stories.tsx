import { Flex, Avatar, Text } from "@chakra-ui/react";
import { faker } from "@faker-js/faker";
import React, { useLayoutEffect, useState } from "react";

type FakerData = {
  username: string;
  img: string;
};

const Stories: React.FC = () => {
  const [fakerData, setFakerData] = useState<FakerData[]>([]);

  useLayoutEffect(() => {
    let i = 0;
    setFakerData([]);
    while (i < 10) {
      setFakerData((prev) => [
        ...prev,
        {
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
      {fakerData.map((data, i) => (
        <Flex
          key={i}
          flexDir="column"
          align="center"
          justifyContent="center"
          cursor="pointer"
        >
          <Flex
            w="66px"
            h="66px"
            p="3px"
            borderRadius="full"
            bg="linear-gradient(45deg, rgb(255,230,0), #ffa600, rgb(255,0,128), #d4217b, rgb(43, 62, 167))"
          >
            <Avatar
              src={data.img}
              w="100%"
              h="100%"
              border="2px solid #ffffff"
            />
          </Flex>
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
export default Stories;
