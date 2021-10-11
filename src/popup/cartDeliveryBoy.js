import "./cartDeliveryBoy.css";
// import { YDPrimaryButton } from "../sdk";

const CartDeliverydetail = ({ data, setOpenModal }) => {
  return (
    <>
      <div
        className="cdContainer"
        // onClick={() => {
        //   setOpenModal(false);
        // }}
      >
        <form className="cdform-control">
          <div className="cdClose">
            <img
              src="/Assets/userClose.png"
              alt="close"
              onClick={() => {
                setOpenModal(false);
              }}
            />
          </div>
          <div className="cdMain">
            <div className="cdOneImg">
              {data.profileImageLink
                ? ""
                : (data.profileImageLink = "/Assets/userDetailImg.png")}
              <img src={data.profileImageLink} alt="profile" />
            </div>
            <div className="cdOneData">
              <div className="cdOneDataLabel">
                <label>Name</label>
                <label>Contact</label>
                <label>Reg. Date</label>
              </div>
              <div className="cdOneDataText">
                <div className="cdOneDataTextBox">{data.name}</div>
                <div className="cdOneDataTextBox">{data.contact}</div>
                <div className="cdOneDataTextBox">{data.regDate}</div>
              </div>
            </div>
          </div>
          <div className="cdTwo">
            <div className="cdTwoEle">
              <h1>${data.totalAmount}</h1>
              <h2>Total Business</h2>
            </div>
            <div className="cdTwoEle">
              <h1>{data.flagged}</h1>
              <h2>Flagged</h2>
            </div>
            <div className="cdTwoEle">
              <h1>{data.avgRating}</h1>
              <h2>Avg. Rating</h2>
            </div>
            <div className="cdTwoEle">
              <h1>{data.totalOrders}</h1>
              <h2>Total Order</h2>
            </div>
            <div className="cdTwoEle">
              <h1>{data.deniedOrders}</h1>
              <h2>Denied</h2>
            </div>
            <div className="cdTwoEle">
              <h1>{data.canceledOrders}</h1>
              <h2>Cancel</h2>
            </div>
          </div>
          {/* <div className="cdydbutton">
            <YDPrimaryButton
              style={{
                value: "Save Changes",
                width: "11.111vw",
                height: "2.778vw",
                marginBottom: "1.250vw",
                marginTop: "2.82vw",
                marginRight: "32.986vw",
                marginLeft: "32.986vw",
                fontSize: "1.250vw",
              }}
            />
          </div> */}
        </form>
      </div>
    </>
  );
};

export default CartDeliverydetail;
