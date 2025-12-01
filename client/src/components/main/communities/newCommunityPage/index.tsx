import useNewCommunityPage from '../../../../hooks/useNewCommunityPage';
import { Box, Heading, Input, Button, VStack, Text, Checkbox, Container } from '@chakra-ui/react';

const NewCommunityPage = () => {
  const {
    name,
    setName,
    description,
    setDescription,
    isPublic,
    setIsPublic,
    error,
    handleNewCommunity,
  } = useNewCommunityPage();

  return (
    <Container maxW='600px' py={10}>
      <Box
        bg='var(--pancake-white)'
        p={8}
        borderRadius='2xl'
        boxShadow='lg'
        border='1px solid var(--pancake-border)'>
        <Heading size='lg' mb={6} textAlign='center' color='var(--pancake-brown-dark)'>
          Create a New Community
        </Heading>

        <VStack gap={5} align='stretch'>
          <Box>
            <Text fontWeight='600' mb={2} color='var(--pancake-text-dark)'>
              Community Name
            </Text>
            <Input
              placeholder='e.g. Pancake Lovers'
              value={name}
              onChange={e => setName(e.target.value)}
              bg='white'
              borderRadius='md'
              _focus={{
                borderColor: 'var(--pancake-brown-medium)',
                boxShadow: '0 0 0 1px var(--pancake-brown-medium)',
              }}
            />
          </Box>

          <Box>
            <Text fontWeight='600' mb={2} color='var(--pancake-text-dark)'>
              Description
            </Text>
            <Input
              placeholder='What is this community about?'
              value={description}
              onChange={e => setDescription(e.target.value)}
              bg='white'
              borderRadius='md'
              _focus={{
                borderColor: 'var(--pancake-brown-medium)',
                boxShadow: '0 0 0 1px var(--pancake-brown-medium)',
              }}
            />
          </Box>

          <Checkbox.Root
            checked={isPublic}
            onCheckedChange={() => setIsPublic(!isPublic)}
            fontWeight='500'>
            <Checkbox.HiddenInput />
            <Checkbox.Label>Make this community Public</Checkbox.Label>
            <Checkbox.Control />
          </Checkbox.Root>

          {error && (
            <Text color='red.500' fontSize='sm' fontWeight='bold'>
              {error}
            </Text>
          )}

          <Button
            onClick={handleNewCommunity}
            bg='var(--pancake-brown-dark)'
            color='white'
            size='lg'
            borderRadius='full'
            mt={2}
            _hover={{ bg: 'var(--pancake-brown-medium)' }}>
            Create Community
          </Button>
        </VStack>
      </Box>
    </Container>
  );
};

export default NewCommunityPage;
