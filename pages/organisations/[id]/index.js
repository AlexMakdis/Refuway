import { withRouter } from 'next/router'
import { useEffect, useState } from 'react';
import Header from '../../../components/Header';
import CloudImage from '../../../components/CloudImage';
import dynamic from 'next/dynamic'

const Map = dynamic(() => import("../../../components/Map"), {
  loading: () => "Loading...",
  ssr: false
});

 function Organisations({ router: { query } }) {
     const [organisation, setOrganisation] = useState('')
    useEffect(() => {
        if (query.object !== undefined){
            setOrganisation(JSON.parse(query.object))
        }
    }, [])

    function createMarkup(organisation) {
        if (organisation !== undefined) {
        return {__html: organisation}
        } else {
          return {__html: "No Data found"}
        }
      }

  return (
    <>
    <div>
     <div className=" bg-organisations bg-fixed bg-no-repeat bg-center bg-cover overflow-y-hidden">
      <Header/>
      <div className="my-auto">
      <div className="headPage  mx-auto rounded-xl w-4/5 p-8 overflow-hidden text-center text-white font-bold text-4xl uppercase ">
      <h1 className="">{organisation !== "" ? organisation.title : "Organisation"}</h1>
      </div>
      <div className="mx-auto my-10 bg-white rounded-xl shadow-md w-4/5 p-8 relative overflow-hidden">
          {organisation !== "" ?
            <div className="animate__animated animate__fadeInLeft">
            <div className="grid grid-cols-1 md:grid-cols-2">
            <div>
            { organisation.title !== undefined ? <h1 className="text-2xl font-bold mt-8" >{organisation.title}</h1> : console.log('No Description')}
            { organisation.description !== undefined ? <p className="text-xs italic mt-2 mx-2 mb-8 font-thin" >{organisation.description}</p> : console.log('No Description')}
            </div>
            { organisation.imgURL !== undefined ? 
              <div className="dataWizardImage">
                <CloudImage publicId={organisation.imgURL} />
              </div> : console.log('No Image')}
            </div>
            { organisation.text !== undefined ? 
              <div className="my-8 dataWizardText" dangerouslySetInnerHTML={createMarkup(organisation.text)}>
                
              </div>
              : console.log('No Text')}
            </div>
            : null }
            <div className="w-full h-full">
              <Map longitude={organisation.longitude} latitude={organisation.latitude}/>
            </div>
      </div>
           
      </div>
    </div>
    </div>
    </>
  );
}
export default withRouter(Organisations);