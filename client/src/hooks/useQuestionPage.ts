import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useUserContext from './useUserContext';
import { OrderType, PopulatedDatabaseQuestion } from '../types/types';
import { getQuestionsByFilter } from '../services/questionService';

const useQuestionPage = () => {
  const { user } = useUserContext();

  const [searchParams] = useSearchParams();
  const [titleText, setTitleText] = useState<string>('All Questions');
  const [search, setSearch] = useState<string>('');
  const [questionOrder, setQuestionOrder] = useState<OrderType>('newest');
  const [qlist, setQlist] = useState<PopulatedDatabaseQuestion[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);

  const [listVersion, setListVersion] = useState<number>(0);

  useEffect(() => {
    let pageTitle = 'All Questions';
    let searchString = '';

    const searchQuery = searchParams.get('search');
    const tagQuery = searchParams.get('tag');

    if (searchQuery) {
      pageTitle = 'Search Results';
      searchString = searchQuery;
    } else if (tagQuery) {
      pageTitle = tagQuery;
      searchString = `[${tagQuery}]`;
    }

    setTitleText(pageTitle);
    setSearch(searchString);
  }, [searchParams]);

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await getQuestionsByFilter(questionOrder, search);

        if (!ignore) {
          setQlist(res || []);
          setListVersion(v => v + 1);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      } finally {
        if (!ignore) {
          setIsLoading(false);
          setIsFirstLoad(false);
        }
      }
    };

    fetchData();

    return () => {
      ignore = true;
    };
  }, [questionOrder, search, user?.blockedUsers]);

  return {
    titleText,
    qlist,
    setQuestionOrder,
    isLoading,
    isFirstLoad,
    listVersion,
  };
};

export default useQuestionPage;
