import { useState } from 'react';
import './index.css';
import QuestionHeader from './header';
import QuestionView from './question';
import useQuestionPage from '../../../hooks/useQuestionPage';
import SaveToCollectionModal from '../collections/saveToCollectionModal';
import { PopulatedDatabaseQuestion } from '../../../types/types';
import {
  Container,
  VStack,
  Separator,
  Box,
  Text,
  Skeleton,
  SkeletonText,
  HStack,
  Flex,
} from '@chakra-ui/react';

const QuestionSkeleton = () => (
  <Box
    padding='var(--spacing-lg)'
    bg='var(--pancake-white)'
    borderRadius='2xl'
    boxShadow='var(--shadow-sm)'
    border='1px solid var(--pancake-border)'
    width='100%'>
    <Flex justify='space-between' align='center' mb='var(--spacing-sm)'>
      <HStack gap={2}>
        <Skeleton
          height='16px'
          width='80px'
          borderRadius='full'
          css={{
            '--start-color': 'var(--pancake-cream)',
            '--end-color': 'var(--pancake-cream-light)',
          }}
        />
        <Skeleton
          height='16px'
          width='120px'
          borderRadius='full'
          css={{
            '--start-color': 'var(--pancake-cream)',
            '--end-color': 'var(--pancake-cream-light)',
          }}
        />
      </HStack>
      <HStack gap={3}>
        <Skeleton
          height='24px'
          width='50px'
          borderRadius='full'
          css={{
            '--start-color': 'var(--pancake-cream)',
            '--end-color': 'var(--pancake-cream-light)',
          }}
        />
        <Skeleton
          height='24px'
          width='50px'
          borderRadius='full'
          css={{
            '--start-color': 'var(--pancake-cream)',
            '--end-color': 'var(--pancake-cream-light)',
          }}
        />
      </HStack>
    </Flex>
    <VStack align='stretch' gap='var(--spacing-sm)'>
      <Skeleton
        height='24px'
        width='70%'
        borderRadius='md'
        css={{
          '--start-color': 'var(--pancake-cream)',
          '--end-color': 'var(--pancake-cream-light)',
        }}
      />
      <SkeletonText
        mt='2'
        noOfLines={2}
        gap='3'
        css={{
          '--start-color': 'var(--pancake-cream)',
          '--end-color': 'var(--pancake-cream-light)',
        }}
      />
      <HStack mt={2}>
        <Skeleton
          height='20px'
          width='60px'
          borderRadius='full'
          css={{
            '--start-color': 'var(--pancake-cream)',
            '--end-color': 'var(--pancake-cream-light)',
          }}
        />
        <Skeleton
          height='20px'
          width='80px'
          borderRadius='full'
          css={{
            '--start-color': 'var(--pancake-cream)',
            '--end-color': 'var(--pancake-cream-light)',
          }}
        />
      </HStack>
    </VStack>
  </Box>
);

const QuestionPage = () => {
  const { qlist, setQuestionOrder, isLoading, isFirstLoad, listVersion } = useQuestionPage();

  const [collectionEditMode, setCollectionEditMode] = useState(false);
  const [isCollectionModalOpen, setCollectionModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<PopulatedDatabaseQuestion | null>(null);

  const handleQuestionClick = (question: PopulatedDatabaseQuestion) => {
    if (collectionEditMode) {
      setSelectedQuestion(question);
      setCollectionModalOpen(true);
    }
  };

  const closeCollectionModal = () => {
    setSelectedQuestion(null);
    setCollectionModalOpen(false);
  };

  return (
    <Container maxW='1000px' padding='var(--spacing-lg)' height='100vh' overflowY='auto'>
      <QuestionHeader
        setQuestionOrder={setQuestionOrder}
        collectionEditMode={collectionEditMode}
        setCollectionEditMode={setCollectionEditMode}
      />

      <Separator
        orientation='horizontal'
        size='sm'
        borderColor='var(--pancake-border)'
        my='var(--spacing-md)'
      />

      <VStack id='question_list' align='stretch' gap='var(--spacing-md)'>
        {isLoading && isFirstLoad ? (
          <>
            <QuestionSkeleton />
            <QuestionSkeleton />
            <QuestionSkeleton />
            <QuestionSkeleton />
          </>
        ) : qlist.length > 0 ? (
          qlist.map((q, index) => (
            <Box
              key={`${q._id.toString()}-${listVersion}`}
              className='question-animate-item'
              style={{ animationDelay: `${index * 0.05}s` }}>
              <QuestionView
                question={q}
                collectionEditMode={collectionEditMode}
                onCollectionClick={handleQuestionClick}
              />
            </Box>
          ))
        ) : (
          <Box
            key={`empty-${listVersion}`}
            textAlign='center'
            py={10}
            px={6}
            bg='var(--pancake-bg-light)'
            borderRadius='xl'
            border='1px dashed var(--pancake-border)'
            className='question-animate-item'
            style={{ animationDelay: '0s' }}>
            <Text fontSize='lg' fontWeight='600' color='var(--pancake-brown-dark)' mb={2}>
              No Questions Found
            </Text>
            <Text color='var(--pancake-text-medium)'>
              We couldn't find any questions matching your search. Try adjusting your filters!
            </Text>
          </Box>
        )}
      </VStack>

      {isCollectionModalOpen && selectedQuestion && (
        <SaveToCollectionModal question={selectedQuestion} onClose={closeCollectionModal} />
      )}
    </Container>
  );
};

export default QuestionPage;
