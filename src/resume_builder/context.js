import { createContext } from "react";

export const dispatchContext = createContext(() => {});
dispatchContext.displayName = "Dispatch Context";

export const resumeIDContext = createContext("blank");
resumeIDContext.displayName = "Resume ID Context";

export const resumeListContext = createContext([]);
resumeListContext.displayName = "Resume List Context";
