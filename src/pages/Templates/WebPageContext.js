import { createContext, useContext, useState, useEffect, useRef, useCallback } from "react"; // prettier-ignore
import { useParams } from "react-router-dom";

// WebPageContext for holding the state and actions related to the web page
const WebPageContext = createContext();

// custom hook to access the WebPageContext
export function useWebPage() {
  return useContext(WebPageContext);
}

// WebPageProvider component that wraps children components and provides the WebPageContext
export function WebPageProvider({ webPage }) {
  // variables to be shared across all the templates
  const { id } = useParams();
  const [resdata, setresdata] = useState({});
  const [fooddata, setfooddata] = useState([]);
  const [cart, setcart] = useState({});
  const [showCart, setShowCart] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showViewReviewForm, setShowViewReviewForm] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [address, setAddress] = useState("");

  // write reviews handlers
  const handleWriteReviewClick = (event) => {
    event.stopPropagation();
    setShowReviewForm(true);
  };

  const handleReviewFormClose = () => {
    setShowReviewForm(false);
  };

  // view reviews handlers
  const handleShowReviewClick = () => {
    setShowViewReviewForm(true);
  };

  const handleViewReviewFormClose = () => {
    setShowViewReviewForm(false);
  };

  // reference for iframe
  const frameRef = useRef(null);
  // function to update the iframe location for Google Maps
  const updateiframeLocation = useCallback(() => {
    if (frameRef.current) {
      frameRef.current.contentWindow.location.replace(
        `https://maps.google.com/maps?q=${address.replace(
          " ",
          "%20"
        )}&t=k&z=17&ie=UTF8&iwloc=&output=embed`
      );
    }
  }, [address]);

  // fetch reviews and update the Google Maps iframe location
  useEffect(() => {
    const fetchAverageRating = async () => {
      let url = `https://6b2uk8oqk7.execute-api.us-west-2.amazonaws.com/prod/review?userId=${id}`;
      const response = await fetch(url);
      const data = await response.json();
      setReviews(data);
    };
    fetchAverageRating();
    console.log(resdata["name"] + " is name");

    updateiframeLocation();
  }, [id, resdata, updateiframeLocation]);

  // view and close cart
  const handleShowCart = () => {
    setShowCart(true);
  };
  const handleShowCartClose = () => {
    setShowCart(false);
  };

  // fetch restaurant data and update the state
  useEffect(() => {
    let username = id;
    async function userAction() {
      await fetch(
        `https://6b2uk8oqk7.execute-api.us-west-2.amazonaws.com/prod/restaurantById?id=${username}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        //check if data was correctly sent in console log
        .then((response) => response.json())
        .then((data) => {
          if (data.length !== 0) {
            setresdata(data[0]);
            setfooddata(data[0]["Food"]);
            setAddress(
              data[0]["address1"] +
                " " +
                data[0]["address2"] +
                " " +
                data[0]["city"] +
                " " +
                data[0]["state"] +
                " " +
                data[0]["zipCode"]
            );
          }
          console.log("data is below");
          console.log(JSON.stringify(data));
        });
    }
    userAction();
  }, [id]);


  // url for restaurant's main image (banner image)
  const bucketUrl =
    "https://d12zok1slvqtin.cloudfront.net/fit-in/1250x200/" +
    resdata["mainImageUrl"];

  // object to hold all the variables and handlers
  const webPageVars = {
    resdata,
    fooddata,
    cart,
    setcart,
    showCart,
    showReviewForm,
    showViewReviewForm,
    reviews,
    handleWriteReviewClick,
    handleShowReviewClick,
    handleReviewFormClose,
    handleViewReviewFormClose,
    handleShowCart,
    handleShowCartClose,
    bucketUrl,
    id,
    frameRef,
  };

  // return the WebPageContext.Provider component with the object of all the variables and handlers
  // so that all the templates will have access to it
  return (
    <WebPageContext.Provider value={webPageVars}>
      {webPage}
    </WebPageContext.Provider>
  );
}