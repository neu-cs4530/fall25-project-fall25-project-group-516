import useNewCommunityButton from '../../../../hooks/useNewCommunityButton';
import { Button } from '@chakra-ui/react';
import { Plus } from 'lucide-react';

const NewCommunityButton = () => {
  const { handleClick } = useNewCommunityButton();

  return (
    <Button
      onClick={handleClick}
      bg='var(--pancake-brown-dark)'
      color='white'
      borderRadius='var(--radius-pill)'
      fontSize='sm'
      fontWeight='600'
      px={6}
      height='40px'
      display='flex'
      _hover={{
        bg: 'var(--pancake-brown-medium)',
        boxShadow: 'var(--shadow-sm)',
      }}>
      <Plus size={16} style={{ marginRight: '6px' }} />
      Create Community
    </Button>
  );
};

export default NewCommunityButton;
