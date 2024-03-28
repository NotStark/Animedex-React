import { Link } from "react-router-dom";
import Button from "../components/Button";
import { useRouteError } from "react-router-dom";

type ErrorData = {
  data: string;
  error?: {
    message: string;
    stack: string;
  };
  internal: boolean;
  status: number;
  statusText: string;
};

export default function ErrorPage() {
  const error = useRouteError() as ErrorData;

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center ">
      <h2 className="text-9xl font-extrabold text-white tracking-widest">
        {error.status || '404'}
      </h2>
      <div className="bg-primary px-2 text-sm rounded rotate-12 absolute">
        {error.statusText || "Unknown Error"}
      </div>
      <Link to="/" className="mt-5">
        <Button >Go Home</Button>
      </Link>
    </div>
  );
}
