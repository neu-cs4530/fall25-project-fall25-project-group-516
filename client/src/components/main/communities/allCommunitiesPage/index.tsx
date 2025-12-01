import useAllCommunitiesPage from '../../../../hooks/useAllCommunitiesPage';
import CommunityCard from '../communityCard';
import NewCommunityButton from '../newCommunityButton';
import { Search } from 'lucide-react';
import {
  Container,
  SimpleGrid,
  Box,
  Heading,
  Input,
  InputGroup,
  Flex,
  Text,
  VStack,
  Separator,
} from '@chakra-ui/react';

const AllCommunitiesPage = () => {
  const { communities, search, handleInputChange, error, setError } = useAllCommunitiesPage();

  const filteredCommunities = communities.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Container maxW='1100px' padding='var(--spacing-lg)'>
      {/* Header Section */}
      <Flex justify='space-between' align='end' mb='var(--spacing-lg)' wrap='wrap' gap={4}>
        <VStack align='start' gap={0}>
          <Heading size='lg' color='var(--pancake-brown-dark)' fontWeight='700'>
            Communities
          </Heading>
          <Text color='var(--pancake-text-medium)' fontSize='0.95rem'>
            Discover and join new groups
          </Text>
        </VStack>

        <Flex gap={3} align='center' flexWrap='wrap'>
          <InputGroup
            width={{ base: '100%', sm: '300px' }}
            startElement={<Search size={18} color='var(--pancake-text-medium)' />}>
            <Input
              placeholder='Search communities...'
              value={search}
              onChange={handleInputChange}
              bg='white'
              borderRadius='var(--radius-pill)'
              borderColor='var(--pancake-border)'
              _focus={{
                borderColor: 'var(--pancake-brown-medium)',
                boxShadow: '0 0 0 3px rgba(107, 68, 35, 0.1)',
                outline: 'none',
              }}
              _hover={{
                borderColor: 'var(--pancake-brown-light)',
              }}
            />
          </InputGroup>
          <NewCommunityButton />
        </Flex>
      </Flex>

      <Separator borderColor='var(--pancake-border)' mb='var(--spacing-lg)' opacity={0.6} />

      {error && (
        <Box
          mb={6}
          p={4}
          bg='#fee2e2'
          color='#991b1b'
          borderRadius='lg'
          fontSize='sm'
          fontWeight='600'>
          {error}
        </Box>
      )}

      {/* Communities Grid */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap='var(--spacing-lg)'>
        {filteredCommunities.length > 0 ? (
          filteredCommunities.map(community => (
            <Box key={community._id.toString()}>
              <CommunityCard community={community} setError={setError} />
            </Box>
          ))
        ) : (
          <Box
            gridColumn='1 / -1'
            textAlign='center'
            py={16}
            bg='var(--pancake-bg-light)'
            borderRadius='2xl'
            border='1px dashed var(--pancake-border)'>
            <Text fontSize='xl' fontWeight='700' color='var(--pancake-brown-dark)' mb={2}>
              No Communities Found
            </Text>
            <Text color='var(--pancake-text-medium)'>
              Try adjusting your search or create a new one!
            </Text>
          </Box>
        )}
      </SimpleGrid>
    </Container>
  );
};

export default AllCommunitiesPage;
