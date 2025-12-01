import './index.css';
import useUserSearch from '../../../../hooks/useUserSearch';
import { Search } from 'lucide-react';
import { Flex, Heading, Text, Input, VStack, InputGroup } from '@chakra-ui/react';

interface UserHeaderProps {
  userCount: number;
  setUserFilter: (search: string) => void;
}

const UsersListHeader = ({ userCount, setUserFilter }: UserHeaderProps) => {
  const { val, handleInputChange } = useUserSearch(setUserFilter);

  return (
    <Flex justify='space-between' align='center' mb='var(--spacing-lg)' wrap='wrap' gap={4}>
      <VStack align='start' gap={0}>
        <Heading size='lg' color='var(--pancake-brown-dark)' fontWeight='700'>
          Users
        </Heading>
        <Text color='var(--pancake-text-medium)' fontSize='0.95rem'>
          {userCount} {userCount === 1 ? 'user' : 'users'} found
        </Text>
      </VStack>

      <InputGroup
        width='300px'
        startElement={<Search size={18} color='var(--pancake-text-medium)' />}>
        <Input
          placeholder='Find a member...'
          value={val}
          onChange={handleInputChange}
          bg='inherit'
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
    </Flex>
  );
};

export default UsersListHeader;
