import React, {useEffect} from 'react'
import './Package.css'
import Programs from '../../PROGRAMS/Programs'
import Seo from '../../Seo'
import { useSession } from '../../../context/SessionContext';

const Package = () => {

const { session, savePreferences, getPreferences } = useSession();
useEffect(() => {
    if (session) {
      savePreferences({ ...getPreferences(), lastPage: '/packages' });
    }
  }, [session, savePreferences, getPreferences]);

  return (
    <React.Fragment>
<Seo 
  title="Bestcoach Music Packages | Choose Your Vocal Growth Plan"
  description="Flexible packages for every singer. From free community access to premium 1-on-1 mentorship and exclusive webinars – find the perfect plan for your voice."
  keywords="bestcoach packages, singing lesson plans, vocal coaching packages, music mentorship pricing"
  image="https://images.squarespace-cdn.com/content/v1/6213f6b6150312039937363e/4bd42772-e43d-4891-97b2-2f7cc06d9e47/20231217__A7C1741.jpg"
/>
    
    <>
      <Programs />
    </>

    </React.Fragment>
  )
}

export default Package
