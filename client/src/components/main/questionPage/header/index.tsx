import { OrderType } from '../../../../types/types';
import { orderTypeDisplayName } from '../../../../types/constants';
import AskQuestionButton from '../../askQuestionButton';
import { Button, createListCollection, Select, Flex, HStack, Portal } from '@chakra-ui/react';

interface QuestionHeaderProps {
  setQuestionOrder: (order: OrderType) => void;
  collectionEditMode: boolean;
  setCollectionEditMode: (mode: boolean) => void;
}

const ORDER_OPTIONS = Object.entries(orderTypeDisplayName).map(([value, label]) => ({
  value: value,
  label: label,
}));

const QuestionHeader = ({
  setQuestionOrder,
  collectionEditMode,
  setCollectionEditMode,
}: QuestionHeaderProps) => (
  <Flex
    justify='space-between'
    align='center'
    paddingRight='var(--spacing-lg)'
    gap='var(--spacing-md)'>
    <Select.Root
      collection={createListCollection({ items: ORDER_OPTIONS })}
      defaultValue={['newest']}
      width='fit-content'
      positioning={{ sameWidth: true, placement: 'bottom-start' }}
      onValueChange={e => setQuestionOrder(e.value[0] as OrderType)}>
      <Select.Trigger
        borderRadius='var(--radius-pill)'
        bg='inherit'
        width='fit-content'
        padding='0 1.25rem'
        height='44px'
        fontSize='15px'
        fontWeight='600'
        color='var(--pancake-brown-dark)'
        transition='all 0.2s ease'
        cursor='pointer'
        display='flex'
        alignItems='center'
        _hover={{
          bg: 'var(--pancake-cream)',
          borderColor: 'var(--pancake-brown-medium)',
          boxShadow: 'var(--shadow-sm)',
        }}>
        <Select.ValueText placeholder='Sort by...' />

        <Select.Indicator color='var(--pancake-brown-medium)' />
      </Select.Trigger>

      <Portal>
        <Select.Positioner>
          <Select.Content
            bg='white'
            borderRadius='xl'
            boxShadow='xl'
            border='1px solid var(--pancake-border)'
            zIndex={100}
            width='fit-content'
            padding='4px'>
            {ORDER_OPTIONS.map(option => (
              <Select.Item
                item={option}
                key={option.value}
                fontSize='15px'
                borderRadius='lg'
                padding='10px 16px'
                cursor='pointer'
                transition='all 0.1s ease'
                display='flex'
                alignItems='center'
                justifyContent='space-between'
                _hover={{
                  bg: 'var(--pancake-bg-light)',
                  color: 'var(--pancake-brown-dark)',
                }}
                _selected={{
                  bg: 'var(--pancake-cream)',
                  color: 'var(--pancake-brown-dark)',
                  fontWeight: '600',
                }}>
                <Select.ItemText>{option.label}</Select.ItemText>

                <Select.ItemIndicator color='var(--pancake-brown-dark)'>✓</Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>

    <HStack gap={3}>
      <Button
        onClick={() => setCollectionEditMode(!collectionEditMode)}
        borderRadius='var(--radius-pill)'
        variant={collectionEditMode ? 'solid' : 'outline'}
        bg={collectionEditMode ? 'var(--pancake-brown-medium)' : 'inherit'}
        color={collectionEditMode ? 'white' : 'var(--pancake-brown-medium)'}
        borderColor={collectionEditMode ? 'var(--pancake-brown-dark)' : 'var(--pancake-border)'}
        borderWidth='1.5px'
        fontWeight='600'
        fontSize='1rem'
        height='44px'
        px={6}
        transition='all 0.2s ease'
        _hover={{
          bg: collectionEditMode ? 'var(--pancake-brown-dark)' : 'var(--pancake-cream)',
          borderColor: 'var(--pancake-brown-medium)',
          transform: 'none',
          boxShadow: 'var(--shadow-sm)',
        }}
        _active={{
          transform: 'scale(0.98)',
        }}>
        {collectionEditMode ? '✓ Collection Edit Mode' : 'Edit My Collections'}
      </Button>

      <AskQuestionButton />
    </HStack>
  </Flex>
);

export default QuestionHeader;
