import { useState } from 'react';
import useCommunityPage from '../../hooks/useCommunityPage';
import CommunityMembershipButton from '../main/communities/communityMembershipButton';
import ReportUserModal from '../main/communities/reportUserModal';
import { Shield, Flag } from 'lucide-react';
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Badge,
  Separator,
  IconButton,
} from '@chakra-ui/react';

const CommunitySidebar = () => {
  const { community, username, handleDashboardRedirect } = useCommunityPage();
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportedUser, setReportedUser] = useState<string>('');

  const handleReportUser = (usernameToReport: string) => {
    setReportedUser(usernameToReport);
    setReportModalOpen(true);
  };

  if (!community) {
    return null;
  }

  return (
    <>
      <Box
        w={{ base: '100%', md: '300px' }}
        flexShrink={0}
        bg='var(--pancake-bg-light)'
        border='1px solid var(--pancake-border)'
        borderRadius='2xl'
        p='var(--spacing-lg)'
        display='flex'
        flexDirection='column'
        gap='var(--spacing-md)'
        position='sticky'
        top='24px' /* Sticks to top while scrolling */
        maxH='calc(100vh - 48px)'
        margin='2rem'
        boxShadow='var(--shadow-sm)'>
        {/* Header Info */}
        <Heading size='lg' color='var(--pancake-brown-dark)' fontWeight='700' lineHeight='1.2'>
          {community.name}
        </Heading>

        <Text color='var(--pancake-text-dark)' fontSize='sm' lineHeight='1.5'>
          {community.description}
        </Text>

        {/* Action Buttons */}
        <VStack width='100%' gap={3}>
          {community.admin !== username && (
            <Box width='100%'>
              <CommunityMembershipButton community={community} />
            </Box>
          )}

          {(community.admin === username || community.moderators?.includes(username)) && (
            <Button
              width='100%'
              onClick={() => handleDashboardRedirect()}
              bg='var(--pancake-brown-dark)'
              color='white'
              borderRadius='var(--radius-pill)'
              fontSize='sm'
              height='48px'
              display='flex'
              _hover={{
                bg: 'var(--pancake-brown-medium)',
                boxShadow: 'var(--shadow-sm)',
              }}
              _active={{ transform: 'scale(0.98)' }}>
              <Shield size={16} style={{ marginRight: '8px' }} />
              Manage Community
            </Button>
          )}
        </VStack>

        <Separator borderColor='var(--pancake-border)' opacity={0.6} my={2} />

        <Box flex='1' overflow='hidden' display='flex' flexDirection='column'>
          <Heading size='sm' color='var(--pancake-text-dark)' fontWeight='700' mb={1}>
            Members ({community.participants.length})
          </Heading>

          <Text fontSize='xs' color='var(--pancake-text-medium)' mb={3}>
            Premium: {community.premiumCount ?? 0} • Non-Premium: {community.nonPremiumCount ?? 0}
          </Text>

          <Box overflowY='auto' flex='1' pr={1}>
            <VStack align='stretch' gap={1}>
              {community.participants.map(participantUsername => {
                const isAdmin = community.admin === participantUsername;
                const isModerator = !isAdmin && community.moderators?.includes(participantUsername);

                return (
                  <HStack
                    key={participantUsername}
                    p={2}
                    borderRadius='md'
                    bg='var(--pancake-white)'
                    border='1px solid transparent'
                    transition='all 0.2s'
                    height='50px'
                    _hover={{
                      bg: 'var(--pancake-cream)',
                      borderColor: 'var(--pancake-border)',
                    }}>
                    {/* Role Badges */}
                    {isAdmin && (
                      <Badge bg='var(--pancake-accent)' color='white' fontSize='10px'>
                        ADMIN
                      </Badge>
                    )}
                    {isModerator && (
                      <Badge bg='var(--pancake-brown-light)' color='white' fontSize='10px'>
                        MOD
                      </Badge>
                    )}

                    <Text fontSize='sm' fontWeight='600' color='var(--pancake-brown-dark)' flex='1'>
                      {participantUsername}
                    </Text>

                    {/* Report Button */}
                    {username &&
                      username !== participantUsername &&
                      !isAdmin &&
                      !isModerator &&
                      community.participants.includes(username) && (
                        <IconButton
                          aria-label={`Report ${participantUsername}`}
                          variant='ghost'
                          size='xs'
                          color='var(--pancake-text-medium)'
                          _hover={{ color: '#dc2626', bg: '#fee2e2' }}
                          margin='0'
                          alignSelf='center'
                          onClick={() => handleReportUser(participantUsername)}>
                          <Flag size={14} />
                        </IconButton>
                      )}
                  </HStack>
                );
              })}
            </VStack>
          </Box>
        </Box>
      </Box>

      {reportModalOpen && username && (
        <ReportUserModal
          communityId={community._id.toString()}
          reportedUsername={reportedUser}
          reporterUsername={username}
          onClose={() => setReportModalOpen(false)}
          onSuccess={() => {
            // Optional refresh logic
          }}
        />
      )}
    </>
  );
};

export default CommunitySidebar;
