import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, List, ListItem, ListIcon, Flex } from '@chakra-ui/react';
import { getProducts } from '../API/ConsumerApi';
import Product from '../components/ProductCard';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const data = await getProducts()
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const renderProducts = () => {
        if (isLoading) {
            return (
                <Flex justifyContent="center" alignItems="center" height="200px">
                    <Box textAlign="center">
                        {/* <AiOutlineLoading aria-label="Loading" size="40px" /> */}
                        <Text fontSize="md">Loading products...</Text>
                    </Box>
                </Flex>
            );
        }

        if (error) {
            return (
                <Box textAlign="center" height="200px">
                    <Text fontSize="md" color="red.500">
                        Error fetching products: {error}
                    </Text>
                </Box>
            );
        }

        return (
            <List spacing={3}>
                {products.map((product) => (
                    <ListItem key={product.id}>
                        <Product />
                    </ListItem>
                ))}
            </List>
        );
    };

    return (
        <Box p={4}>
            <Heading as="h2" size="lg" mb={4}>
                Products
            </Heading>
            {renderProducts()}
        </Box>
    );
};

export default ProductList;
