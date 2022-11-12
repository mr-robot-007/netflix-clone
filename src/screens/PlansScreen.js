import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { loadStripe } from "@stripe/stripe-js";
import db from "../firebase";
import "./PlansScreen.css";

function PlansScreen() {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    db.collection("customers")
      .doc(user.uid)
      .collection("subscriptions")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (subscription) => {
          setSubscription({
            role: subscription.data().role,
            current_period_end: subscription.data().current_period_end.seconds,
            current_period_start:
              subscription.data().current_period_start.seconds,
          });
        });
      });
  }, [user.uid]);
  console.log(subscription);
  const loadCheckout = async (priceId) => {
    // console.log("clicked ", priceId);
    console.log(user.uid);
    const docRef = await db
      .collection("customers")
      .doc(user.uid)
      .collection("checkout_sessions")
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });
    // console.log("reached here 1");
    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data();
      if (error) {
        // show and error to the customer and
        // inspect your Cloud fucntions logs in the firebase console.
        alert(`An error occured:  ${error.message}`);
      }
      if (sessionId) {
        // we have a sessions, lets redirect to checkout
        // init stripe

        const stripe = await loadStripe(
          "pk_test_51M2ynSSBdnW5GU1YVh34B7AHBIVOks9N9NeEwGevI58xzfJFCf04erEVdsvXo0NpP5cmqrf0CuOWxAqe9AxkJvVS00b8wUIHl1"
        );
        stripe.redirectToCheckout({ sessionId });
      }
      // console.log("iside here");
    });
  };
  useEffect(() => {
    db.collection("products")
      .where("active", "==", true)
      .get()
      .then((querySnapshot) => {
        const products = {};
        querySnapshot.forEach(async (productDoc) => {
          products[productDoc.id] = productDoc.data();
          const priceSnap = await productDoc.ref.collection("prices").get();
          priceSnap.docs.forEach((price) => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data(),
            };
          });
        });
        setProducts(products);
      });
  }, []);
  // console.log(products);
  return (
    <div className="plansScreen">
      <br />
      {subscription && <p>Renenwal Date: {new Date(subscription?.current_period_end*1000).toLocaleDateString()}</p>}
      {Object.entries(products).map(([productId, productData]) => {
        // add some logic to check if the users subscription is active
        console.log(productData);
        const isCurrentPackage = productData.name
          ?.toLowerCase()
          .includes(subscription?.role.toLowerCase());
          console.log(isCurrentPackage);
        return (
          <div key={productId} className={`${isCurrentPackage && "plansScreen__plan--disabled"} plansScreen__plan })`}>
            <div className="plansScreen__info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button 
              onClick={() =>
                !isCurrentPackage && loadCheckout(productData.prices.priceId)
              }
            >
              {isCurrentPackage ? "Current Package" : "Subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default PlansScreen;
