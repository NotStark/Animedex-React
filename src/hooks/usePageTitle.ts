import { useEffect, useRef } from 'react';

function usePageTitle(title: string) {
    const currentTitle = useRef(document.title)

    useEffect(() => {
        document.title = title;
        return () => {
            // Reset the title when the component unmounts
            document.title = currentTitle.current;
        };
    }, [title]);
}

export default usePageTitle;