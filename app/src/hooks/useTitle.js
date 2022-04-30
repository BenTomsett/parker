import { useEffect } from 'react';

const useTitle = (title) => {
  useEffect(() => {
    if(document && document.title !== title){
      document.title = `${title} - Parker`;
    }
  }, [title]);
}

export default useTitle;
