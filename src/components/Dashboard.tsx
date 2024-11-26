import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-col justify-center items-center w-full h-1/2">
        <h2 className="w-full text-center text-3xl">About Us</h2>
        <div className="box-wrapper flex flex-row justify-center items-center mt-4">
          <div className="basis-1/3  h-full p-8 flex flex-col justify-center items-center hover:bg-supernova-650 transition ease-in 1s cursor-pointer rounded-lg">
            <h3 className="text-2xl text-gray-300">Objective</h3>
            <hr className="w-full border-gray-400 mt-2" />
            <p className="text-center mt-2 text-md text-gray-300">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Asperiores veritatis consequatur et, tenetur nobis vel harum
              doloremque facere dolorem nulla.
            </p>
          </div>
          <div className="basis-1/3  h-full p-6 flex flex-col justify-center items-center hover:bg-supernova-650 transition ease-in 1s cursor-pointer rounded-lg">
            <h3 className="text-2xl text-gray-300">Technologies</h3>
            <hr className="w-full border-gray-400 mt-2" />
            <p className="text-center mt-2 text-md text-gray-300">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Asperiores veritatis consequatur et, tenetur nobis vel harum
              doloremque facere dolorem nulla.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 justify-center items-center w-full h-1/2">
        <h2 className="w-full text-center text-3xl">Features</h2>
        <div className="box-wrapper flex flex-row justify-center items-center mt-4">
          <div className="basis-1/4  h-full p-6 flex flex-col justify-center items-center hover:bg-supernova-650 transition ease-in 1s cursor-pointer rounded-lg">
            <h3 className="text-2xl text-gray-300">Image Classification</h3>
            <hr className="w-full border-gray-400 mt-2" />
            <p className="text-center mt-2 text-md text-gray-300">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Asperiores veritatis consequatur et, tenetur nobis vel harum
              doloremque facere dolorem nulla.
            </p>
          </div>
          <div className="basis-1/4  h-full p-6 flex flex-col justify-center items-center hover:bg-supernova-650 transition ease-in 1s cursor-pointer rounded-lg">
            <h3 className="text-2xl text-gray-300">ChatBot - Nova</h3>
            <hr className="w-full border-gray-400 mt-2" />
            <p className="text-center mt-2 text-md text-gray-300">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem
              eligendi quidem repudiandae, illum blanditiis ab iste assumenda
              nesciunt natus qui.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
