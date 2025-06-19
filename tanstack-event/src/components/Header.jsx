import { useIsFetching } from "@tanstack/react-query";
export default function Header({ children }) {
  const fetching=useIsFetching() ;// find out whether React Query is fetching somewhere in the application or not.
  //zero if React Query is not fetching any data. zero at this point of time anywhere in the application,if React Query is not fetching any data
  return (
    <>
      <div id="main-header-loading">
        {fetching>0 && ( <progress />)}
       
      </div>
      <header id="main-header">
        <div id="header-title">
          <h1>React Events</h1>
        </div>
        <nav>{children}</nav>
      </header>
    </>
  );
}
