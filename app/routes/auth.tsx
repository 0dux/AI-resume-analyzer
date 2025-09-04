import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

const Auth = () => {
  const { isLoading, auth } = usePuterStore();
  //use location is used to grab the location from the url
  const location = useLocation();
  //next is used to store the page user was trying to go to, So that user can be redirected after authentication success.
  const next = location.search.split("next=")[1];
  //is the hook used for navigation
  const navigate = useNavigate();
  useEffect(() => {
    //after user authentication user can now be led to the page they wanted to go from the begining
    if (auth.isAuthenticated) {
      navigate(next);
    }
  }, [auth.isAuthenticated, next]);

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen flex items-center justify-center">
      <div className="gradient-border shadow-lg">
        <section className="bg-white flex flex-col gap-8 items-center rounded-2xl p-10">
          <div className="flex flex-col items-center text-center">
            <h1>Welcome</h1>
            <h2>Log In To Continue Your Job Journey</h2>
          </div>
          <div>
            {isLoading ? (
              <button className="auth-button animate-pulse ">
                <p>Signing you in...</p>
              </button>
            ) : (
              <>
                {auth.isAuthenticated ? (
                  <button className="auth-button" onClick={auth.signOut}>
                    <p>Log out</p>
                  </button>
                ) : (
                  <button className="auth-button" onClick={auth.signIn}>
                    <p>Log in</p>
                  </button>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Auth;
