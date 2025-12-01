import TagView from './tag';
import useTagPage from '../../../hooks/useTagPage';
import AskQuestionButton from '../askQuestionButton';
import {
  Container,
  SimpleGrid,
  Flex,
  Heading,
  Text,
  Box,
  VStack,
  Separator,
} from '@chakra-ui/react';

const TagPage = () => {
  const { tlist, clickTag } = useTagPage();

  return (
    <Container maxW='1000px' padding='var(--spacing-lg)'>
      <Flex justify='space-between' align='center' mb='var(--spacing-lg)'>
        <VStack align='start' gap={0}>
          <Heading size='lg' color='var(--pancake-brown-dark)' fontWeight='700'>
            All Tags
          </Heading>
          <Text color='var(--pancake-text-medium)' fontSize='0.95rem'>
            {tlist.length} {tlist.length === 1 ? 'topic' : 'topics'} found
          </Text>
        </VStack>

        <AskQuestionButton />
      </Flex>

      <Separator borderColor='var(--pancake-border)' mb='var(--spacing-lg)' opacity={0.6} />

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} gap='var(--spacing-md)'>
        {tlist.map(t => (
          <Box key={t.name} className='question-animate-item' style={{ animationDelay: `0.5s` }}>
            <TagView t={t} clickTag={clickTag} />
          </Box>
        ))}
      </SimpleGrid>

      {tlist.length === 0 && (
        <Box textAlign='center' py={12} color='var(--pancake-text-medium)'>
          No tags available yet. Be the first to start a new topic!
        </Box>
      )}
    </Container>
  );
};

export default TagPage;
