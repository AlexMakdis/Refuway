import Header from "../components/Header";

export default function House() {
  return (
    <>
    <div className="h-screen bg-house bg-no-repeat bg-center bg-cover ">
      <Header/>
      <h1 className="mx-auto my-32 rounded-xl shadow-md md:max-w-2xl p-8 relative">House</h1>
    </div>
    
    </>
  );
}