import React, { useState } from "react";
import PersistResInfo from "./PersistResInfo";
import PersistResMenu from "./PersistResMenu";
import PersistResReview from "./PersistResReview";
import { Button } from "react-bootstrap";
import Auth from "@aws-amplify/auth";

//Source video: https://www.youtube.com/watch?v=wOxP4k9f5rk
//This file is a container for all the steps of the restaurant owner webpage creator form
function PersistResForm() {
  //page keeps track of which step we are on
  //will mutate the variable setPage
  //useState(0) = ResInfo
  const [page, setPage] = useState(0);
  //state object that contains all the different fields for ResInfo
  const [formData, setFormData] = useState({
    resName: "",
    phoneNo: "",
    resCuisine: "",
    address1: "",
    address2: "",
    city: "",
    usstate: "",
    zip: "",
    openhours: "",
    closehours: "",
  });

  //state object that contains all the fields for ResMenu
  const [menuItems, setMenuItems] = useState([
    { menuItem: "", menuPrice: "", menuDesc: "" },
  ]);

  const userAction = async () => {
    //let user = await Auth.currentSession();
    // let token = user.getAccessToken().getJwtToken();
    let nameJson = await Auth.currentUserInfo();
    let name = nameJson["username"];
    console.log(JSON.stringify(nameJson));

    const newMenu = [];
    for (let i = 0; i < menuItems.length; i++) {
      newMenu[i] = {
        "foodId": menuItems[i]["menuItem"],
        "foodName": menuItems[i]["menuItem"],
        "foodType": menuItems[i]["menuItem"],
        "foodPrice": menuItems[i]["menuPrice"]
      }
    }

    const data = {
      Food: newMenu,
      Phone: formData.phoneNo,
      Address:
        formData.address1 +
        " " +
        formData.address2 +
        ", " +
        formData.city +
        " " +
        formData.usstate +
        " " +
        formData.zip,
      Cuisine: formData.resCuisine,
      userID: name,
      Name: formData.resName,
      OpenHours: formData.openhours,
      CloseHours: formData.closehours
    };

    console.log("submitting, json listed below");
    console.log(JSON.stringify(data));

    await fetch(
      'https://6b2uk8oqk7.execute-api.us-west-2.amazonaws.com/prod/restaurant',
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    )
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
    });
  };

  //titles that appear at the top left of the form
  const FormTitles = [
    "Restaurant Information",
    "Restaurant Menu",
    "Review Restaurant Information:",
  ];

  //check which page you are in
  //return a component based on which page we are in ex: ResInfo or ResMenu
  //formData prop will keep the form persisting throughout
  const PageDisplay = () => {
    if (page === 0) {
      // keep restauraunt info persistent even when navigating to a new page
      return <PersistResInfo formData={formData} setFormData={setFormData} />;
    } else if (page === 1) {
      return (
        //keep the menu items persistent when navigating away from page
        <PersistResMenu menuItems={menuItems} setMenuItems={setMenuItems} />
      );
    } else {
      return <PersistResReview formData={formData} menuItems={menuItems} />;
    }
  };

  return (
    <div className="form">
      {/* displays the FormTitles based on which page we are on */}
      <h1>{FormTitles[page]}</h1>

      <div className="body">{PageDisplay()}</div>

      <Button
        // previous button disabled if on page 0
        disabled={page === 0}
        onClick={() => {
          // enables prev button to work by decrementing
          setPage((currPage) => currPage - 1);
        }}
      >
        Prev
      </Button>
      <Button
        onClick={() => {
          if (page === FormTitles.length - 1) {
            //logs the data
            console.log(formData);
            console.log(menuItems);
            userAction();
          } else {
            // enables next button to work by incrementing
            setPage((currPage) => currPage + 1);
          }
        }}
      >
        {/* Conditionally render the button to display submit
        on the last page and next on all other pages */}
        {page === FormTitles.length - 1 ? "Submit" : "Next"}
      </Button>
    </div>
  );
}

export default PersistResForm;