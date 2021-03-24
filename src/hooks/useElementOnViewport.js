import { useRef, useState, useEffect } from "react";

const useElementOnViewport = (options) => {
  const containerRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false);
  const callbackFunc = entries => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunc, options)
    if (containerRef.current) observer.observe(containerRef.current)
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
      containerRef.current = null
    }
  }, [containerRef.current, options])
  return [containerRef, isVisible]
}

export default useElementOnViewport
