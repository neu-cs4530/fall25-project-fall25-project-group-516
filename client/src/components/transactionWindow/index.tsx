import './index.css';
import { addCoins, reduceCoins } from '../../services/userService';
import useUserContext from '../../hooks/useUserContext';
import { useState } from 'react';
import Modal from '../modal';

interface TransactionProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  cost: number;
  description?: string;
  awarded: boolean;
}

const TransactionWindow = ({
  isOpen,
  onClose,
  onConfirm,
  cost,
  description,
  awarded,
}: TransactionProps) => {
  const { user } = useUserContext();

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleConfirmButton = async (cost: number, awarded: boolean, description?: string) => {
    try {
      setSubmitting(true);
      if (awarded) {
        await addCoins(user.username, cost, description);
      } else {
        await reduceCoins(user.username, cost, description);
      }
      onConfirm();
      handleCancelButton();
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancelButton = async () => {
    setError('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCancelButton} title='Transaction'>
      <div className='transaction-modal'>
        {error.length > 0 && (
          <div className='transaction-error'>
            <svg
              className='warning-icon'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              aria-hidden='true'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
              />
            </svg>
            <div>
              <h3 className='error-title'>Error completing transaction.</h3>
              <p className='error-text'>{error}</p>
            </div>
          </div>
        )}
        <div className='transaction-content'>
          {awarded ? (
            <h3>{`You have been awarded ${cost} coins`}</h3>
          ) : (
            <h2>{`You will spend ${cost} coins`}</h2>
          )}
          {description ? <div>{description}</div> : <div>For mysterious reasons.</div>}
          {!awarded ? (
            <div>
              <button onClick={() => handleConfirmButton(cost, awarded, description)}>
                {submitting ? 'Confirming...' : 'Confirm'}
              </button>
              <button onClick={() => handleCancelButton()}>Cancel</button>
            </div>
          ) : (
            <button onClick={() => handleConfirmButton(cost, awarded, description)}>Accept</button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default TransactionWindow;
