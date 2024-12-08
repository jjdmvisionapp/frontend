import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col h-full w-full ">
      <div className="flex flex-col justify-center items-center w-full h-1/2">
        <h2 className="title-responsive w-full text-center text-xl  mt-4 ">
          About Us
        </h2>
        <div className="box-wrapper flex flex-row flex-wrap justify-center items-center ">
          <div className="basis-1/2 md:basis-1/2 lg:basis-1/2 xl:basis-1/3 h-full p-8 flex flex-col justify-center items-center hover:bg-supernova-650 transition ease-in 1s cursor-pointer rounded-lg">
            <h3 className="subtitle-responsive text-lg text-gray-300">
              Objectives
            </h3>
            <hr className="w-full border-gray-400 mt-2" />
            <p className="text-center mt-2 text-sm  sm:text-sm md:text-sm lg:text-md xl:text-md text-gray-300">
              Our objective at JJDM is to provide a service for users to chat
              with an AI Chatbot called Nova and identify images using our
              classification tool!
            </p>
          </div>
          <div className="basis-1/2 md:basis-1/2 lg:basis-1/2 xl:basis-1/3  h-full p-6 flex flex-col justify-center items-center hover:bg-supernova-650 transition ease-in 1s cursor-pointer rounded-lg">
            <h3 className="subtitle-responsive text-lg text-gray-300">
              Technologies
            </h3>
            <hr className="w-full border-gray-400 mt-2" />
            <p className="text-center mt-2 text-sm  sm:text-sm md:text-sm lg:text-md xl:text-md text-gray-300">
              We're using ResNet-152, for the image recognition tool, and
              Flan-T5 Large from Hugging Face for our Chat Model!
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 justify-center items-center w-full h-1/2 ">
        <h2 className="title-responsive w-full text-center text-2xl">
          Features
        </h2>
        <div className="box-wrapper flex flex-row justify-center items-center ">
          <div className="basis-1/2 md:basis-1/2 lg:basis-1/2 xl:basis-1/4  h-full p-6 flex flex-col justify-center items-center hover:bg-supernova-650 transition ease-in 1s cursor-pointer rounded-lg">
            <h3 className="subtitle-responsive text-lg text-gray-300">
              Image Classification
            </h3>
            <hr className="w-full border-gray-400 mt-2" />
            <p className="text-center mt-2 text-sm  sm:text-sm md:text-sm lg:text-md xl:text-md text-gray-300">
              To use our Image Classification tool, just upload a clear PNG or
              JPEG image that's under 10MB, and the tool will recognise it and
              return what it is!
            </p>
          </div>
          <div className="basis-1/2 md:basis-1/2 lg:basis-1/2 xl:basis-1/4  h-full p-6 flex flex-col justify-center items-center hover:bg-supernova-650 transition ease-in 1s cursor-pointer rounded-lg">
            <h3 className="subtitle-responsive text-lg text-gray-300">
              ChatBot - Nova
            </h3>
            <hr className="w-full border-gray-400 mt-2" />
            <p className="text-center mt-2 text-sm  sm:text-sm md:text-sm lg:text-md xl:text-md text-gray-300">
              If you have any follow up queries or just want to interact with
              the chatbot, just enter a prompt and the AI will respond!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
