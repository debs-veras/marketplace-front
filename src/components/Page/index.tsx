import { ReactNode } from "react";
import Loading from "../Loading";

export default function Page({children, loading }: {
  children: ReactNode | ReactNode[] | string[] | string;
  loading: boolean;
}) {
  return <>{loading ? <Loading /> : children}</>;
}
