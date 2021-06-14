import Link from 'next/link';
import { useMutation, gql } from '@apollo/client';
import Image from 'next/image';
import { useEffect } from 'react';


export default function OrganisationItem({organisation}) {
    const DELETE = gql`
    mutation deleteOrganisation($id: ID!){deleteOrganisation(organisationId: $id){text}}
    `
    const [deleteItem, {loading, error, data}] = useMutation(DELETE);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if(data) {
                alert("Organisation has been deleted")
              }
              } else {
                  console.log('Server');
              }
        
      }, [data]);

  return (
    <>
    <div className="py-4 relative">
    <Link href="/admin/organisations/[id]" as={`/admin/organisations/${organisation.id}`}>
        <div className="adminCard p-8 overflow-hidden relative text-center shadow-md rounded-xl font-bold text-xs hover:bg-green hover:text-white transition duration-500 ease-in-out cursor-pointer">
                <p className="my-4">{organisation.organisationLi}</p>
                <h1>{organisation.title}</h1>
        </div>
    </Link>
        <form className="absolute -top-1 right-0" onSubmit={e=> {
            e.preventDefault();
            deleteItem({ variables: { id: organisation.id } });
            }}
            >
        <button type="submit">
            <Image
                src="/icons/remove.svg"
                alt="remove"
                width={20}
                height={20}
             />
        </button>
        </form>
    </div>            

    </>
  );
}