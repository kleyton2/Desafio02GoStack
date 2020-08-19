import React, { useEffect, useState } from "react";
import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories,setRepositories] = useState([]);
  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories([...response.data]);
      // console.log(response);
    });
  }, []);

  async function handleAddRepository() {
   const response = await api.post('repositories', {
      title: "Novo projeto",
      url: "https://github.com/kleyton2/Desafio01GoStack",
      techs: ["NodeJS, ReactJS, React Native"]
    });
   
    setRepositories([...repositories, response.data ]);
  }

  async function handleRemoveRepositorie(id) {
    await api.delete(`repositories/${id}`)
    const repositoriesUpdated = repositories.filter(repo => repo.id !== id)

    setRepositories([...repositoriesUpdated])
  }

  return (
    <div>
      <ul data-testid="repository-list">   
          {repositories.map(repositories => {
          console.log(repositories.id)
          return (
            <li key={repositories.id}>
                  {repositories.title}
  
            <button onClick={() => handleRemoveRepositorie(repositories.id)}> Remover </button>
            
            </li>
          )
          })}
         {repositories.map(repositorie => <li key={repositorie.id}>{repositories.title}</li>)}
      </ul>  
      <button onClick={handleAddRepository}>Adicionar</button> 
            
    </div>
  );
}

export default App;
