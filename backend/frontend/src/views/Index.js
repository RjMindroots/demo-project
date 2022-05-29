/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <>
      <section className="header relative items-center flex h-screen max-h-860-px">
        <div className="container mx-auto items-center flex flex-wrap">
          <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
            <div className="pt-32 sm:pt-0">
              <Link className="authButton" to={`/login`}>Login</Link>
              <Link className="authButton" to={`/signup`}>Sign Up</Link>
            </div>
          </div>
        </div>

        <img
          className="absolute top-0 b-auto right-0 pt-16 sm:w-6/12 -mt-48 sm:mt-0 w-10/12 max-h-860px"
          src={require("assets/img/pattern_react.png").default}
          alt="..."
        />
      </section>
    </>
  );
}
