import { getMetaData } from '../../../../tool';
import { PopulatedDatabaseQuestion } from '../../../../types/types';
import useQuestionView from '../../../../hooks/useQuestionView';
import { Eye, MessageCircleMore } from 'lucide-react';
import { Box, Flex, Text, Heading, HStack, Button, Badge, VStack } from '@chakra-ui/react';

interface QuestionProps {
  question: PopulatedDatabaseQuestion;
  collectionEditMode: boolean;
  onCollectionClick: (question: PopulatedDatabaseQuestion) => void;
}

const QuestionView = ({ question, collectionEditMode, onCollectionClick }: QuestionProps) => {
  const { clickTag, handleAnswer } = useQuestionView();

  const handleQuestionClick = () => {
    if (collectionEditMode) {
      onCollectionClick(question);
    } else if (question._id) {
      handleAnswer(question._id);
    }
  };

  return (
    <Box
      onClick={handleQuestionClick}
      position='relative'
      bg={collectionEditMode ? 'var(--pancake-cream-light)' : 'var(--pancake-white)'}
      borderWidth='2px'
      borderColor={collectionEditMode ? 'var(--pancake-brown-light)' : 'transparent'}
      borderStyle={collectionEditMode ? 'dashed' : 'solid'}
      borderRadius='2xl'
      padding='var(--spacing-lg)'
      cursor='pointer'
      transition='all 0.2s ease'
      _hover={{
        boxShadow: 'var(--shadow-sm)',
        bg: collectionEditMode ? 'var(--pancake-cream)' : 'var(--pancake-cream-light)',
      }}
      width='100%'>
      {collectionEditMode && (
        <Badge
          position='absolute'
          bottom='16px'
          right='16px'
          bg='var(--pancake-brown-medium)'
          color='white'
          px={3}
          py={1}
          borderRadius='full'
          fontSize='xs'
          boxShadow='var(--shadow-sm)'
          zIndex={2}>
          + Add to Collection
        </Badge>
      )}

      <Flex justify='space-between' align='center' mb='var(--spacing-sm)'>
        <HStack gap={2} fontSize='0.85rem' alignItems='center'>
          <HStack gap={2} alignItems='center'>
            <Text fontWeight='700' color='var(--pancake-brown-dark)'>
              {question.isAnonymous ? 'Anonymous' : question.askedBy}
            </Text>
            {!question.isAnonymous && question.premiumStatus && (
              <Badge
                display='flex'
                alignItems='center'
                justifyContent='center'
                bg='var(--pancake-accent)'
                color='white'
                fontSize='0.65rem'
                lineHeight='1'
                height='18px'
                px={2}
                borderRadius='full'
                fontWeight='700'
                letterSpacing='0.5px'
                boxShadow='0 1px 2px rgba(0,0,0,0.1)'
                textTransform='uppercase'
                mt='1px'>
                Premium
              </Badge>
            )}
          </HStack>
          <Text color='var(--pancake-text-medium)' opacity={0.8}>
            asked {getMetaData(new Date(question.askDateTime))}
          </Text>
        </HStack>

        {/* Right: Stats */}
        <HStack gap={3}>
          <Flex
            align='center'
            gap={1.5}
            bg='var(--pancake-cream-light)'
            px={3}
            py={1}
            borderRadius='full'
            color='var(--pancake-text-medium)'
            fontSize='xs'
            fontWeight='600'
            title='Answers'>
            {question.answers.length || 0} <MessageCircleMore size={14} />
          </Flex>
          <Flex
            align='center'
            gap={1.5}
            bg='var(--pancake-cream-light)'
            px={3}
            py={1}
            borderRadius='full'
            color='var(--pancake-text-medium)'
            fontSize='xs'
            fontWeight='600'
            title='Views'>
            {question.views.length} <Eye size={14} />
          </Flex>
        </HStack>
      </Flex>

      <VStack align='stretch' gap='var(--spacing-sm)'>
        <Heading
          as='h3'
          size='md'
          color='var(--pancake-brown-dark)'
          lineHeight='1.4'
          transition='color 0.2s ease'
          _groupHover={{ color: 'var(--pancake-brown-medium)' }}>
          {question.title}
        </Heading>

        <Text fontSize='0.95rem' color='var(--pancake-text-dark)' lineHeight='1.5'>
          {question.text.length > 200 ? question.text.substring(0, 200) + '...' : question.text}
        </Text>

        <HStack wrap='wrap' pt={1} gap={2}>
          {question.tags.map(tag => (
            <Button
              key={String(tag._id)}
              size='xs'
              variant='outline'
              borderRadius='full'
              borderColor='var(--pancake-border)'
              color='var(--pancake-brown-dark)'
              bg='var(--pancake-bg-light)'
              fontWeight='600'
              px={3}
              _hover={{
                bg: 'var(--pancake-cream)',
                borderColor: 'var(--pancake-brown-medium)',
              }}
              onClick={e => {
                e.stopPropagation();
                clickTag(tag.name);
              }}>
              # {tag.name}
            </Button>
          ))}
        </HStack>
      </VStack>
    </Box>
  );
};

export default QuestionView;
