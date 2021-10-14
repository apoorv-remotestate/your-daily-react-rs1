export async function tableGet(staffType) {
  const token = localStorage.getItem("userToken");
  const baseurl = "http://yd-dev-elb-841236067.ap-south-1.elb.amazonaws.com";
  if (staffType === "cart-boy" || staffType === "delivery-boy") {
    const table1 = await fetch(
      `${baseurl}/api/store-manager/dashboard/staff/${staffType}`,
      { method: "GET", headers: { Authorization: `${token}` } }
    );
    let tableGot = await table1.json();

    return tableGot;
  }
  if (staffType === "user-detail") {
    const table1 = await fetch(
      `${baseurl}/api/store-manager/dashboard/user/details`,
      { method: "GET", headers: { Authorization: `${token}` } }
    );
    let tableGot = await table1.json();
    return tableGot;
  }
}
