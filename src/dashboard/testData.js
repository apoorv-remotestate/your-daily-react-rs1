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
      link: "/details/cart-boy",
    },
    {
      id: 2,
      label: "Total Delivery Boys",
      value: parseInt(`${dataGot.deliveryBoyCount}`),
      button: true,
      link: "/details/delivery-boy",
    },
    {
      id: 3,
      label: "Total Users",
      value: parseInt(`${dataGot.userCount}`),
      button: true,
      link: "/details/user-detail",
      color: "#19006E",
    },
    {
      id: 4,
      label: "Unassigned orders",
      value: parseInt(`${dataGot.unassignedOrders}`),
      link: "ddd",
      button: true,
    },
    {
      id: 5,
      label: "Total Items",
      value: parseInt(`${dataGot.totalItems}`),
      link: "asd",
      button: true,
    },
    {
      id: 6,
      label: "Total Active Users",
      label2: "(Past 10 days order)",
      value: parseInt(`${dataGot.activeUsers}`),
      link: "adasd",
      button: false,
      color: "#0E8B00",
    },
    {
      id: 7,
      label: "Total Ongoing Bookings",
      value: parseInt(`${dataGot.onGoingOrder}`),
      link: "adsad",
      button: true,
    },
    {
      id: 8,
      label: "Past Week Bookings",
      value: parseInt(`${dataGot.bookingForLastWeek}`),
      link: "zxczc",
      button: true,
    },
    {
      id: 9,
      label: "Denied/Disputed order",
      value: parseInt(`${dataGot.deniedOrder}`),
      value2: parseInt(`${dataGot.disputedOrder}`),
      link: "/order/denied",
      button: true,
    },
    {
      id: 10,
      label: "Scheduled order",
      value: parseInt(`${dataGot.unassignedOrders}`),
      link: "/order/scheduled",
      button: true,
    },
  ];
  return data;
}
