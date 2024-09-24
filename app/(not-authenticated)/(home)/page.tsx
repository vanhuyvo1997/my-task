import { Metadata } from "next";
import HeaderBar from "../../_components/layouts/header-bar";

export const metadata: Metadata = {
  title: "Home"
}

export default function HomePage() {
  return (<>
    <HeaderBar />
    <div>123</div>
  </>
  );
}
