export async function tableGet(staffType) {
  const token = localStorage.getItem("userToken");
  const baseurl = "https://dev-api.yourdaily.co.in";
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
    console.log(tableGot);
    return tableGot;
  }
}
