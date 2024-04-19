import { Fragment } from "react/jsx-runtime";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Fragment>{children}</Fragment>;
}
