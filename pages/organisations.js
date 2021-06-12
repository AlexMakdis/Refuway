import Head from "next/head";
import styles from "../styles/Home.module.css";
import { gql } from "@apollo/client";
import client from "../apollo-client";
import Header from "../components/Header";
import Image from "next/image";

export default function Organisations() {
  const showData = (dropdownClass, arrow) => {
    const dropdownData = document.querySelector(dropdownClass)
    const dropdownDataArrow = document.querySelector(arrow)
      if (dropdownData.style.display === "none") {
        dropdownData.style.display = "block"
      } else {
        dropdownData.style.display = "none"
      }
      dropdownData.classList.toggle("animate__fadeInDown")
      dropdownDataArrow.classList.toggle("rotate")
  }

  return (
    <>
    <div className="h-screen bg-organisations bg-fixed bg-no-repeat bg-center bg-cover overflow-y-hidden">
      <Header/>
      <div className="my-auto">
      <div className="headPage  mx-auto rounded-xl w-4/5 p-8 overflow-hidden text-center text-white font-bold text-4xl uppercase ">
      <h1 className="">Organisations</h1>
      </div>
      <div onClick={() => document.querySelector('.dropdownDataContainer').scrollIntoView()} className="scrollDown mx-auto mt-28 animate__animated animate__bounce animate__infinite	infinite animate__slow cursor-pointer">
        <p className="mx-auto text-white font-bold text-lg">Scroll</p>
        <Image 
          src="/icons/down-arrow.svg"
          alt="logo"
          width={80}
          height={80}
        />
      </div>

      </div>
    </div>
      <div className="dropdownDataContainer">
        <div>
          <div onClick={() => showData(".dropdownData", ".dataArrow")} className=" dropdownTab flex cursor-pointer mx-auto mt-10 bg-white rounded-xl shadow-md w-4/5 p-4 overflow-hidden">
            <h3>Information</h3>
            <div className="mx-2">
              <Image 
                src="/icons/down.svg"
                alt="logo"
                width={20}
                height={20}
                className="dataArrow duration-500"
                />
            </div>
          </div>
          <div style={{display:"none"}} className="dropdownData dropdownText mx-auto w-4/6 p-4 overflow-hidden animate__animated">
              <p>Data</p>
            </div>
          </div>
        <div>
          <div onClick={() => showData(".dropdownOrganisations", ".organisationsArrow")} className="dropdownTab flex cursor-pointer mx-auto mt-10 bg-white rounded-xl shadow-md w-4/5 p-4 overflow-hidden">
          <h3>Organisations</h3>
            <div className="mx-2">
              <Image 
                src="/icons/down.svg"
                alt="logo"
                width={20}
                height={20}
                className="organisationsArrow duration-500"
                />
            </div>
          </div>
          <div style={{display:"none"}} className="dropdownOrganisations dropdownData mx-auto w-4/6 p-4 overflow-hidden animate__animated">
                <p>Data</p>
          </div>
        </div>
        <div>
          <div onClick={() => showData(".dropdownExtra", ".extraArrow")} className="dropdownTab flex cursor-pointer mx-auto mt-10 bg-white rounded-xl shadow-md w-4/5 p-4 overflow-hidden">
          <h3>Extra</h3>
            <div className="mx-2">
              <Image 
                src="/icons/down.svg"
                alt="logo"
                width={20}
                height={20}
                className="extraArrow duration-500"
                />
            </div>
          </div>
          <div style={{display:"none"}} className="dropdownExtra dropdownData mx-auto w-4/6 p-4 overflow-hidden animate__animated">
                <p>Data</p>
          </div>
        </div>
      </div>
    </>
  );
}