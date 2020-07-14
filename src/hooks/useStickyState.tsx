import * as React from 'react';

// source: https://joshwcomeau.com/react/persisting-react-state-in-localstorage/
// modified to support ssr

export default function useStickyState(defaultValue, key) {
  const [value, setValue] = React.useState(defaultValue);
  const initialRender = React.useRef(true);
  React.useEffect(() => {
    if (initialRender.current) {
      const stickyValue = window.localStorage.getItem(key);
      if (stickyValue !== null) setValue(JSON.parse(stickyValue));

      initialRender.current = false;
    } else {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);
  return [value, setValue];
}
