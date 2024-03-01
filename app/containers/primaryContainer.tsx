"use client"
import React, { ReactElement, useState } from "react";
import Modal from "../components/modal";
import AddMovie from "../modalContent/addMovie";
import AddReview from "../modalContent/addReview";

interface PrimaryContainerProps {
  children: ReactElement;
}

const PrimaryContainer = ({ children }: PrimaryContainerProps) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [clickedName,setClickedName] = useState<String>("")

  const handleClose = () => {
    setModalOpen(false);
  };
  const handleButtonClick = (name:String)=>{
    setClickedName(name)
    setModalOpen(true);
  }
  return (
    <main className="h-screen w-full flex flex-col justify-between">
      <div className="header py-5 px-5 bg-[#E3E8ED] w-full flex justify-between items-center">
        <div className=" text-[#293845] font-semibold">MOVIECRITIC</div>
        <div className="flex gap-x-3">
          <button
            className="p-2 border border-[#B5B4EF] bg-white text-[#6558F5] text-center rounded-md"
            onClick={() => {
              handleButtonClick("movie");
            }}
          >
            Add New Movie
          </button>
          <button className="p-2 border-none bg-[#6558F5] text-white text-center  rounded-md" onClick={() => {
              handleButtonClick("review");
            }}>
            Add New Review
          </button>
        </div>
      </div>
      <div className="w-full h-full px-5 py-5">
      {modalOpen && (
          <Modal isOpen={modalOpen} handleClose={handleClose}>
           {clickedName ==="movie"? <AddMovie />:<AddReview/>}
          </Modal>
        )}
        {children}
      </div>
      <div className="py-5 px-5 bg-[#E3E8ED] w-full flex justify-between items-center">
        <div className="text-white font-semibold">Copyright 2021</div>
        <div className="text-white font-semibold">Follow Us On Instagram</div>
      </div>
    </main>
  );
};

export default PrimaryContainer;
