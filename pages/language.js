import { gql } from "@apollo/client";
import client from "../apollo-client";
import Header from "../components/header";
import Image from "next/image";
import Link from 'next/link';
import OrgImage from "../components/OrgImage";

export default function Language({organisations}) {
  const org = organisations.filter(organisations => organisations.category === "LANGUAGE");

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
    <div className="h-screen bg-language bg-fixed bg-no-repeat bg-center bg-cover overflow-y-hidden">
      <Header/>
      <div className="my-auto">
      <div className="headPage  mx-auto rounded-xl w-4/5 p-8 overflow-hidden text-center text-white font-bold text-4xl uppercase ">
      <h1 className="">language</h1>
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
          <p><strong>Dutch lessons:</strong></p>
          <p><em>An asylum seeker can immediately register for a Dutch Second Language 'NT2' course. No registration fee on presentation of 'certificate for registration of asylum seekers in adult education' 'via the reception centre'.</em></p>
          <p>The <a href="https://www.huisnederlandsbrussel.be/">House of Dutch</a> 'Agentschap Integratie en Inburgering' first conducts a screening, tests the language level and then refers the refugee to the most appropriate course.</p>
          <p>In concrete terms, depending on the prior knowledge and learning skills, you will arrive at:</p>
          <ul>
          <li>Centers for Basic Education: for those who are illiterate, have had less than 7 years of schooling or have more limited cognitive skills</li>
          <li>Centers for Adult Education CVO offering NT2: for those with low-skilled and slow learning, but who have not been referred to a UTC</li>
          <li>University Center for Language Teaching UTC: for people with very high learning skills</li>
          </ul>
          <p><a href="https://www.desocialekaart.be/node/518451">The Center for Language and Education</a> is the Flemish expertise center for language education. It is aimed at teachers, counselors, CLB staff, adult education teachers and teacher educators.</p>
          <p>The web page <a href="https://wimpectoor.wixsite.com/taaltools">Taaltools</a> offers an overview of user-friendly ICT, which facilitates innovative teaching methods in the classroom. For example, there are many tools related to NT2 or foreign languages ​​available.</p>
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
              <div className=" text-center shadow-md rounded-xl p-0 md:p-8 font-bold text-xs hover:bg-green hover:text-white transition duration-500 ease-in-out cursor-pointer"  key={organisation.id}>
                <Link href={{ pathname: '/organisations/[id]', query: { object: JSON.stringify(organisation) } }} as={`/organisations/${organisation.id}`} passHref>
                  <div className="flex flex-col justify-center orgItemFit">
                <OrgImage publicId={organisation.imgURL} />
                <p className="text-xs md:text-lg font-bold text-blue">{organisation.title}</p>
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
                <p></p>
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