import { useState, useEffect, useRef } from "react";

const JOB_STORIES_URL = "https://hacker-news.firebaseio.com/v0/jobstories.json";
const JOB_DETAILS_URL = "https://hacker-news.firebaseio.com/v0/item/{id}.json";
const LOAD_JOBS_STEP = 6;

export default function App() {
  const [jobIdList, setJobIdList] = useState([]);

  const [jobDetailsLoadedList, setJobDetailsLoadedList] = useState([]);

  const isMounted = useRef(null);

  useEffect(() => {
    if(!isMounted.current){
      fetchAllJobStories();
    }
  }, []);

  useEffect(() => {
    console.log("running");
      handleLoadMoreJobs();
  }, [jobIdList])

  const fetchAllJobStories = async () => {
    const url = JOB_STORIES_URL;
    try {
      const result = await fetch(url);
      const jobIdList = await result.json();
      console.log(jobIdList);
      setJobIdList(jobIdList);
    } catch (error) {
      console.error(error);
    }
  };

  /*
    Util Method
   */

  const handleLoadMoreJobs = () => {

    if (!jobIdList.length) {
      return;
    }
    const startIndex = jobDetailsLoadedList.length;
    const lastIndex = LOAD_JOBS_STEP;
    const shallowCopy = [...jobIdList];
    const jobIdsToFetch = shallowCopy.splice(startIndex, lastIndex);

    const fetchList = [];

    for (let id of jobIdsToFetch) {
      const url = JOB_DETAILS_URL.replace("{id}", id);
      const promise = fetch(url);
      fetchList.push(promise);
    }
    handleApiCall(fetchList);
  };

  const handleApiCall = async (fetchList) => {
    const jobDataListFromApi = [];
    try {
      const resultArray = await Promise.allSettled(fetchList);

      for (let response of resultArray) {
        let jobdata = await response.json();
        jobDataListFromApi.push(jobdata);
      }
    } catch (error) {
      console.error(error);
    }

    setJobDetailsLoadedList((prev) => [...prev, ...jobDataListFromApi]);
  };

  return (
    <div className="app-wrapper">
      <div className="title">Hacker News Jobs Board</div>

      <div className="job-list-wrapper">
        {jobDetailsLoadedList.map((jobDetailItem) => (
          <JobCard key={jobDetailItem.id} {...jobDetailItem} />
        ))}
      </div>

      <div className="actions-wrapper">
        <button onClick={handleLoadMoreJobs}> Load more Jobs</button>
      </div>
    </div>
  );
}

const JobCard = ({ title, time, url, by }) => {
  const timeStamp = new Date(time).toDateString();

  const handleOnTitleClick = () => {
    window.open(url, "_blank");
  };

  return (
    <div className="job-wrapper">
      <div className="job-title" onClick={handleOnTitleClick}>
        {title}
      </div>
      <div className="card-body-wrapper">
        <div className="by">{by}</div>
        <div className="by">{timeStamp}</div>
      </div>
    </div>
  );
};
