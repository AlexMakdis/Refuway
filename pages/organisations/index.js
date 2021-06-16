import { gql } from "@apollo/client";
import client from "../../apollo-client";
import Header from "../../components/header";
import Image from "next/image";
import Link from 'next/link';
import OrgImage from "../../components/OrgImage";

export default function Organisations({organisations}) {
  const org = organisations;

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
      <div  className="dropdownOrganisations dropdownData mx-auto w-4/6 p-4 overflow-hidden animate__animated">
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