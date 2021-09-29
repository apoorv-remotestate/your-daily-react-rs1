export async function dataGet() {
  const token = localStorage.getItem("userToken");
  const baseurl = "https://dev-api.yourdaily.co.in";
  let data1 = await fetch(`${baseurl}/api/store-manager/dashboard/stats`, {
    method: "GET",
    headers: { Authorization: `${token}` },
  });
  let dataGot = await data1.json();

  const data = [
    {
      id: 1,
      label: "Total Cart Person",
      value: parseInt(`${dataGot.cartBoyCount}`),
      button: true,
    },
    {
      id: 2,
      label: "Total Delivery Boys",
      value: parseInt(`${dataGot.deliveryBoyCount}`),
      button: true,
    },
    {
      id: 3,
      label: "Total Users",
      value: parseInt(`${dataGot.userCount}`),
      button: true,
      color: "#19006E",
    },
    {
      id: 4,
      label: "Unassigned orders",
      value: parseInt(`${dataGot.unassignedOrders}`),
      button: true,
    },
    {
      id: 5,
      label: "Total Items",
      value: parseInt(`${dataGot.totalItems}`),
      button: true,
    },
    {
      id: 6,
      label: "Total Active Users",
      label2: "(Past 10 days order)",
      value: parseInt(`${dataGot.activeUsers}`),
      button: false,
      color: "#0E8B00",
    },
    {
      id: 7,
      label: "Total Ongoing Bookings",
      value: parseInt(`${dataGot.onGoingOrder}`),
      button: false,
    },
    {
      id: 8,
      label: "Past Week Bookings",
      value: parseInt(`${dataGot.bookingForLastWeek}`),
      button: false,
    },
    {
      id: 9,
      label: "Denied/Disputed order",
      value: parseInt(`${dataGot.deniedOrder}`),
      value2: parseInt(`${dataGot.disputedOrder}`),
      button: true,
    },
    {
      id: 10,
      label: "Scheduled order",
      value: parseInt(`${dataGot.unassignedOrders}`),
      button: true,
    },
  ];
  return data;
}
