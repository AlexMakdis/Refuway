import Head from "next/head";
import styles from "../styles/Home.module.css";
import { gql } from "@apollo/client";
import client from "../apollo-client";
import Header from "../components/Header";
import Image from "next/image";
import Link from 'next/link';
import OrgImage from "../components/OrgImage";

export default function House({organisations}) {
  const org = organisations.filter(organisations => organisations.category === "HOUSE");

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
    <div className="h-screen bg-house bg-fixed bg-no-repeat bg-center bg-cover overflow-y-hidden">
      <Header/>
      <div className="my-auto">
      <div className="headPage  mx-auto rounded-xl w-4/5 p-8 overflow-hidden text-center text-white font-bold text-4xl uppercase ">
      <h1 className="">house</h1>
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
          <div style={{display:"none"}} className="dropdownData dropdownText mx-auto w-4/6 p-4 overflow-hidden animate__animated dataWizardText">
              <p><strong>Stay in the reception center?</strong></p>
              <p>Belgium has almost 80 reception centers for applicants for international protection 'applicants' card centres. They are administered by Fedasil, the Red Cross or another partner. They are open centers: this means that residents can move freely in and out of the center.</p>
              
              <p>The reception centers are very different: often they are old army bases, boarding schools or hospitals, sometimes they are newly built prefab buildings; there are small ones with 50 reception places and large ones up to more than 900 places; some are in the middle of the city, others are in the countryside. Yet all these centers offer the same services.</p>
              
              <ul>
                <li>'Bed, bath, bread'</li>
                <li>Accompaniment</li>
                <li>Daily life</li>
                <li>Neighborhood work</li>
              </ul>
              
              <p><strong>'Bed, bath, bread'</strong></p>
              <p>In a reception centre, applicants receive the material assistance to which they are legally entitled. This assistance primarily concerns the basic needs of the residents: a place to sleep, meals, sanitary facilities and clothing. A bed in a common sleeping area is available for singles. Families are given a separate room as far as possible. The center provides for the basic needs of the residents, but the applicants contribute to the maintenance of the communal areas.</p>
              
              <p><strong>Accompaniment</strong></p>
              <p><strong>Social Guidance</strong></p>
              <p>Each applicant is entitled to individual social counseling by a social worker. The social worker provides the necessary information about the asylum procedure officially 'the procedure concerning the application for international protection' and discusses with the applicant the consequences of the decision taken by the Commissioner General for Refugees and Stateless Persons. In addition, the applicant is also assisted with the administrative management of the file, or with the registration of the children in a school.</p>
              
              <p><strong>Legal guidance</strong></p>
              <p>It is in the applicant's interest to call in the specialized help of a lawyer in good time. They can help the applicants go through the complicated procedure. This legal assistance is free. The social worker puts the applicant in contact with a lawyer. The applicant can also contact the legal aid office of the nearest courthouse.</p>
              
              <p><strong>Social translation and interpreting services</strong></p>
              <p>If an applicant does not speak any of the three national languages, he can request the help of an interpreter free of charge in order to communicate better with the social worker or with his lawyer.</p>
              
              <p><strong>Medical and psychological counseling</strong></p>
              <p>Every applicant is entitled to medical care. There is always a doctor and nursing staff attached to the reception facility where the applicant is staying. In addition to medical care, applicants are also entitled to psychological counseling. Common psychological problems are related to trauma in the home country and stress. The doctor affiliated with the center can refer the applicant to a specialized service.</p>
              
              <p><strong>Complaints and appeals</strong></p>
              <p>Any applicant can make a complaint if they are not satisfied with the living conditions or the services offered in the reception centre. If he does not agree with a sanction or with the medical assistance obtained, he can lodge an appeal.</p>
              
              <p><strong>Daily life</strong></p>
              <p>Various activities are organized in the shelter to offer the residents a meaningful use of time: workshops, courses, library, sports, etc. Most shelters also have an internet cafe, so that the residents can keep in touch with friends or family in the home country.</p>
              
              <p><strong>Education</strong></p>
              <p>Like all minors in Belgium, children who live in a reception center are subject to compulsory education. They usually go to school near the center. The choice of school is made in consultation with the parents. If possible, the children first go to a reception class, where their language skills and study level are tested and they follow adapted lessons. Afterwards, they attend classes in a regular classroom with the other children. In most shelters, the children receive homework assistance in the evenings by the staff or volunteers.</p>
              
              <p><strong>Training Courses</strong></p>
              <p>Applicants do not have access to the labor market for the first four months after submitting their application, but they can follow training courses in the meantime. These are organized both inside and outside the reception structure. The teachers can be staff members, but also people from outside the reception center and even other applicants. Common courses include language courses, sewing classes, cooking classes and computer science classes. The courses are aimed at both a stay in Belgium and a possible return.</p>
              <p>Community services</p>
              <p>The residents can perform various tasks in the shelter: cleaning the common areas, distributing meals, helping in the cloakroom, etc. For these 'community services' they receive some extra money in addition to their pocket money.</p>
              
              <p><strong>To work</strong></p>
              <p>Only applicants who have not received a decision four months after submitting their application are allowed to work. In this case, the right to reception and material assistance continues to apply, but the applicant will have to make a financial contribution if he continues to live in the reception centre.</p>
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
          <div style={{display:"none"}} className="dropdownExtra dropdownData mx-auto w-4/6 p-4 overflow-hidden animate__animated">
                <p>Data</p>
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