import { Link as RouterLink } from 'react-router-dom';
import useRightSidebar from '../../hooks/useRightSidebar';
import useUserContext from '../../hooks/useUserContext';
import AdContainer from '../adContainer';
import { Users, Flame } from 'lucide-react';
import {
  Box,
  Heading,
  VStack,
  Text,
  Badge,
  Skeleton,
  Link,
  Separator,
  HStack,
} from '@chakra-ui/react';

const SidebarSkeleton = () => (
  <VStack align='stretch' gap={3}>
    {[1, 2, 3].map(i => (
      <HStack key={i}>
        <Skeleton
          height='12px'
          width='12px'
          borderRadius='full'
          css={{
            '--start-color': 'var(--pancake-cream)',
            '--end-color': 'var(--pancake-cream-light)',
          }}
        />
        <VStack align='start' gap={1} flex={1}>
          <Skeleton
            height='14px'
            width='70%'
            borderRadius='md'
            css={{
              '--start-color': 'var(--pancake-brown-light)',
              '--end-color': 'var(--pancake-cream)',
            }}
          />
          <Skeleton
            height='10px'
            width='40%'
            borderRadius='md'
            css={{
              '--start-color': 'var(--pancake-bg-light)',
              '--end-color': 'var(--pancake-cream-light)',
            }}
          />
        </VStack>
      </HStack>
    ))}
  </VStack>
);

const RightSidebar = () => {
  const { topCommunities, hotQuestions, loading } = useRightSidebar();
  const { user } = useUserContext();

  return (
    <Box
      w={{ base: '100%', lg: '300px' }}
      flexShrink={0}
      bg='var(--pancake-bg-light)'
      border='1px solid var(--pancake-border)'
      borderRadius='2xl'
      p='var(--spacing-lg)'
      display='flex'
      flexDirection='column'
      gap='var(--spacing-lg)'
      position='sticky'
      top='24px'
      maxH='calc(100vh - 48px)'
      margin='2rem'
      overflowY='auto'
      boxShadow='var(--shadow-sm)'>
      <Box>
        <HStack mb='var(--spacing-md)' color='var(--pancake-brown-dark)'>
          <Users size={18} />
          <Heading size='sm' fontWeight='700'>
            Top Communities
          </Heading>
        </HStack>

        {loading ? (
          <SidebarSkeleton />
        ) : topCommunities.length > 0 ? (
          <VStack align='stretch' gap={1}>
            {topCommunities.map(community => (
              <Link asChild key={community._id.toString()} _hover={{ textDecoration: 'none' }}>
                <RouterLink to={`/communities/${community._id}`}>
                  <Box
                    p={2}
                    borderRadius='md'
                    transition='all 0.2s ease'
                    width='100%'
                    _hover={{ bg: 'var(--pancake-white)', boxShadow: 'var(--shadow-sm)' }}>
                    <Text fontSize='sm' fontWeight='600' color='var(--pancake-text-dark)'>
                      {community.name}
                    </Text>
                    <Text fontSize='xs' color='var(--pancake-text-medium)'>
                      {community.participants.length} members
                    </Text>
                  </Box>
                </RouterLink>
              </Link>
            ))}
          </VStack>
        ) : (
          <Text fontSize='sm' color='var(--pancake-text-medium)' fontStyle='italic'>
            No communities yet
          </Text>
        )}
      </Box>

      <Separator borderColor='var(--pancake-border)' opacity={0.6} />

      {/* --- Hot Questions Section --- */}
      <Box>
        <HStack mb='var(--spacing-md)' color='#dc2626'>
          <Flame size={18} />
          <Heading size='sm' fontWeight='700' color='var(--pancake-brown-dark)'>
            Hot Questions
          </Heading>
        </HStack>

        {loading ? (
          <SidebarSkeleton />
        ) : hotQuestions.length > 0 ? (
          <VStack align='stretch' gap={1}>
            {hotQuestions.map(question => (
              <Link asChild key={question._id.toString()} _hover={{ textDecoration: 'none' }}>
                <RouterLink to={`/question/${question._id}`}>
                  <Box
                    p={2}
                    borderRadius='md'
                    transition='all 0.2s ease'
                    _hover={{ bg: 'var(--pancake-white)', boxShadow: 'var(--shadow-sm)' }}>
                    <Text
                      fontSize='sm'
                      fontWeight='500'
                      color='var(--pancake-text-dark)'
                      lineHeight='1.4'
                      mb={1}>
                      {question.title}
                    </Text>
                    <Badge
                      bg='var(--pancake-cream)'
                      color='var(--pancake-brown-medium)'
                      fontSize='10px'
                      px={1.5}
                      borderRadius='full'>
                      {question.views.length} views
                    </Badge>
                  </Box>
                </RouterLink>
              </Link>
            ))}
          </VStack>
        ) : (
          <Text fontSize='sm' color='var(--pancake-text-medium)' fontStyle='italic'>
            No hot questions yet
          </Text>
        )}
      </Box>

      {/* --- Ad Section --- */}
      {!user.premiumProfile && (
        <Box
          mt='auto'
          borderRadius='xl'
          overflow='hidden'
          border='1px solid var(--pancake-border)'
          bg='var(--pancake-white)'
          display='flex'
          justifyContent='center'
          p={2}>
          <AdContainer adKey='7beebaa8acee60713ef045584ce68a7b' width={300} height={250} />
        </Box>
      )}
    </Box>
  );
};

export default RightSidebar;
