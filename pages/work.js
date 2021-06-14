import Head from "next/head";
import styles from "../styles/Home.module.css";
import { gql } from "@apollo/client";
import client from "../apollo-client";
import Header from "../components/header";
import Image from "next/image";
import Link from 'next/link';
import OrgImage from "../components/OrgImage";

export default function Work({organisations}) {
  

  const org = organisations.filter(organisations => organisations.category === "WORK");

  const showData = (dropdownClass, arrow) => {
    const dropdownData = document.querySelector(dropdownClass)
    const dropdownDataArrow = document.querySelector(arrow)
      if (dropdownData.style.display === "none") {
        dropdownData.style.display = "block"
      } else {
        dropdownData.style.display = "none"
      }
      dropdownData.classList.toggle("animate__fadeIn")
      dropdownDataArrow.classList.toggle("rotate")
  }



  return (
    <>
    <div className="h-screen bg-work bg-fixed bg-no-repeat bg-center bg-cover overflow-y-hidden">
      <Header/>
      <div className="my-auto">
      <div className="headPage  mx-auto rounded-xl w-4/5 p-8 overflow-hidden text-center text-white font-bold text-4xl uppercase ">
      <h1 className="">Work</h1>
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
      <div className="dropdownDataContainer mb-96">
        <div className="mb-32 mt-20">
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
          <div style={{display:"none"}} className="dropdownData dataWizardText dropdownText mx-auto w-4/6 p-4 overflow-hidden animate__animated">
          <p><strong>Do you have the right to work as an asylum seeker, subsidiary protected or recognized refugee?</strong></p>
          <p>You can work as a recognized refugee or subsidiary protected person. You can also work during the asylum procedure after a waiting period during which you cannot work.</p>
          
          <p><strong>During the asylum procedure</strong></p>
          <p><strong>Working as an employee</strong></p>
          <p>During the asylum procedure you can work after a waiting period of 4 months if you are in possession of a certificate of registration (AI). The waiting period starts from the actual submission of your application for international protection (appendix 26 or appendix 26quinquies).</p>
          
          <p>During the waiting period of 4 months, you must not have received notification of a refusal decision from the Commissioner General for Refugees and Stateless Persons (CGRS). If the decision of the CGRS has been served more than 4 months after submitting your application for international protection, you will retain access to the labor market during the subsequent appeal procedure at the Council for Alien Disputes (RvV).</p>
          
          <p>If the decision of the CGRS has been served within 4 months, you cannot work. Not even during the subsequent appeal procedure at the RvV.</p>
          
          <p><strong>Working as a self-employed person</strong></p>
          <p>During your asylum procedure you will receive a certificate of registration (AI). You may work as a self-employed person if you apply for and receive a professional card. Because your right of residence is very uncertain, your activity should not require excessive investment.</p>
          
          <p><strong> After being recognized as a refugee</strong></p>
          <p><strong>Working as an employee</strong></p>
          <p>As a recognized refugee you are exempt from a combined permit and you can work.</p>
          <p>If you have been recognized as a refugee, you have an electronic aliens card A that is valid for 5 years. 5 years after submitting your asylum application, you will receive an unlimited right of residence (electronic aliens card B). The exemption from the single permit applies in both cases.</p>
          
          <p><strong>Working as a self-employed person</strong></p>
          <p>If you have been recognized as a refugee, you are exempt from a professional card to carry out an independent activity.</p>
          
          <p>If you have been recognized as a refugee, you have an electronic aliens card A that is valid for 5 years. 5 years after submitting your asylum application, you will receive an unlimited right of residence (electronic aliens card B). The exemption from professional card applies in both cases.</p>
          
          <p><strong>After granting subsidiary protection</strong></p>
          <p><strong>Working as an employee</strong></p>
          <p>If you received subsidiary protection, you have an electronic foreigner card A, which is valid for one or two years and is renewable. This exempts you from a combined permit and allows you to work.</p>
          
          <p>5 years after submitting your asylum application, you will receive an unlimited right of residence (electronic aliens card B). You remain exempt from the combined permit and can work.</p>
          
          <p><strong>Working as a self-employed person</strong></p>
          <p>If you were granted subsidiary protection status, you will have an electronic alien card A, which is valid for one or two years and is renewable. You may work as a self-employed person if you apply for and receive a professional card.</p>
          
          <p>5 years after submitting your asylum application, you will receive an unlimited right of residence (electronic aliens card B). You are then exempt from a professional card.</p>
            </div>
          </div>
        <div className="my-32">
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
            <div className="grid grid-cols-3 gap-8">
            {org.map((organisation) => (
              <div className=" text-center shadow-md rounded-xl p-8 font-bold text-xs hover:bg-green hover:text-white transition duration-500 ease-in-out cursor-pointer"  key={organisation.id}>
                <Link href={{ pathname: '/organisations/[id]', query: { object: JSON.stringify(organisation) } }} as={`/organisations/${organisation.id}`} passHref>
                  <div>
                <OrgImage publicId={organisation.imgURL} />
                <p className="text-lg font-bold text-blue">{organisation.title}</p>
                </div>
                </Link>
              </div>
            ))}

            </div>
          </div>
        </div>
        <div className="my-32">
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
          <div style={{display:"none"}} className="dataWizardText dropdownExtra dropdownData mx-auto w-4/6 p-4 overflow-hidden animate__animated">
            <ul>
              <li>
                <a href="https://www.agii.be/thema/vreemdelingenrecht-internationaal-privaatrecht/werk">AGENTSCHAP INTEGRATIE &amp; INBURGERING: Werk</a>
                <p>Step-by-step plan, application form,... for the recognition of a foreign study certificate</p>
              </li>
              <li>
                <a href="https://naricvlaanderen.be/nl/informatie-voor-vluchtelingen">NARIC-Vlaanderen</a>
                <p>Step-by-step plan, application form,... for the recognition of a foreign study certificate</p>
              </li>
              <li>
                <a href="https://naricvlaanderen.be/nl/informatie-voor-vluchtelingen">NARIC-Vlaanderen</a>
                <p>Step-by-step plan, application form,... for the recognition of a foreign study certificate</p>
              </li>
              <li>
                <a href="https://naricvlaanderen.be/nl/informatie-voor-vluchtelingen">Local departments of the Agency for Integration and Civic Integration</a>
                <p>For guidance in applying for an equalization of a foreign diploma</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}


export async function getStaticProps() {
  const { data: organisations } = await client.query({
    query: gql`
      query Organisations {
        organisations{
          id
          title
          text
          description
          imgURL
          category
          organisationLi
          longitude
          latitude
            }
                  }
    `,
  });

  return {
    props: {
      organisations: organisations.organisations,
    },
  };
}