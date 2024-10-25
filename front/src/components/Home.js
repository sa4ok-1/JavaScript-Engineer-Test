/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./style/Home-style.css";
import { ReactComponent as ViewIcon } from "../icons/browse-svgrepo-com.svg";
import { ReactComponent as EditIcon } from "../icons/pen-svgrepo-com.svg";
import { ReactComponent as DeleteIcon } from "../icons/trash-svgrepo-com.svg";
import { ReactComponent as PlusIcon } from "../icons/plus-svgrepo-com.svg";
import MainIcon from "../icons/Marvel.jpg";

const Home = () => {
  const [superheroes, setSuperheroes] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchSuperheroes = async () => {
      try {
        const response = await axios.get(`/api/superheroes?page=${page}`);
        setSuperheroes(response.data);
      } catch (error) {
        console.error("Error fetching superheroes:", error);
      }
    };

    fetchSuperheroes();
  }, [page]);

  const deleteHero = async (id) => {
    try {
      await axios.delete(`/api/superheroes/${id}`);
      setSuperheroes(superheroes.filter((hero) => hero._id !== id));
    } catch (error) {
      console.error("Error deleting superhero:", error);
    }
  };

  return (
    <div>
      {/* Uncomment this if you want to display the header image */}
      {/* <div className="header-image">
        <img src={MainIcon} alt="Main Icon" />
      </div> */}
      <div className="header-content">
        <h1>MARVEL Team</h1>
        <div className="superhero-container">
          <Link to="/create" className="btn-create-link">
            <button className="Create-btn">Create New Superhero</button>
          </Link>

          <ul>
            {superheroes.map((hero) => (
              <li key={hero._id}>
                <img src={hero.images[0]} alt={hero.nickname} width="100" />
                <Link to={`/superhero/${hero._id}`}>
                  <button
                    className="view-btn"
                    aria-label={`View ${hero.nickname}`}
                  >
                    <ViewIcon style={{ width: "24px", height: "24px" }} />
                  </button>
                </Link>
                <Link to={`/edit/${hero._id}`}>
                  <button
                    className="view-btn"
                    aria-label={`Edit ${hero.nickname}`}
                  >
                    <EditIcon style={{ width: "24px", height: "24px" }} />
                  </button>
                </Link>
                <button
                  className="view-btn"
                  onClick={() => deleteHero(hero._id)}
                >
                  <DeleteIcon style={{ width: "24px", height: "24px" }} />
                </button>
              </li>
            ))}
          </ul>

          {/* Кнопки пагінації під списком */}
          <div className="pagination-container">
            <button onClick={() => setPage(page - 1)} disabled={page === 0}>
              Previous
            </button>
            <button onClick={() => setPage(page + 1)}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
