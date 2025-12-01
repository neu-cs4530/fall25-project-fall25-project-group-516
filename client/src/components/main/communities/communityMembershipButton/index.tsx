import { DatabaseCommunity } from '../../../../types/types';
import useCommunityMembershipButton from '../../../../hooks/useCommunityMembershipButton';
import { Button, Text, VStack } from '@chakra-ui/react';

const CommunityMembershipButton = ({ community }: { community: DatabaseCommunity }) => {
  const { username, handleCommunityMembership, error } = useCommunityMembershipButton();
  const isMember = community.participants.includes(username);

  return (
    <VStack width='100%' gap={1}>
      <Button
        width='100%'
        onClick={() => handleCommunityMembership(community._id)}
        variant={isMember ? 'outline' : 'solid'}
        bg={isMember ? '#dc2626' : 'var(--pancake-brown-dark)'}
        color='white'
        border='1.5px solid'
        borderColor={isMember ? '#dc2626' : 'var(--pancake-brown-medium)'}
        borderRadius='var(--radius-pill)'
        fontSize='sm'
        height='36px'
        _hover={{
          bg: isMember ? '#dc2626' : 'var(--pancake-brown-medium)',
          borderColor: isMember ? '#dc2626' : 'var(--pancake-brown-medium)',
        }}>
        {isMember ? 'Leave' : 'Join'}
      </Button>
      {error && (
        <Text fontSize='xs' color='#dc2626' fontWeight='600'>
          {error}
        </Text>
      )}
    </VStack>
  );
};

export default CommunityMembershipButton;
