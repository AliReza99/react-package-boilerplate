import React from 'react';

// tailwind classes will be remain untouched but should be imported in source application to be recognized by tailwind server

export function Button({ label }: { label: string }) {
  return <button className="custom-button">{label}</button>;
}
