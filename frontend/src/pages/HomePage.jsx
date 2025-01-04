import { Container, VStack, Text, SimpleGrid } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import React, { useEffect } from 'react'
import { useProductStore } from '../store/product'
import ProductCard from '../appComponents/ProductCard'

const HomePage = () => {
  // fetching data from the ProductStore
  const { fetchProducts , products } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);  

  return (
    <Container maxW={'container.xl'} py={12}>
      <VStack spacing={8}>

        {/* Displaying the title of the page */}
        <Text
          fontSize={'30'}
          fontWeight={'bold'}
          textAlign={'center'}
          bgClip={'text'}
          bgGradient={'linear(to-r, cyan.400, blue.500)'}
        >
          Current Products 🚀
        </Text>

        {/* Displaying the products grid */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w={'full'}>
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>

        {/* Displaying a message if no products are found */}
        {products.length === 0 && (
          <Text
          fontSize={'xl'}
          fontWeight={'bold'}
          textAlign={'center'}
          color={'gray.500'}
          >
            No Products Found 😢 {' '}
            <Link to={'/create'} >{/* Link to the create page if no products found*/}
              <Text as={'span'} color={'blue.500'} _hover={{textDecoration: 'underline'}}>
                create a product
              </Text>
            </Link>
          </Text>
        )}

      </VStack>
    </Container>
  )
}

export default HomePage