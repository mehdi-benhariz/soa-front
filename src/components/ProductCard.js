import { Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import React from 'react';

const Product = ({ name, price, description }) => (
    <Box shadow="md" rounded="lg" p={4}>

        <Flex direction="column" alignItems="start" justifyContent="space-between">
            <Flex maxWidth="500px">
                <Heading as="h2" size="md" mb={2} fontWeight="semibold">
                    {name}
                </Heading>
            </Flex>
            <Stack spacing={4} align="start">

                <Text fontSize="lg" fontWeight="bold">${price}</Text>
                <Text fontSize="sm" color="gray.500">{description}</Text>
                <Button variant="link" mt={2} colorScheme="blue">
                    View Details
                </Button>
            </Stack>
        </Flex>
    </ Box >
);

export default Product;
