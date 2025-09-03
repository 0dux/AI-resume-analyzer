import { resumes } from "constants/index";
import type { Route } from "./+types/home";
import Navbar from "./components/Navbar";
import ResumeCard from "./components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {
  const { auth } = usePuterStore();
  //use location is used to grab the location from the url
  const location = useLocation();
  //is the hook used for navigation
  const navigate = useNavigate();
  useEffect(() => {
    //If the user is not authenticated the can be led to home page after authentication.
    if (!auth.isAuthenticated) {
      navigate("/auth?next=/");
    }
  }, [auth.isAuthenticated]);

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />
      <section className="main-section">
        <div className="page-heading">
          <h1>Track Your Applications & Resume Ratings</h1>
          <h2>Review you submissions and check AI-powered feedback</h2>
        </div>
        {resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume: Resume) => {
              return <ResumeCard resume={resume} key={resume.id} />;
            })}
          </div>
        )}
      </section>
    </main>
  );
}
