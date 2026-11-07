import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

function Container({ children }: ContainerProps) {
  return <div className="mx-auto max-w-7xl px-4 py-8">{children}</div>;
}

export default Container;