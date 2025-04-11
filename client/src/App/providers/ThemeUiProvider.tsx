import { ThemeProvider } from "@gravity-ui/uikit";
import { ReactNode } from "react";

export const ThemeUiProvider = ({ children }: { children: ReactNode }) => {
  return <ThemeProvider theme="dark">{children}</ThemeProvider>;
};
