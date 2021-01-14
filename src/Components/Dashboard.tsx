import React, { Component } from "react";
import SearchBar from "material-ui-search-bar";
import { MdAdd, MdRemove } from "react-icons/md";
import "../App.css";
const axios = require("axios");

interface IProps {
    nominees:any,
    handler:any,
    parent:any
}

interface IState {
  search: string;
  movies: any;
  nominees: any;
  nomineesPosters: any;
  moviesFromImdb: any;
}
class Dashboard extends Component<IProps, IState> {

  constructor(props: any) {
    super(props);
    this.state = {
      search: "",
      movies: [],
      nominees: this.props.nominees,
      nomineesPosters: [],
      moviesFromImdb: [],
    };
  }

  render() {
    console.log(this.state.nomineesPosters)
    return (
      <div style={{ width: "50%", alignContent: "center",fontSize:"0.95em" }}>
            Search for movies to nominate for a Shoppie! You may nominate up to
            5 movies.
            <SearchBar
              placeholder="Search for a movie..."
              onChange={(newValue) => this.setState({ search: newValue })}
              onRequestSearch={() => this.onSubmitSearch()}
              style={{
                marginTop: "1vh",
                maxWidth: "100%",
                maxHeight: "100%",
                marginBottom: "5vh",
              }}
            />
            <div id="style-8"
              style={{
                overflowY: "auto",
                maxHeight: "65vh",
                paddingLeft: "2vw",
                paddingRight: "2vw",
              }}
            >
              {this.state.movies.length>0 ? (this.state.movies.map((movie) => (
                <MovieCard
                  movieID={movie}
                  added={this.state.nominees.includes(movie)}
                  handler={this.handler}
                  parent={this}
                />
              ))): (<p>No results</p>)}
            </div>
      </div>
    );
  }
  async onSubmitSearch() {
      this.setState({movies:[]})
    await fetch(
      `http://www.omdbapi.com/?s=${this.state.search}&page=1&type=movie&apikey=961eddf`,
      {
        method: "get",
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data: any) => {
        const movieList: any[] = [];
        data.Search.forEach(async (movie) => {
          movieList.push(movie.imdbID);
        });
        this.setState({ movies: movieList });
      })
      .catch(function (error) {});
  }

  handler(movie, isAdding, poster, name,parent) {
    if (isAdding) {
      if(parent.state.nominees.length>4) return false
      let nominees = parent.state.nominees.concat(movie);
      let nominees2 = parent.state.nomineesPosters.concat({
        poster: poster,
        name: name,
      });
      parent.setState({ nominees: nominees, nomineesPosters: nominees2 });
      parent.props.handler(nominees, nominees2,parent.props.parent)
    } else {
      const index = parent.state.nominees.indexOf(movie);
      if (index > -1) {
        let nominees = parent.state.nominees
        nominees.splice(index, 1);
        let nominees2 = parent.state.nomineesPosters
        nominees2.splice(index, 1);
        parent.setState({ nominees: nominees, nomineesPosters: nominees2 });
        parent.props.handler(nominees, nominees2,parent.props.parent)
      }
    }
    
    return true
  }
}

interface Props {
  movieID: any;
  added: boolean;
  handler: any;
  parent:any;
}

class MovieCard extends React.Component<Props> {
  state = {
    movieData: {
      Title: "",
      Released: "",
      Plot: "",
      Poster: "",
      imdbRating: "",
    },
    added: false,
  };

  componentDidMount() {
    axios
      .get(
        `https://www.omdbapi.com/?apikey=961eddf&i=${this.props.movieID}&plot=full`
      )
      .then((res) => res.data)
      .then((res) => {
        this.setState({ movieData: res, added: this.props.added });
      });
  }

  handlerClick() {
    let boo = this.props.handler(
      this.props.movieID,
      !this.state.added,
      this.state.movieData.Poster,
      this.state.movieData.Title,
      this.props.parent
    );
    if(boo)
    this.setState({ added: !this.state.added });
  }

  render() {
    const { Title, Released, Plot, Poster, imdbRating } = this.state.movieData;

    if (!Poster || Poster === "N/A") {
      return null;
    }

    return (
      <div className="movie-card-container">
        <div className="image-container">
          <div
            className="bg-image"
            style={{ backgroundImage: `url(${Poster})` }}
          />
        </div>
        <div className="movie-info">
          <h2>Movie Details</h2>
          <div>
            <h1>{Title}</h1>
            <small>Released Date: {Released}</small>
          </div>
          <h4>Rating: {imdbRating} / 10</h4>
          <p>{Plot && Plot.substr(0, 350)}</p>
          <div className="tags-container">
            <button onClick={()=>this.handlerClick()}>
              {!this.state.added ? <MdAdd /> : <MdRemove />}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
