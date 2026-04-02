import ReactDOM from 'react-dom' ;

const Backdrop=()=>{
 return <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"></div>
};

const Modaloverlay=props=>{
 return <div className="position-fixed top-50 start-50 translate-middle bg-white p-4 rounded shadow w-50">{props.children}</div>
};

const Modal=(props)=>{
  return (
  <>
  
    {ReactDOM.createPortal(<Backdrop/>,document.getElementById("overlays"))}
    {ReactDOM.createPortal(<Modaloverlay>{props.children}</Modaloverlay>,document.getElementById("overlays"))}
  
  </>
  )
}

export default Modal ;