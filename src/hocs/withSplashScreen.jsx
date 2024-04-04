import { useState, useEffect } from 'react';

import SplashScreen from 'components/SplashScreen';

const withSplashScreen = (WrappedComponent) => (props) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // TODO: Move time to constants folder

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return <WrappedComponent {...props} />;
};

export default withSplashScreen;
