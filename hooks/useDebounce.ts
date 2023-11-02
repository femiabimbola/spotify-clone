{/*
* The function is because we dont want to refresh our input everytime
* Only refresh when the user stop tying
*/}

import {useEffect, useState} from 'react'

function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  
  useEffect(() => {
    const timer = setTimeout(() => { setDebouncedValue(value)}, delay || 500)
    return () =>{ clearTimeout(timer)}
  }, [ value, delay])

  return debouncedValue;
}

export default useDebounce;