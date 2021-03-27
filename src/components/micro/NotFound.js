import PropTypes from "prop-types";
import icon_notfound from "../../assets/icons/icon_notfound.svg";

const NotFound = ({ children }) => {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <img src={icon_notfound}
        alt="not found"
        style={{
          width: "100%",
          maxWidth: "500px"
        }} />
      {children}
    </div>
  )
}

NotFound.propTypes = {
  children: PropTypes.node
}

export default NotFound;
