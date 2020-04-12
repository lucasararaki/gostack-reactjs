import React, { useEffect, useState } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories')
      .then(response => {
        setRepositories(response.data);
      });
  }, []);

  async function handleAddRepository() {
    const repositoryModel = {
      title: new Date().toDateString(),
      url: 'http://',
      techs: []
    }

    api.post('repositories', repositoryModel)
      .then(response => {
        console.log(response.data);

        const repositoriesList = [...repositories, response.data];

        setRepositories(repositoriesList);
      })
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`)
      .then(reponse => {
        const repositoriesList = repositories.filter(repository => {
          return repository.id !== id;
        });

        setRepositories(repositoriesList);
      });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository => (
            <li key={repository.id}>
              { repository.title }

              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          ))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
