export function tableDesign(data) {
  const dataTest = data[1];
  console.log(data);
  if (data.length !== 0) {
    return (
      <table>
        <thead>
          {[dataTest].map((data) => (
            <tr key={Object.values(data)[0]}>
              {Object.keys(data).map((data) => (
                <th>{data}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody key={Date.now}>
          {data.map((data) => (
            <tr key={Object.values(data)[0]}>
              {Object.values(data).map((data) => {
                <td>{data}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  return null;
}
