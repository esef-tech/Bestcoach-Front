import React, {useEffect} from 'react'
import Land from '../../Landing/Land'
import Seo from '../../Seo'
import { useSession } from '../../../context/SessionContext'



const TMME = () => {

  const { session, savePreferences, getPreferences } = useSession();

  useEffect(() => {
    if (session) {
      savePreferences({ ...getPreferences(), lastPage: '/mentorship' });
    }
  }, [session, savePreferences, getPreferences]);



  return (
    <React.Fragment>

      <Seo 
  title="Music Mentorship Experience | 1-on-1 Vocal Coaching & Growth"
  description="Experience personalized music mentorship with world-class coaches. Structured vocal training, career guidance, and real-time feedback to take your singing to the next level."
  keywords="music mentorship, vocal mentorship program, singing coach online, 1-on-1 vocal coaching, singer development, bestcoach mentorship"
  image="http://localhost:3000/static/media/TSS_NEW.57626190a76227486fd9.jpeg"
/>
      <Land />

    </React.Fragment>
  )
}

export default TMME
