import { Box, Heading, HStack, IconButton, Image, Modal, Text, useDisclosure, useToast,
         ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, VStack, Input, Button,
         ModalFooter, useColorModeValue} from '@chakra-ui/react'
import { FaPenToSquare } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import React from 'react'
import { useState } from 'react';
import { useProductStore } from '../store/product';

const ProductCard = ({product}) => {
  const bg = useColorModeValue('white', 'gray.800')
  const { deleteProduct } = useProductStore();
  const { updateProduct } = useProductStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // using useState to put the product details in the input fields when updating
  const [ updatedProduct , setUpdatedProduct ] = useState(product);

  // deleting the product
  const handleDeleteProduct = async (pId) => {
    const { success , message} = await deleteProduct(pId);
    if(!success) {
      toast({
        title: 'Error',
        description: message,
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Success',
        description: message,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }
  }

  // updating the product
  const handleUpdateProduct = async () => {
    const { success , message} = await updateProduct(updatedProduct);
    // showing update success or fail message
    if(!success) {
      toast({
        title: 'Error',
        description: message,
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Success',
        description: message,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }
    // closing the update window after updating
    onClose();
  }

  return (
    <Box
     shadow={'lg'}
     rounded={'lg'}
     overflow={'hidden'}
     transition={'all .3s'}
     bg={bg}
     _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
    >
        <Image src={product.image} alt={product.name} h={48} w={'full'}/>
        <Box p={4}>
            <Heading as={'h3'} size={'md'} mb={2}>{product.name}</Heading>
            <Text fontSize={'xl'} fontWeight={'bold'} mb={4}>${product.price}</Text>
            <HStack>
                <IconButton onClick={onOpen} icon={<FaPenToSquare />} colorScheme='blue'></IconButton>
                <IconButton 
                  icon={<RiDeleteBin6Line />} 
                  colorScheme='red' 
                  onClick={()=>handleDeleteProduct(product._id)}></IconButton>
            </HStack>
        </Box>
        {/* updating the product window */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update Product</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4}>
                <Input 
                  placeholder='Product Name' 
                  name='name'
                  value={updatedProduct.name} 
                  onChange={(e) => setUpdatedProduct({...updatedProduct, name: e.target.value})}>
                </Input>
                <Input 
                  placeholder='Product Price' 
                  name='price'
                  type='number'
                  value={updatedProduct.price} 
                  onChange={(e) => setUpdatedProduct({...updatedProduct, price: e.target.value})}>
                </Input>
                <Input 
                  placeholder='Product Image URI' 
                  name='image'
                  value={updatedProduct.image} 
                  onChange={(e) => setUpdatedProduct({...updatedProduct, image: e.target.value})}>
                </Input>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button onClick={handleUpdateProduct} w={'full'} colorScheme='blue'>Update Product</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    </Box>
  )
}

export default ProductCard