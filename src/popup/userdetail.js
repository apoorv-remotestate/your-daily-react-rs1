import "./userdetail.css";
// import { YDPrimaryButton } from "../sdk";

const userdetail = ({ data, setOpenModal }) => {
  return (
    <>
      <div className="udContainer">
        <form className="udform-control">
          <div className="udClose">
            <img
              src="/Assets/userClose.png"
              alt="close"
              onClick={() => {
                setOpenModal(false);
              }}
            />
          </div>
          <div className="udMain">
            <div className="udOneImg">
              {data.profileImageLink
                ? ""
                : (data.profileImageLink = "/Assets/userDetailImg.png")}
              <img src={data.profileImageLink} alt="profile" />
            </div>
            <div className="udOneData">
              <div className="udOneDataLabel">
                <label>Name</label>
                <label>Contact</label>
                <label>Reg. Date</label>
              </div>
              <div className="udOneDataText">
                <div className="udOneDataTextBox">{data.name}</div>
                <div className="udOneDataTextBox">{data.contact}</div>
                <div className="udOneDataTextBox">{data.regDate}</div>
              </div>
            </div>
          </div>
          <div className="udTwo">
            <div className="udTwoEle">
              <h1>{data.totalOrders}</h1>
              <h2>Total Order</h2>
            </div>
            <div className="udTwoEle">
              <h1>{data.totalAmount}</h1>
              <h2>Total Amount</h2>
            </div>
            <div className="udTwoEle">
              <h1>{data.canceledOrders}</h1>
              <h2>Cancel</h2>
            </div>
            <div className="udTwoEle">
              <h1>{data.flagCount}</h1>
              <h2>Flagged</h2>
            </div>
            <div className="udTwoEle">
              <h1>{data.avgRating}</h1>
              <h2>Avg. Rating</h2>
            </div>
          </div>
          <div className="udThree">
            <div className="udThreeTab">
              <h1>Most Used Location</h1>
              {data.topThreeLocation.map((data) => {
                return <h2>{data.addressData}</h2>;
              })}
            </div>
            <div className="udThreeTab">
              <h1>Top Ordered Items</h1>
              {data.topThreeItems.length !== 0 ? (
                data.topThreeItems.map((data) => {
                  return <h2>{data}</h2>;
                })
              ) : (
                <h2>No Items</h2>
              )}
            </div>
          </div>
          {/* <div className="udydbutton">
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

export default userdetail;
