import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';

const Product = ({ name, price, description, image }) => (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Box position="relative" height="200px">
            <img src={image} alt={name} width="full" height="full" objectFit="cover" />
        </Box>
        <Box p="6">
            <Heading as="h4" size="md">{name}</Heading>
            <Text>{price}</Text>
            <Text mt="2" color="gray.600">{description}</Text>
        </Box>
    </Box>
);

export default Product;
