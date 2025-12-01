import useCommunityPage from '../../../../hooks/useCommunityPage';
import QuestionView from '../../questionPage/question';
import {
  Box,
  Heading,
  VStack,
  Separator,
  Container,
  Text,
  Flex,
  Spinner,
  Center,
} from '@chakra-ui/react';

const CommunityPage = () => {
  const { community, communityQuestions } = useCommunityPage();

  if (!community) {
    return (
      <Center h='50vh' w='80%'>
        <Spinner size='xl' color='var(--pancake-brown-dark)' />
      </Center>
    );
  }

  return (
    <Container maxW='1000px' py='var(--spacing-lg)'>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        gap='var(--spacing-lg)'
        alignItems='flex-start'>
        <VStack flex='1' align='stretch' gap='var(--spacing-md)' width='100%'>
          <Box>
            <Heading
              size='lg'
              color='var(--pancake-brown-dark)'
              fontWeight='700'
              mb='var(--spacing-md)'>
              Questions
            </Heading>
            <Separator borderColor='var(--pancake-border)' mb='var(--spacing-lg)' opacity={0.6} />
          </Box>

          {communityQuestions.length > 0 ? (
            communityQuestions.map(q => (
              <Box key={q._id.toString()} className='user-animate-item' /* Snappy pop-in */>
                <QuestionView
                  question={q}
                  collectionEditMode={false}
                  onCollectionClick={() => {}}
                />
              </Box>
            ))
          ) : (
            <Box
              textAlign='center'
              py={16}
              bg='var(--pancake-bg-light)'
              borderRadius='2xl'
              border='1px dashed var(--pancake-border)'
              className='user-animate-item'>
              <Text fontSize='xl' fontWeight='700' color='var(--pancake-brown-dark)' mb={2}>
                No Questions Yet
              </Text>
              <Text color='var(--pancake-text-medium)'>
                Be the first to ask something in {community.name}!
              </Text>
            </Box>
          )}
        </VStack>
      </Flex>
    </Container>
  );
};

export default CommunityPage;
