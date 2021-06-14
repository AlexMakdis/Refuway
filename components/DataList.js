import DataItem from './DataItem';

export default function DataList({data}) {
  return (
    <>
    <div className="container mx-auto rounded-xl w-4/5 ">
        <div className="my-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {data.map((data) => (
                <DataItem data={data} key={data.id}></DataItem>
            ))}
        </div>
    </div>
    </>
  );
}