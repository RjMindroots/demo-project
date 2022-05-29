import React from "react";
import { createPopper } from "@popperjs/core";
import { useDispatch } from "react-redux";
import { postRequest } from "commonapi";
import { getUser } from "Redux/userListReducer";

const NotificationDropdown = ({data}) => {
  const dispatch = useDispatch()


  const handleStatus = async () => {
    const dataMain = {status : !data.status}                  
    const response = await postRequest({sub_url: `/admin/updateuser/${data._id}`, dataMain  })
    if(response.status === true) {
      dispatch(
        getUser()
      )
    }
  }

  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "left-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  return (
    <>
      <a
        className="text-blueGray-500 py-1 px-3"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <i className="fas fa-ellipsis-v"></i>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <div onClick={handleStatus} className="userStatus cursor-pointer px-4"> {data.status ? "Disable" : "Activate"} </div>
        
      </div>
    </>
  );
};

export default NotificationDropdown;
