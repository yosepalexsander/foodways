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

export default NotFound;
