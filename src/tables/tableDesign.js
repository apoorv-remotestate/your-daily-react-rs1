export function tableDesign(data, columns) {
  if (data.length !== 0) {
    return (
      <table>
        <thead>
          <tr key={Object.values(data)[0]}>
            {columns.map((data) => (
              <th>{data}</th>
            ))}
          </tr>
        </thead>
        <tbody key={Date.now()}>
          {data.map((data) => (
            <tr key={Object.values(data)[0]}>
              {Object.values(data).map((data) => {
                return <td>{data}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );
  } else {
    return (
      <table>
        <thead>
          <tr key={Object.values(data)[0]}>
            {columns.map((data) => (
              <th>{data}</th>
            ))}
          </tr>
        </thead>
      </table>
    );
  }
}
