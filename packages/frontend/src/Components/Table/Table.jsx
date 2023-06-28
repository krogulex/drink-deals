const Table = ({ promotionsData }) => {
  return (
    <div className="table">
      <h2 className="heading">today</h2>
      {promotionsData && (
        <ul className="promotion-list">
          {promotionsData.map((el) => (
            <li key={el.id} className="promotion-element">
                <h3>{el.name}</h3>
                <h3>Cena</h3>
                <p>{el.place}</p>
                <p>Godziny: </p>
                <button>Google maps</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Table;
