import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center ">
      <h1 className="text-9xl text-red-500 font-extrabold tracking-tight">404</h1>
      <p className="mt-4 text-2xl font-medium text-gray-700 dark:text-gray-300">
        Oops! The page you're looking for doesn't exist.
      </p>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        It might have been moved or deleted.
      </p>
      <div className="mt-6">
        <Link to="/">
          <Button className="px-8 py-3 font-semibold text-white hover:bg-primary/90">
            Return Home
          </Button>
        </Link>
      </div>
      <div className="mt-8 flex space-x-4">
        <img
          src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
          alt="404 Illustration"
          className="w-80 h-80 rounded-xl shadow-lg"
        />
      </div>
    </div>
  );
}

export default ErrorPage;
