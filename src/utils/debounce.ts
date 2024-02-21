import { useEffect, useState } from "react";

export const useDebounce = (phrase: string, debounceDelay = 400) => {
    const [debouncedValue, setDebouncedValue] = useState(phrase);

    useEffect(() => {
        const phraseTimer = setTimeout(() => {
            setDebouncedValue(phrase);
        }, debounceDelay);

        return () => {
            clearTimeout(phraseTimer);
        };
    }, [phrase, debounceDelay]);

    return debouncedValue;
};
