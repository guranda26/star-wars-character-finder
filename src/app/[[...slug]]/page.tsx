import "../../index.css";
import { ClientOnly } from "./client";

export const generateStaticParams = () => {
  return [{ slug: [""] }];
};

export default function Page() {
  return <ClientOnly />;
}
