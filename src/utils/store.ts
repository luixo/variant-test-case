"use client";

import React from "react";

const setStorageValue = <T>(key: string, nextValue: T) => {
  const stringifiedNextValue = JSON.stringify(nextValue);
  const oldValue = window.localStorage.getItem(key);
  window.localStorage.setItem(key, stringifiedNextValue);
  // Dispatching event so current tab also recieves notification
  window.dispatchEvent(
    new StorageEvent("storage", {
      storageArea: window.localStorage,
      key,
      oldValue,
      newValue: stringifiedNextValue,
      url: window.location.href,
    })
  );
};

const parseStorageValue = <T>(input: string, defaultValue: T): T => {
  try {
    const value = JSON.parse(input) as T | undefined;
    return value || defaultValue;
  } catch {
    return defaultValue;
  }
};

const subscribe =
  (key: string) =>
  (keyCallback: () => void): (() => void) => {
    const callback = (e: StorageEvent) => {
      if (e.key === key) {
        keyCallback();
      }
    };
    window.addEventListener("storage", callback);
    return () => {
      window.removeEventListener("storage", callback);
    };
  };

export const useLocalStorage = <T extends object>(
  key: string,
  defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const localSubscribe = React.useMemo(() => subscribe(key), [key]);
  const localGetSnapshot = React.useCallback(
    () =>
      typeof window === "undefined" ? "" : localStorage.getItem(key) ?? "",
    [key]
  );
  const value = React.useSyncExternalStore(
    localSubscribe,
    localGetSnapshot,
    localGetSnapshot
  );
  const parsedValue = React.useMemo(
    () => parseStorageValue(value, defaultValue),
    [defaultValue, value]
  );
  const setValue = React.useCallback<React.Dispatch<React.SetStateAction<T>>>(
    (setStateAction) => {
      const nextValue =
        typeof setStateAction === "function"
          ? setStateAction(parsedValue)
          : setStateAction;
      setStorageValue(key, nextValue);
    },
    [key, parsedValue]
  );
  return [parsedValue, setValue];
};
