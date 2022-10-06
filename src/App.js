import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);
  const [itensPerPage, setItensPerPage] = useState(5);
  const [page, setPage] = useState(0)

  const fetchData = async () => {
    const result = await fetch(
      `http://localhost:3000/itens?itensPerPage=${itensPerPage}&page=${page }`
    )
      .then((response) => response)
      .then((json) => json.json());

    setList(result);
    return;
  };

  const fetchCount = async () => {
    const result = await fetch("http://localhost:3000/count")
      .then((response) => response)
      .then((json) => json.json());

    setCount(result.count);
    return;
  };

  useEffect(() => {
    fetchData();
    fetchCount();
  }, []);

  useEffect(() => {
    fetchData()
  }, [itensPerPage, page])

  return (
    <div>
      {list.map((item) => {
        return (
          <div>
            {item.borough} {item.cuisine}
          </div>
        );
      })}

      <select
        onChange={(e) => {
          setItensPerPage(Number(e.target.value));
        }}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
        <option value={25}>25</option>
      </select>


        <span>{(page * itensPerPage) + 1}-{(page+1) * itensPerPage} de {count}</span>

        <button onClick={(e) => {setPage(0)  }}>Primeira Página</button>
        <button onClick={(e) => {setPage(page - 1)  }}>Página Anterior</button>
        <button onClick={(e) => {setPage(page + 1)  }}>Página Seguinte</button>
        <button onClick={(e) => {setPage(count / itensPerPage - 1) }}>Última Página</button>


    </div>
  );
}

export default App;
