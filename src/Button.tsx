import React from 'react';

// tailwind classes will be remain untouched but should be imported in source application to be recognized by tailwind server

export function Button({ label }: { label: string }) {
  return (
    <div className="scrollbar-thin max-h-80 min-h-40 max-w-screen-sm overflow-y-scroll p-4 !size-80 min-w-[35rem] text-error-main">
      <button className="custom-button">{label}</button>
    </div>
  );
}
