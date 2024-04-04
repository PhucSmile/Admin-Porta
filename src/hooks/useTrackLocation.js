import { useState, useEffect } from 'react';

export function useTrackLocation() {
  const [locationError, setLocationError] = useState('');
  const [position, setPosition] = useState({});
  const [isFindingLocation, setIsFindingLocation] = useState(false);

  const success = (position, callback) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    setPosition({
      lat: latitude,
      long: longitude,
    });
    setLocationError('');
    setIsFindingLocation(false);
    callback({
      lat: latitude,
      long: longitude,
    });
  };

  const error = (e, callback) => {
    setLocationError('UNABLE_LOCATION');
    setIsFindingLocation(false);

    callback('UNABLE_LOCATION');
  };

  const handleTrackLocation = (callback, callbackError) => {
    setIsFindingLocation(true);

    if (!navigator.geolocation) {
      setLocationError('NOT_SUPPORTED_LOCATION');
      callbackError('NOT_SUPPORTED_LOCATION');
      setIsFindingLocation(false);
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => success(position, callback),
        (e) => error(e, callbackError),
      );
    }
  };

  return {
    locationError,
    position,
    isFindingLocation,
    handleTrackLocation,
  };
}

export const useAutoLoadLocation = (isRunning = true) => {
  const [position, setPosition] = useState({});
  const [locationError, setLocationError] = useState(null);
  const [isFindingLocation, setIsFindingLocation] = useState(null);

  const onChange = ({ coords }) => {
    setPosition({
      lat: coords.latitude,
      long: coords.longitude,
    });
    setIsFindingLocation(false);
  };

  const onError = (error) => {
    setLocationError('UNABLE_LOCATION');
    setIsFindingLocation(false);
  };

  useEffect(() => {
    if (isRunning) {
      setIsFindingLocation(true);
      const geo = navigator.geolocation;
      if (!geo) {
        setLocationError('NOT_SUPPORTED_LOCATION');
        setIsFindingLocation(false);
        return;
      }

      const watcher = geo.watchPosition(onChange, onError);

      return () => geo.clearWatch(watcher);
    }
  }, [isRunning]);

  return { ...position, locationError, isFindingLocation };
};
