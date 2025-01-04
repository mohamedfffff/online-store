import { Box, Button, Container, Heading, Input, useColorModeValue, VStack, useToast } from '@chakra-ui/react';
import React from 'react'
import { useState } from 'react';
import { useProductStore } from '../store/product';

const CreatePage = () => {
  const [ newProduct , setNewProduct ] = useState({
    name: '', 
    price: '',
    image: '',
  });

  const toast = useToast();
  const { createProduct } = useProductStore();
  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    // Show  message after success or fail
    if(!success) {
      toast({
        title: 'Error',
        description: message,
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }else {
      toast({
        title: 'Success',
        description: message,
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
      // Clear input fields after success
      setNewProduct({ name: '', price: '', image: '' });
    }
  }

  return (
    <Container maxW={'container.sm'}>
      <VStack spacing={8}>
        <Heading as={'h1'} size={'2xl'} textAlign={'center'} mb={8}> 
            Create New Product
        </Heading>
        <Box w={'full'} bg={useColorModeValue('white', 'gray.800')} p={6} rounded={'lg'} shadow={'md'}>
          <VStack spacing={4}>
            <Input 
              placeholder='Product Name' 
              name='name'
              value={newProduct.name} 
              onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}>
            </Input>
            <Input 
              placeholder='Product Price' 
              name='price'
              type='number'
              value={newProduct.price} 
              onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}>
            </Input>
            <Input 
              placeholder='Product Image URI' 
              name='image'
              value={newProduct.image} 
              onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}>
            </Input>
            <Button onClick={handleAddProduct} w={'full'} colorScheme='blue'>Add Product</Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default CreatePage