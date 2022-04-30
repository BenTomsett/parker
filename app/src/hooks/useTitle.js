import { useEffect } from 'react';

/**
 * useTitle hook, sets the title of the document (appends ' - Parker' to the end)
 * @param {string} title The new title
 */
const useTitle = (title) => {
  useEffect(() => {
    if(document && document.title !== title){
      document.title = `${title} - Parker`;
    }
  }, [title]);
};

export default useTitle;
