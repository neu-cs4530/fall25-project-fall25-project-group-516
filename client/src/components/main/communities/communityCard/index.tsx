import { DatabaseCommunity } from '../../../../types/types';
import useCommunityCard from '../../../../hooks/useCommunityCard';
import CommunityMembershipButton from '../communityMembershipButton';
import { Box, Heading, Text, HStack, Badge, Button, VStack, Flex, Icon } from '@chakra-ui/react';
import { Users, Eye, Lock } from 'lucide-react';

const CommunityCard = ({
  community,
  setError,
}: {
  community: DatabaseCommunity;
  setError: (error: string | null) => void;
}) => {
  const { handleViewCommunity } = useCommunityCard(community, setError);

  return (
    <Box
      bg='var(--pancake-white)'
      borderRadius='2xl'
      padding='var(--spacing-lg)'
      transition='all 0.2s ease'
      position='relative'
      display='flex'
      flexDirection='column'
      height='100%'
      _hover={{
        borderColor: 'var(--pancake-brown-light)',
        boxShadow: 'var(--shadow-md)',
        bg: 'var(--pancake-cream-light)',
      }}>
      <Flex justify='space-between' align='start' mb={3}>
        <Heading
          size='md'
          color='var(--pancake-brown-dark)'
          lineHeight='1.3'
          cursor='pointer'
          onClick={handleViewCommunity}
          _hover={{ color: 'var(--pancake-brown-medium)' }}>
          {community.name}
        </Heading>

        <Badge
          display='flex'
          alignItems='center'
          gap={1}
          bg='inherit'
          color='var(--pancake-brown-dark)'
          px={2}
          py={1}
          borderRadius='full'
          fontSize='xs'
          fontWeight='600'
          textTransform='uppercase'>
          <Icon as={community.visibility.toLowerCase() === 'public' ? Eye : Lock} size='sm' />

          {community.visibility}
        </Badge>
      </Flex>

      <Text fontSize='sm' color='var(--pancake-text-dark)' mb={4} lineHeight='1.6' flex='1'>
        {community.description}
      </Text>

      <VStack align='stretch' gap={4} mt='auto'>
        <HStack fontSize='xs' color='var(--pancake-text-medium)' gap={3}>
          <Flex align='center' gap={1.5}>
            <Users size={14} />
            <Text fontWeight='600'>{community.participants.length} Members</Text>
          </Flex>
          <Badge
            bg='var(--pancake-accent)'
            color='white'
            fontSize='10px'
            px={1.5}
            borderRadius='full'>
            {community.premiumCount ?? 0} Premium
          </Badge>
        </HStack>

        <HStack gap={3} width='100%'>
          <Button
            flex={1}
            onClick={handleViewCommunity}
            variant='outline'
            border='1.5px solid'
            borderColor='var(--pancake-border)'
            borderRadius='var(--radius-pill)'
            margin='0'
            fontSize='sm'
            height='36px'
            color='var(--pancake-text-medium)'
            _hover={{
              bg: 'var(--pancake-cream)',
              borderColor: 'var(--pancake-brown-medium)',
              color: 'var(--pancake-brown-dark)',
            }}>
            View
          </Button>

          <Box flex={1}>
            <CommunityMembershipButton community={community} />
          </Box>
        </HStack>
      </VStack>
    </Box>
  );
};

export default CommunityCard;
