import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";
import type { Route } from "./+types/home";
import Navbar from "./components/Navbar";
import ResumeCard from "./components/ResumeCard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  //is the hook used for navigation

  const [resumesList, setResumesList] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);

      const resumes = (await kv.list("resume:*", true)) as KVItem[];

      const parsedResumes = resumes?.map(
        (resume) => JSON.parse(resume.value) as Resume
      );

      setResumesList(parsedResumes || []);
      setLoadingResumes(false);
    };

    loadResumes();
  }, []);

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
          {!loadingResumes && resumesList?.length === 0 ? (
            <h2>No resumes found. Upload your first resume to get feedback.</h2>
          ) : (
            <h2>Review your submissions and check AI-powered feedback.</h2>
          )}
        </div>
        {loadingResumes && (
          <div className="flex flex-col items-center justify-center">
            <img src="/images/resume-scan-2.gif" className="w-[200px]" />
          </div>
        )}
        {resumesList.length > 0 && (
          <div className="resumes-section">
            {resumesList.map((resume: Resume) => {
              return <ResumeCard resume={resume} key={resume.id} />;
            })}
          </div>
        )}
        {!loadingResumes && resumesList?.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-10 gap-4">
            <Link
              to="/upload"
              className="primary-button w-fit text-xl font-semibold"
            >
              Upload Resume
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
