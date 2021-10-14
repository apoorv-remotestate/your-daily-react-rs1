import "./disputed.css";

const Disputed = () => {
  return (
    <>
      <div className="disputedMainContainer">
        <div className="disputedContainer">
          <div className="disputedUser">
            <div className="disputedUserData">
              <div className="disputedUserDataImg">
                <img src="/Assets/userDetailImg.png" />
              </div>
              <div className="disputedUserDataDetail">
                <h1>Order ID</h1>
                <h1>User Name</h1>
                <h2>+91 9890987901</h2>
              </div>
            </div>
            <div className="disputedUserType">
              <div className="disputedUserTypeLabel">
                <h1>Order Mode</h1>
                <h1>Deliver By</h1>
                <h1>Contact</h1>
              </div>
              <div className="disputedUserTypeValues">
                <h2>Delivery/Cart</h2>
                <h2>Rakesh</h2>
                <h2>+91 9890987901</h2>
              </div>
            </div>
          </div>
          <div className="disputedData">
            <div className="disputedDataHeader">
              <div className="disputedDataHeader1">
                <h1>Items</h1>
              </div>
              <div className="disputedDataHeader2">
                <h1>Qty.</h1>
              </div>
              <div className="disputedDataHeader3">
                <h1>Price</h1>
              </div>
            </div>
            <div className="disputedDataMain">
              <div className="disputedDataMainItem">
                <h2>Cabbage</h2>
                <h2>Potato</h2>
                <h2>Tomato</h2>
                <h2>Cabbage</h2>
              </div>
              <div className="disputedDataMainQty">
                <h2>1kg</h2>
                <h2>1kg</h2>
                <h2>2kg</h2>
                <h2>1kg</h2>
              </div>
              <div className="disputedDataMainPrice">
                <h2>30</h2>
                <h2>15</h2>
                <h2>30</h2>
                <h2>30</h2>
              </div>
            </div>
            <div className="disputedDataFooter">
              <h1 className="disputedDataHeader1"></h1>
              <h1 className="disputedDataHeader2">Total</h1>
              <h1 className="disputedDataHeader3">130</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Disputed;
