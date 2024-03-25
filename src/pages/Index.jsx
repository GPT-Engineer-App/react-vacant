import React from "react";
import { Box, Heading, Text, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Index = () => {
  return (
    <Box>
      <Heading>D&D Character Creator</Heading>
      <Text mt={4}>
        <Link as={RouterLink} to="/create-character">
          Create a New Character
        </Link>
      </Text>
    </Box>
  );
};

export default Index;
