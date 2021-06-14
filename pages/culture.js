import Head from "next/head";
import styles from "../styles/Home.module.css";
import { gql } from "@apollo/client";
import client from "../apollo-client";
import Header from "../components/Header";
import Image from "next/image";
import Link from 'next/link';
import OrgImage from "../components/OrgImage";

export default function Culture({organisations}) {
  const org = organisations.filter(organisations => organisations.category === "CULTURE");


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
    <div className="h-screen bg-culture bg-fixed bg-no-repeat bg-center bg-cover overflow-y-hidden">
      <Header/>
      <div className="my-auto">
      <div className="headPage  mx-auto rounded-xl w-4/5 p-8 overflow-hidden text-center text-white font-bold text-4xl uppercase ">
      <h1 className="">Culture</h1>
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
          <div style={{display:"none"}} className="dataWizardText dropdownData dropdownText mx-auto w-4/6 p-4 overflow-hidden animate__animated">
          <p><strong>What is UiTPAS?</strong></p>
          <p>UiTPAS is your discount card for surprising free time outdoors. Collect points when you participate and trade benefits. People in poverty are entitled to the opportunity rate at the checkout.</p>
          <p>Today you can use UiTPAS at more than 2000 locations. Search all organizers and discover the possibilities UiTPAS has to offer.</p>
          <p>With your saved points you can exchange a lot of benefits. Search the benefits in search of a discount, gadget or gift or a unique experience with one of the more than 2000 organizers.</p>
          <p><strong>Cost price UitPAS</strong></p>
          <ul>
          <li>Adults: &euro;5</li>
          <li>Young people -18 years: &euro; 2</li>
          <li>UiTPAS with opportunity rate : &euro; 1</li>
          </ul>
          <p><em>An UiTPAS is personal and registered.</em></p>
          <p><strong>What do you bring to the point of sale? &nbsp;</strong>Your identity card. For children up to 12 years old, a sticker from the health insurance company is sufficient.</p>
          <p><strong>Are you entitled to an UiTPAS with a discount rate? Bring one of the following certificates with you, the certificate may be a maximum of 3 months old:</strong></p>
          <ul>
          <li>certificate of increased compensation</li>
          <li>certificate of debt mediation</li>
          <li>living wage certificate</li>
          <li>certificate of budget management or budget supervision</li>
          </ul>
          <p><strong>Are you a resident of Merelbeke, Destelbergen, Melle or Lochristi and are you entitled to an UiTPAS with an opportunity rate?</strong></p>
          <p>Then you have to buy your UitPAS in your own municipality.</p>
          <p><em>Anyone can purchase an UiTPAS Ghent region, whether you are a resident of Ghent or not. For example, students can also purchase an UiTPAS. Please note: an UiTPAS with an opportunity rate can only be purchased by people who are domiciled in Ghent, Merelbeke, Destelbergen, Melle or Lochristi and who have a correct certificate.</em></p>
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