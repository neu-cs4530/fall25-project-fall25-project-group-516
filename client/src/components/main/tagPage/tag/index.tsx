import { TagData } from '../../../../types/types';
import useTagSelected from '../../../../hooks/useTagSelected';
import { Box, Text, VStack, Badge, Flex } from '@chakra-ui/react';

interface TagProps {
  t: TagData;
  clickTag: (tagName: string) => void;
}

const TagView = ({ t, clickTag }: TagProps) => {
  const { tag } = useTagSelected(t);

  return (
    <Box
      onClick={() => clickTag(t.name)}
      bg='var(--pancake-white)'
      borderRadius='2xl'
      padding='var(--spacing-lg)'
      cursor='pointer'
      position='relative'
      transition='all 0.2s ease'
      height='100%'
      display='flex'
      flexDirection='column'
      justifyContent='space-between'
      _hover={{
        borderColor: 'var(--pancake-brown-light)',
        boxShadow: 'var(--shadow-md)',
        bg: 'var(--pancake-cream-light)',
      }}>
      <VStack align='start' gap={3} mb={4}>
        <Text color='var(--pancake-brown-dark)' fontWeight='700' fontSize='lg' lineHeight='1.2'>
          #{tag.name}
        </Text>

        <Text color='var(--pancake-text-medium)' fontSize='0.9rem' lineHeight='1.5'>
          {tag.description}
        </Text>
      </VStack>

      <Flex justify='flex-start'>
        <Badge
          bg='var(--pancake-cream)'
          color='var(--pancake-brown-medium)'
          px={3}
          py={1}
          borderRadius='full'
          fontSize='xs'
          fontWeight='600'
          textTransform='lowercase'>
          {t.qcnt} {t.qcnt === 1 ? 'question' : 'questions'}
        </Badge>
      </Flex>
    </Box>
  );
};

export default TagView;
