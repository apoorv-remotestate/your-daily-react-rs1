export function tableDesign(data, columns) {
  if (data.length !== 0) {
    return (
      <table>
        <colgroup>
          <col span="11" style={{ color: "#000", background: "#000" }} />
        </colgroup>
        <thead>
          <tr>
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
          <tr>
            {columns.map((data) => (
              <th>{data}</th>
            ))}
          </tr>
        </thead>
      </table>
    );
  }
}
