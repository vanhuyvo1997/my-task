import { Metadata } from "next";
import HeaderBar from "../../_components/layouts/header-bar";
import LoginForm from "@/app/_components/forms/login-form";
import Greetings from "@/app/_components/layouts/greetings";

export const metadata: Metadata = {
  title: "Home"
}

export default function HomePage() {
  return (<>
    <HeaderBar />
    <div className="mt-24 flex flex-col px-5 gap-5 md:gap-14
    md:flex-row md:justify-center
    ">
      <div className="md:w-fit">
        <Greetings />
      </div>
      <div className="shadow-lg shadow-gray-300 dark:shadow-gray-700 bg-gray-200 dark:bg-gray-800 p-5 rounded-lg 
       md:w-[450px]
      ">
        <LoginForm />
      </div>
    </div>
  </>
  );
}
