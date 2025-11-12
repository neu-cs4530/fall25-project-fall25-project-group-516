import { useNavigate } from 'react-router-dom';
import './index.css';
import { addCoins, reduceCoins } from '../../services/userService';
import useUserContext from '../../hooks/useUserContext';

interface TransactionProps {
  cost: number;
  description?: string;
  awarded: boolean;
}

const TransactionWindow = ({ cost, description, awarded }: TransactionProps) => {
  const navigate = useNavigate();
  const { user } = useUserContext();

  const handleConfirmButton = async (cost: number, awarded: boolean, description?: string) => {
    if (awarded) {
      await addCoins(user.username, cost, description);
    } else {
      await reduceCoins(user.username, cost, description);
    }
    handleCancelButton();
  };

  const handleCancelButton = () => {
    const popup = document.getElementById('popup');
    if (popup) {
      popup.style.display = 'none';
    } else {
      navigate('/home');
    }
  };

  return (
    <div className='popup'>
      <div className='popup-content'>
        {awarded ? (
          <h2>{`You have been awarded ${cost} coins`}</h2>
        ) : (
          <h2>{`You will spend ${cost} coins`}</h2>
        )}
        {description ? <div>{description}</div> : <div>For mysterious reasons.</div>}
        {awarded ? (
          <div>
            <button onClick={() => handleConfirmButton(cost, awarded, description)}>Confirm</button>
            <button onClick={() => handleCancelButton()}>Cancel</button>
          </div>
        ) : (
          <button onClick={() => handleConfirmButton(cost, awarded, description)}>Accept</button>
        )}
      </div>
    </div>
  );
};

export default TransactionWindow;
