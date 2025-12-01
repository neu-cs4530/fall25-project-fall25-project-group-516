import './index.css';
import { useNavigate } from 'react-router-dom';
import UserCardView from './userCard';
import UsersListHeader from './header';
import useUsersListPage from '../../../hooks/useUsersListPage';
import { PopulatedSafeDatabaseUser } from '../../../types/types';
import {
  Container,
  SimpleGrid,
  Box,
  Text,
  Separator,
  SkeletonCircle,
  Skeleton,
  HStack,
  VStack,
} from '@chakra-ui/react';

/* 🥞 User Card Skeleton (Unchanged) */
const UserSkeleton = () => (
  <Box
    bg='var(--pancake-white)'
    border='1px solid var(--pancake-border)'
    borderRadius='2xl'
    padding='var(--spacing-md)'>
    <HStack gap={4}>
      <SkeletonCircle
        size='12'
        css={{
          '--start-color': 'var(--pancake-cream)',
          '--end-color': 'var(--pancake-cream-light)',
        }}
      />
      <VStack align='start' gap={2} flex={1}>
        <Skeleton
          height='16px'
          width='60%'
          borderRadius='full'
          css={{
            '--start-color': 'var(--pancake-brown-light)',
            '--end-color': 'var(--pancake-cream)',
          }}
        />
        <Skeleton
          height='12px'
          width='40%'
          borderRadius='full'
          css={{
            '--start-color': 'var(--pancake-bg-light)',
            '--end-color': 'var(--pancake-cream-light)',
          }}
        />
      </VStack>
    </HStack>
  </Box>
);

interface UserListPageProps {
  handleUserSelect?: (user: PopulatedSafeDatabaseUser) => void;
}

const UsersListPage = (props: UserListPageProps) => {
  const { userList, setUserFilter } = useUsersListPage();
  /* Ideally, get isLoading from your hook */
  const isLoading = false;

  const { handleUserSelect = null } = props;
  const navigate = useNavigate();

  const handleUserCardViewClickHandler = (user: PopulatedSafeDatabaseUser): void => {
    if (handleUserSelect) {
      handleUserSelect(user);
    } else if (user.username) {
      navigate(`/user/${user.username}`);
    }
  };

  return (
    <Container maxW='1000px' padding='var(--spacing-lg)'>
      <UsersListHeader userCount={userList.length} setUserFilter={setUserFilter} />

      <Separator borderColor='var(--pancake-border)' mb='var(--spacing-lg)' opacity={0.6} />

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap='var(--spacing-md)'>
        {isLoading ? (
          <>
            {[...Array(9)].map((_, i) => (
              <UserSkeleton key={i} />
            ))}
          </>
        ) : userList.length > 0 ? (
          userList.map(user => (
            <Box
              key={user.username}
              className='user-animate-item'
              style={{ animationDelay: `0.5s` }}>
              <UserCardView
                user={user}
                handleUserCardViewClickHandler={handleUserCardViewClickHandler}
              />
            </Box>
          ))
        ) : (
          <Box
            gridColumn='1 / -1'
            textAlign='center'
            py={12}
            bg='var(--pancake-bg-light)'
            borderRadius='xl'
            border='1px dashed var(--pancake-border)'>
            <Text fontSize='lg' fontWeight='600' color='var(--pancake-brown-dark)'>
              No Users Found
            </Text>
            <Text color='var(--pancake-text-medium)'>Try searching for a different username.</Text>
          </Box>
        )}
      </SimpleGrid>
    </Container>
  );
};

export default UsersListPage;
