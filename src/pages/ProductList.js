import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, List, ListItem, ListIcon, Flex, Button, Modal, ModalOverlay, ModalHeader, ModalContent, ModalBody, ModalCloseButton, FormControl, Input, FormLabel, Form } from '@chakra-ui/react';
import { getProducts } from '../API/ConsumerApi';
import Product from '../components/ProductCard';
import { addProduct } from '../API/ProducerApi';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productForm, setProductForm] = useState({
        name: '',
        price: '',
        description: '',
    });
    const handleOpenModal = () => setIsModalOpen(true);


    const handleCloseModal = () => setIsModalOpen(false);


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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await addProduct(productForm);

        console.log(res);
        handleCloseModal(); // Close the modal after successful creation
        fetchProducts()
    };
    useEffect(() => {

        fetchProducts();
    }, []);

    const renderProducts = () => {
        if (isLoading) {
            return (
                <Flex justifyContent="center" alignItems="center" height="200px">
                    <Box textAlign="center">
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
            <Box shadow="md" rounded="lg" overflow="hidden">

                <List spacing={3}>
                    {products.map((product) => (
                        <ListItem key={product.id} p={4}>
                            <Product name={product.name} price={product.price} description={product.description} />
                        </ListItem>
                    ))}
                </List>
            </Box>

        );
    };

    return (
        <Box p={4}>
            <Flex justifyContent="space-between" alignItems="center">
                <Heading as="h2" size="lg" mb={4}>
                    Products
                </Heading>
                <Button onClick={handleOpenModal}>Create New Product</Button>
            </Flex>


            {renderProducts()}
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create New Product</ModalHeader>
                    <ModalBody>
                        <form onSubmit={handleSubmit}>
                            <FormControl >
                                <FormLabel>Product Name</FormLabel>
                                <Input
                                    value={productForm.name}
                                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Product Price</FormLabel>
                                <Input
                                    type="number"
                                    value={productForm.price}
                                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Product Description</FormLabel>
                                <Input
                                    type="textarea"
                                    value={productForm.description}
                                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                                />
                            </FormControl>
                            <br />
                            <Button type="submit">Create Product</Button>
                        </form>
                    </ModalBody>
                    <ModalCloseButton />
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default ProductList;
