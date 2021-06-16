import Link from 'next/link';
import { useMutation, gql } from '@apollo/client';
import Image from 'next/image';
import { useEffect } from 'react';


export default function DataItem({data}) {
    const DELETE = gql`
    mutation deleteData($id: ID!){deleteData(dataId: $id){text}}
    `
    const [deleteItem, data1] = useMutation(DELETE);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if(data1.data) {
                alert("Data has been deleted")
              }
              } else {
                  console.log('Server');
              }
      }, [data1.data]);

  return (
    <>
    <div className="py-4 relative">
        <Link href="/admin/data/[id]" as={`/admin/data/${data.id}`}>
            <div className="adminCard p-8 overflow-hidden relative text-center shadow-md rounded-xl font-bold text-xs hover:bg-green hover:text-white transition duration-500 ease-in-out cursor-pointer">
                <p className="my-4">{data.dataLi}</p>
                <h1>{data.title}</h1>
            </div>
        </Link>
        <form className="absolute -top-1 right-0" onSubmit={e=> {
            e.preventDefault();
            deleteItem({ variables: { id: data.id } });
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