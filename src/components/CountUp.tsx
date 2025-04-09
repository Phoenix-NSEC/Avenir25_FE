import { useState, useEffect, useRef } from 'react';

// Custom hook to detect when element is in viewport
const useInView = (options = {}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);
  
  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;
    
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, options);
    
    observer.observe(currentRef);
    
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [options]);  // Removed ref from dependencies to avoid re-creating observer
  
  return [ref, inView];
};

const CountUpComponent = ({ children, duration = 2000, delay = 0, className = "" }) => {
  const [count, setCount] = useState(0);
  const targetValueRef = useRef(0);
  const hasAnimated = useRef(false);
  const animationRef = useRef(null);
  
  const [containerRef, isInView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  // Parse the numerical value from children
  useEffect(() => {
    // Handle various input types
    let value = 0;
    
    if (typeof children === 'number') {
      value = children;
    } else if (typeof children === 'string') {
      // Extract numbers from string (handle cases with prefixes/suffixes)
      const matches = children.match(/-?[\d,.]+/g);
      if (matches && matches.length > 0) {
        // Remove commas and convert to number
        value = parseFloat(matches[0].replace(/,/g, ''));
      }
    } else {
      // Try to convert to string and extract
      try {
        const stringVersion = String(children);
        const matches = stringVersion.match(/-?[\d,.]+/g);
        if (matches && matches.length > 0) {
          value = parseFloat(matches[0].replace(/,/g, ''));
        }
      } catch (e) {
        console.warn("CountUp couldn't parse value:", children);
      }
    }
    
    targetValueRef.current = value;
    
    // Only reset if value changes significantly
    if (Math.abs(value - targetValueRef.current) > 0.1) {
      hasAnimated.current = false;
      setCount(0);
    }
  }, [children]);  // Removed count to avoid infinite loop
  
  // Animation effect - only start when in view
  useEffect(() => {
    // Clean up any existing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    if (hasAnimated.current || !isInView) return;
    
    const delayTimer = setTimeout(() => {
      const startTime = Date.now();
      const endTime = startTime + duration;
      
      const runAnimation = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smoother animation
        const easeOutQuad = progress => 1 - (1 - progress) * (1 - progress);
        const easedProgress = easeOutQuad(progress);
        
        const value = easedProgress * targetValueRef.current;
        setCount(value);
        
        if (progress < 1) {
          animationRef.current = requestAnimationFrame(runAnimation);
        } else {
          setCount(targetValueRef.current);
          hasAnimated.current = true;
          animationRef.current = null;
        }
      };
      
      animationRef.current = requestAnimationFrame(runAnimation);
    }, delay);
    
    return () => {
      clearTimeout(delayTimer);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [duration, delay, isInView]);
  
  // Format the current value to match the format of the original children
  const formatValue = () => {
    if (typeof children === 'number') {
      return Math.round(count);
    }
    
    if (typeof children === 'string') {
      // Preserve all non-numeric parts of the string
      return children.replace(/-?[\d,.]+/g, Math.round(count).toLocaleString());
    }
    
    return Math.round(count);
  };
  
  return (
    <span ref={containerRef} className={className}>
      {formatValue()}
    </span>
  );
};

export default CountUpComponent;