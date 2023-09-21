import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "./home.css";

const List = () => {
  const [userData, setUSerData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await axios("http://127.0.0.1:8000/api/users");
      //console.log(result.data.results);
      setUSerData(result.data.results);
    } catch (err) {
      console.log("somthing Wrong");
    }
  };

  const handleDelete = async (id) => {
    console.log(id);
    // suppression de données depuis l'api laravel
    await axios.delete("http://127.0.0.1:8000/api/deleteuser/" + id);
    const newUserData = userData.filter((item) => {
      return item.id !== id;
    });
    setUSerData(newUserData);
  };

  return (
    <div className="container">
      <h3>Liste des utilisateurs</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>N°</th>
            <th>Nom complet</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* le map permet de faire lister tous les
             données qui se trouve sur la BD */}
          {userData.map((user, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{user.name} </td>
                <td>{user.email} </td>
                <td>
                  {/* c'est le NavLink qui me permet de l'ouvrir sur une nouvelle fenetre  */}
                  <NavLink
                    to={`/view/${user.id}`}
                    className="fa fa-eye taille-icon"
                  ></NavLink>
                  <NavLink
                    to={`/edit/${user.id}`}
                    className="fa fa-pencil-square taille-icon"
                  ></NavLink>
                  <i
                    onClick={() => handleDelete(user.id)}
                    className="fa fa-trash taille-icon"
                  ></i>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default List;
