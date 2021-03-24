import LoadingIcon from "../icons/LoadingIcon"

import "./styles.css";

const Loading = () => {
  return (
    <div className="loading-wrapper">
      <div className="loading">
        <LoadingIcon viewBox="0 0 40 40" className="loading-icon" />
      </div>
    </div>
  )
}

export default Loading;
