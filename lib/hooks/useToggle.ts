import React from "react";
import { ToggleHandlers } from "types";

function useToggle(initialState: boolean = false): [boolean, ToggleHandlers] {
  const [toggle, set] = React.useState(initialState);

  const handlers = React.useMemo(
    () => ({
      on: () => {
        set(true);
      },
      off: () => {
        set(false);
      },
      toggle: () => {
        set((prev) => !prev);
      },
    }),
    [set]
  );
  return [toggle, handlers];
}

export { useToggle };