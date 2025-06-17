import { useEffect } from 'react';
import classes from './NewsletterSignup.module.css';
import { useFetcher,Form } from 'react-router-dom';
function NewsletterSignup() {
  const fetcher=useFetcher();// if you wanna send your requests behind the scenes, so to say, without triggering any route changes
  const {data, state} =fetcher

  useEffect(()=>{
    if(state==='idle' && data && data.message){
      window.alert(data.message)
    }
  },[data,state])
  return (
    <fetcher.Form 
    method="post" 
    className={classes.newsletter}
    action='/newsletter'
    >
      <input
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;