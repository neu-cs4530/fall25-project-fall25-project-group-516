import './index.css';
import { getMetaData } from '../../../../tool';
import { PopulatedDatabaseQuestion } from '../../../../types/types';
import useQuestionView from '../../../../hooks/useQuestionView';
import { Eye, MessageCircleMore } from 'lucide-react';

interface QuestionProps {
  question: PopulatedDatabaseQuestion;
  collectionEditMode: boolean;
  onCollectionClick: (question: PopulatedDatabaseQuestion) => void;
}

const QuestionView = ({ question, collectionEditMode, onCollectionClick }: QuestionProps) => {
  const { clickTag, handleAnswer } = useQuestionView();

  const handleQuestionClick = () => {
    if (collectionEditMode) {
      onCollectionClick(question);
    } else if (question._id) {
      handleAnswer(question._id);
    }
  };

  return (
    <div
      className={`question ${collectionEditMode ? 'collection-edit-mode' : ''}`}
      onClick={handleQuestionClick}>
      {collectionEditMode && <div className='collection-mode-indicator'>+ Add to Collection</div>}

      <div className='question_info'>
        <div className='lastActivity'>
          <span className='question_author'>
            {question.isAnonymous
              ? 'Anonymous'
              : question.premiumStatus
                ? `${question.askedBy} ⭐`
                : question.askedBy}
          </span>
          <span className='question_meta'>asked {getMetaData(new Date(question.askDateTime))}</span>
        </div>
        <div className='postStats'>
          <div title='Answers'>
            {question.answers.length || 0} <MessageCircleMore size={16} />
          </div>
          <div title='Views'>
            {question.views.length} <Eye size={16} />
          </div>
        </div>
      </div>

      <div className='question_mid'>
        <h3 className='postTitle'>{question.title}</h3>
        <div style={{ fontSize: '0.95rem', color: 'var(--pancake-text-dark)', lineHeight: '1.5' }}>
          {question.text.length > 200 ? question.text.substring(0, 200) + '...' : question.text}
        </div>
        <div className='question_tags'>
          {question.tags.map(tag => (
            <button
              key={String(tag._id)}
              className='question_tag_button'
              onClick={e => {
                e.stopPropagation();
                clickTag(tag.name);
              }}>
              # {tag.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionView;
