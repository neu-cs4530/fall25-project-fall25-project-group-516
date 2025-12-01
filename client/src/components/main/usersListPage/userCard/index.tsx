import { PopulatedSafeDatabaseUser } from '../../../../types/types';
import { Box, Text, VStack } from '@chakra-ui/react';

interface UserProps {
  user: PopulatedSafeDatabaseUser;
  handleUserCardViewClickHandler: (user: PopulatedSafeDatabaseUser) => void;
}

const UserCardView = ({ user, handleUserCardViewClickHandler }: UserProps) => {
  return (
    <Box
      onClick={() => handleUserCardViewClickHandler(user)}
      bg='var(--pancake-white)'
      borderRadius='2xl'
      padding='var(--spacing-md)'
      cursor='pointer'
      transition='all 0.2s ease'
      height='100%'
      _hover={{
        boxShadow: 'var(--shadow-md)',
        bg: 'var(--pancake-cream-light)',
      }}>
      <VStack align='start' gap={0}>
        <Text fontWeight='700' color='var(--pancake-brown-dark)' fontSize='md' lineHeight='1.2'>
          {user.username}
        </Text>
        <Text fontSize='xs' color='var(--pancake-text-medium)' fontWeight='500'>
          Joined {new Date(user.dateJoined).toLocaleDateString()}
        </Text>
      </VStack>
    </Box>
  );
};

export default UserCardView;
