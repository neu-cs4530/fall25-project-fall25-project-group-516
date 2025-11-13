import './index.css';
import QuestionHeader from './header';
import QuestionView from './question';
import useQuestionPage from '../../../hooks/useQuestionPage';
import TransactionWindow from '../../transactionWindow';
// import TransactionWindow from '../../transactionWindow';

/**
 * QuestionPage component renders a page displaying a list of questions
 * based on filters such as order and search terms.
 * It includes a header with order buttons and a button to ask a new question.
 */
const QuestionPage = () => {
  const {
    titleText,
    qlist,
    setQuestionOrder,
    showLoginReward,
    setShowLoginReward,
    loginReward,
    loginStreak,
    loginClaimed,
  } = useQuestionPage();

  return (
    <>
      <QuestionHeader
        titleText={titleText}
        qcnt={qlist.length}
        setQuestionOrder={setQuestionOrder}
      />
      <div id='question_list' className='question_list'>
        {qlist.map(q => (
          <QuestionView question={q} key={q._id.toString()} />
        ))}
      </div>

      {titleText === 'Search Results' && !qlist.length && (
        <div className='bold_title right_padding'>No Questions Found</div>
      )}

      {/* Modal for daily log-in reward*/}
      <TransactionWindow
        isOpen={showLoginReward}
        onClose={() => setShowLoginReward(false)}
        onConfirm={() => loginClaimed()}
        cost={loginReward}
        description={
          loginStreak > 0
            ? `For logging in for ${loginStreak} days! Log back in tomorrow for ${loginReward + 1 == 7 ? 10 : loginReward + 1} coins!`
            : 'For your first time logging in!'
        }
        awarded={true}></TransactionWindow>
    </>
  );
};

export default QuestionPage;
