import React, {Fragment} from "react";
import { useHistory  } from "react-router-dom";
import { createPopper } from "@popperjs/core";
import { toast } from "react-toastify";
import { postRequest } from "commonapi";
import { setauth } from "Redux/authReducer";
import { useDispatch } from "react-redux";

function SuccessToast({ message }) {
  return (
    <Fragment>
      <div className="toastify-header">
        <div className="title-wrapper">
          <h6 className="toast-title">{message}</h6>
        </div>
      </div>
    </Fragment>
  );
}

const UserDropdown = () => {
  const history = useHistory ()
  const dispatch = useDispatch()
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  const handleLogout = async () =>{
    const dataMain = {refresh_token: localStorage.getItem('refresh_token')}
    const response = await postRequest({sub_url: '/logout', dataMain})
    toast.success(<SuccessToast message={response.message} />, { hideProgressBar: true })
    console.log(response)
    console.log(typeof(response.status))
    if (response.status === 1) { 
      localStorage.clear()
      dispatch(setauth({
        isAuth: false,
        isAdmin : false
      }))
      history.push("/login")
    } 
  }
  return (
    <>
      <a
        className="text-blueGray-500 block"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            <img
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-lg"
              src={require("assets/img/team-1-800x800.jpg").default}
            />
          </span>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <div
          className={
            "text-sm py-2 cursor-pointer px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={handleLogout}
        >
          Logout
        </div>
       
      </div>
    </>
  );
};

export default UserDropdown;
