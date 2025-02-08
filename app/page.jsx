import React from "react";
import Feed from "@components/Feed";

const Home = () => {
  return (
    <>
      <div className="text w-full flex-center flex-col p-5">
        <h1 className="text-center font-medium mt-5 text-5xl space-y-1">
          Share Your Prompts,
          <br className="max-md:hidden" />
          <span className="bg-gradient-to-r from-orange-400 to-orange-600 text-transparent bg-clip-text font-bold">
            Don't be Normie
          </span>
        </h1>
        <p className="text-center mt-5 ">
          Impromptu is a web app that helps you share your creative AI prompts
          so they can be helpful for others.
        </p>
        {/*feed page */}
        <Feed/>
      </div>
    </>
  );
};

export default Home;
