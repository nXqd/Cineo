import React, { Component } from "react";
import injectSheet from "react-jss";
import Header from "./../../components/Header";

import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Row,
  Col,
  Navbar,
  NavbarBrand,
  Jumbotron,
  Badge
} from "reactstrap";

import YouTube from "react-youtube";

import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { react } from "@nosplatform/api-functions";
import { ipfsConnection, ipfsFileEndpoint } from "./../../utils/ipfsConnection.js";
import { ToastContainer, ToastStore } from "react-toasts";
import axios from "axios";

const { injectNOS } = react.default;

const styles = {
  "@import": "https://fonts.googleapis.com/css?family=Source+Sans+Pro",
  "@global html, body": {
    fontFamily: "Source Sans Pro",
    margin: 0,
    padding: 0,
    backgroundColor: "#ffffff"
  },
  App: {
    textAlign: "center"
  },
  intro: {
    fontSize: "large"
  },
  lineBreak: {
    width: "75%",
    borderTop: "1px solid #333333",
    margin: "32px auto"
  },
  CenterDiv: {
    textAlign: "center",
    marginBottom: "10px"
  },
  CardContainer: {
    marginLeft: "10%",
    marginRight: "10%",
    display: "flex"
  },
  CardDiv: {
    marginBottom: "15px"
  },
  Header: {
    backgroundColor: "#7BB92B"
  }
};

const movieTicketPriceInGAS = 1;
const movieTicketShopAddress = "AaWDqC1ToUyEHKix6yCuPWUPSSi3bYesiD";

// TODO: Remember to change this script hash
const scriptHash = "dd2ea6ec34b5dd5163cb7d6b951592a34e197961";
const BUYER_LIST_HASH = "9b8d4bd7-8f2d-426f-a232-e427a691df88";
const buyerListHash = { scriptHash, BUYER_LIST_HASH };

const dataIPFS = [];
/* const dataIPFS = [
  {
    id: "1",
    title: "Black Panther",
    year: "2018",
    genres: ["Action", "Adventure", "Sci-Fi"],
    ratings: [
      4,
      1,
      9,
      6,
      2,
      10,
      6,
      5,
      1,
      7,
      4,
      5,
      6,
      5,
      6,
      3,
      10,
      10,
      8,
      2,
      5,
      3,
      4,
      6,
      6,
      7,
      9,
      4,
      4,
      9
    ],
    poster: "MV5BMTg1MTY2MjYzNV5BMl5BanBnXkFtZTgwMTc4NTMwNDI@._V1_SY500_CR0,0,337,500_AL_.jpg",
    contentRating: "15",
    duration: "PT134M",
    releaseDate: "2018-02-14",
    averageRating: 0,
    originalTitle: "",
    storyline:
      "After the events of Captain America: Civil War, King T'Challa returns home to the reclusive, technologically advanced African nation of Wakanda to serve as his country's new leader. However, T'Challa soon finds that he is challenged for the throne from factions within his own country. When two foes conspire to destroy Wakanda, the hero known as Black Panther must team up with C.I.A. agent Everett K. Ross and members of the Dora Milaje, Wakandan special forces, to prevent Wakanda from being dragged into a world war.                Written by\nEditor",
    actors: ["Chadwick Boseman", "Michael B. Jordan", "Lupita Nyong'o"],
    imdbRating: 7.0,
    posterurl:
      "https://images-na.ssl-images-amazon.com/images/M/MV5BMTg1MTY2MjYzNV5BMl5BanBnXkFtZTgwMTc4NTMwNDI@._V1_SY500_CR0,0,337,500_AL_.jpg",
    videoId: "fsT5SyBLlIg"
  },
  {
    id: "2",
    title: "Grottmannen Dug",
    year: "2018",
    genres: ["Animation", "Adventure", "Comedy"],
    ratings: [
      7,
      9,
      6,
      1,
      3,
      8,
      3,
      8,
      7,
      6,
      10,
      3,
      6,
      8,
      3,
      5,
      6,
      6,
      8,
      2,
      7,
      9,
      1,
      1,
      10,
      2,
      3,
      6,
      3,
      5
    ],
    poster:
      "MV5BYWMxYWVjNzAtMTY0YS00YWQyLWExMGItMjUxODkwYzQyNzMwXkEyXkFqcGdeQXVyMjMxOTE0ODA@._V1_SY500_CR0,0,328,500_AL_.jpg",
    contentRating: "PG",
    duration: "PT89M",
    releaseDate: "2018-03-23",
    averageRating: 0,
    originalTitle: "Early Man",
    storyline:
      "Set at the dawn of time, when prehistoric creatures and woolly mammoths roamed the earth, Early Man tells the story of Dug, along with sidekick Hognob as they unite his tribe against a mighty enemy Lord Nooth and his Bronze Age City to save their home.",
    actors: ["Tom Hiddleston", "Eddie Redmayne", "Maisie Williams"],
    imdbRating: 6.3,
    posterurl:
      "https://images-na.ssl-images-amazon.com/images/M/MV5BYWMxYWVjNzAtMTY0YS00YWQyLWExMGItMjUxODkwYzQyNzMwXkEyXkFqcGdeQXVyMjMxOTE0ODA@._V1_SY500_CR0,0,328,500_AL_.jpg",
    videoId: "ZRiPQ8YNrVs"
  },
  {
    id: "3",
    title: "Aiyaary",
    year: "2018",
    genres: ["Action", "Crime", "Drama"],
    ratings: [
      1,
      2,
      8,
      10,
      3,
      8,
      8,
      6,
      1,
      8,
      4,
      1,
      9,
      5,
      7,
      8,
      9,
      8,
      10,
      10,
      8,
      3,
      1,
      2,
      5,
      7,
      9,
      9,
      10,
      7
    ],
    poster: "MV5BMjI1NTk0NTc1OV5BMl5BanBnXkFtZTgwNTMwMTE4NDM@._V1_SY500_CR0,0,281,500_AL_.jpg",
    contentRating: "",
    duration: "PT157M",
    releaseDate: "2018-02-16",
    averageRating: 0,
    originalTitle: "",
    storyline:
      "Two officers with patriotic hearts suddenly have a fallout. The mentor, Colonel Abhay Singh has complete faith in the country's system while prot\u00e9g\u00e9 Major Jai Bakshi thinks differently due to a recent stint in surveillance.",
    actors: ["Anupam Kher", "Sidharth Malhotra", "Naseeruddin Shah"],
    imdbRating: "",
    posterurl:
      "https://images-na.ssl-images-amazon.com/images/M/MV5BMjI1NTk0NTc1OV5BMl5BanBnXkFtZTgwNTMwMTE4NDM@._V1_SY500_CR0,0,281,500_AL_.jpg",
    videoId: "KcWXKmnZZVo"
  },
  {
    id: "4",
    title: "Samson",
    year: "2018",
    genres: ["Action", "Drama"],
    ratings: [
      9,
      6,
      5,
      7,
      5,
      8,
      9,
      7,
      1,
      1,
      9,
      2,
      9,
      7,
      8,
      7,
      5,
      3,
      3,
      1,
      2,
      10,
      10,
      2,
      1,
      9,
      6,
      8,
      6,
      8
    ],
    poster:
      "MV5BYThiMjg4ZDAtNjk5ZS00ZTUxLThmM2ItMGI0ZTE1NjRhNWNmXkEyXkFqcGdeQXVyNTQ3MjE4NTU@._V1_SY500_CR0,0,334,500_AL_.jpg",
    contentRating: "PG-13",
    duration: "",
    releaseDate: "2018-02-16",
    averageRating: 0,
    originalTitle: "",
    storyline:
      "A Hebrew with an unusual gift of strength must respond properly to the call of God on his life in order to lead his people out of enslavement. After his youthful ambition leads to a tragic marriage, his acts of revenge thrust him into direct conflict with the Philistine army. As his brother mounts a tribal rebellion, only Samson's relationship with a Philistine seductress and his final surrender - both to the Philistines and to God - turns imprisonment and blindness into final victory.                Written by\nPure Flix",
    actors: ["Jackson Rathbone", "Billy Zane", "Taylor James"],
    imdbRating: 5.0,
    posterurl:
      "https://images-na.ssl-images-amazon.com/images/M/MV5BYThiMjg4ZDAtNjk5ZS00ZTUxLThmM2ItMGI0ZTE1NjRhNWNmXkEyXkFqcGdeQXVyNTQ3MjE4NTU@._V1_SY500_CR0,0,334,500_AL_.jpg",
    videoId: "5TXaC3GjuJo"
  },
  {
    id: "5",
    title: "Loveless",
    year: "2017",
    genres: ["Drama"],
    ratings: [
      7,
      5,
      7,
      6,
      10,
      8,
      8,
      7,
      3,
      7,
      3,
      4,
      5,
      10,
      8,
      10,
      1,
      7,
      2,
      10,
      10,
      3,
      5,
      2,
      9,
      7,
      7,
      3,
      5,
      1
    ],
    poster: "MV5BMzU3ODQ3MzQ5Nl5BMl5BanBnXkFtZTgwMDQwMDIzNDM@._V1_SY500_CR0,0,338,500_AL_.jpg",
    contentRating: "R",
    duration: "PT127M",
    releaseDate: "2017-06-01",
    averageRating: 0,
    originalTitle: "Nelyubov",
    storyline:
      "Still living under the same roof, the Moscow couple of Boris and Zhenya is in the terrible final stages of a bitter divorce. Under those circumstances, as both have already found new partners, the insults pour down like rain in this toxic familial battle zone, always pivoting around the irresolvable and urgent matter of Alyosha's custody, their 12-year-old only son. Unheard, unloved, and above all, unwanted, the introverted and unhappy boy feels that he is an intolerable burden, however, what his parents don't know is that he can hear every single word. As a result, when Boris and Zhenya finally realize that Alyosha has been missing for nearly two days, it is already too late. But is this a simple case of a runaway teenager?                Written by\nNick Riganas",
    actors: ["Maryana Spivak", "Aleksey Rozin", "Matvey Novikov"],
    imdbRating: 7.8,
    posterurl:
      "https://images-na.ssl-images-amazon.com/images/M/MV5BMzU3ODQ3MzQ5Nl5BMl5BanBnXkFtZTgwMDQwMDIzNDM@._V1_SY500_CR0,0,338,500_AL_.jpg",
    videoId: "mLegoO4NdD8"
  }
]; */

const fixedPrice = 0.2;

class MovieCard extends Component {
  render() {
    const { movie } = this.props;

    return (
      <Col key={movie.id} sm="3">
        <Card key={movie.id} onClick={() => this.props.app.setState({ currentMovie: movie })}>
          <CardImg
            top
            width="200px"
            src={movie.posterurl}
            alt="Poster"
            href={`/movie/${movie.id}`}
          />
          <CardBody style={{ height: "120px" }}>
            <CardTitle>
              <h3>{movie.title}</h3>
            </CardTitle>
            <CardSubtitle />
            <center>
              <Button
                color="success"
                onClick={() => this.props.app.setState({ currentMovie: movie })}
              >
                View Details
              </Button>
            </center>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      movieMap: {},
      currentMovie: {}
    };
  }

  componentDidMount() {
    console.log("App componentDidMount");

    const dataHash = "QmZJ3NJeHJrnP8Eu97z17roMLQS8ocogbXMgg72GEEZvVJ";
    // const dataHash = this.props.dataHash;

    const self = this;
    ipfsConnection.get(dataHash, (err, response) => {
      const movies = JSON.parse(response[0].content.toString("utf8"));
      console.log(`movies in didMount ${movies}`);

      const moMap = movies.reduce((map, movie) => {
        map[movie.id] = movie;
        return map;
      }, {});

      self.setState({ movies, movieMap: moMap, currentMovie: movies[0] });
      console.log(`movieMap in Didmount ${self.state.movieMap}`);
    });
  }

  currentUserBalance(nos) {
    const NEO = "c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b";

    console.log("Get user balance");
    nos
      .getAddress()
      .then(address => {
        nos
          .getBalance({ asset: NEO })
          .then(balance => {
            console.log(`Balance ${balance}`);
          })
          .catch(err => {
            console.log(`Error while getting user's balance ${err}`);
          });
        console.log(`User address${address}`);
      })
      .catch(err => {
        console.log("Cannot get user Address");
      });
  }

  ipfsUploadObject() {
    const buffer = new Buffer(JSON.stringify(dataIPFS));
    ipfsConnection
      .add(buffer)
      .then(response => {
        const k = response[0].hash;
        console.log(`Uploaded key ${k}`);

        // const args = [];
        // args.push('' + k);
        // this.props.nos.invoke({scriptHash, operation, args})
        //     		.then(txid => {
        //           console.log(txid);
        //           ToastStore.success('Product updated');
        //         }).catch(err => console.log(`Error: ${err.message}`));
      })
      .catch(err => {
        console.log("failed", err);
      });
  }

  testCalling() {
    const receiver = "Ab3r25fyfSc2erW4TjeZmNAkMMJx3pJPJv";
    const NEO = "c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b";
    this.props.nos
      .send({ asset: NEO, amount: 1, receiver })
      .then(() => {
        console.log("send successfully");
      })
      .catch(() => {
        console.log("failed");
      });
  }

  getBalance() {
    const NEO = "c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b";

    // Example without the optional parameter
    this.props.nos
      .getBalance({ asset: NEO })
      .then(balance => alert(`Balance: ${balance}`))
      .catch(err => alert(`Error: ${err.message}`));
  }

  // Store buyer list to ipfs and update NEO storage
  storeBuyers(purchasers, nos, successFn) {
    ipfsConnection.add(new Buffer(JSON.stringify(purchasers)), (err, res) => {
      if (err || !res) {
        return console.error("Error while getting data from ipfs", err, res);
      }

      const newDataHash = res[0].hash;
      const args = [newDataHash];

        nos
            .invoke({ scriptHash, operation: 'UpdateBuyerList', args })
            .then(txid => {
                successFn();
            })
            .catch(err => console.log(`Error: ${err.message}`));
    });
  }

  buyTicket(nos) {
    const self = this;
    const GAS = "602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7";

    nos
      .getAddress()
      .then(currentUserNEOAddress => {
        nos
          .getBalance({ asset: GAS })
          .then(balance => {
            console.log(`Balance ${balance}`);
            if (balance >= movieTicketPriceInGAS) {
              this.props.nos
                .send({
                  asset: GAS,
                  amount: movieTicketPriceInGAS,
                  receiver: movieTicketShopAddress
                })
                .then(() => {
                  // store purchaser's data
                  nos
                    .getStorage(buyerListHash)
                    .then(async dataHash => {
                      ipfsConnection.get(dataHash, (err, res) => {
                        if (err || !res)
                          return console.error("Error while getting data from ipfs", err, res);

                        let buyers = JSON.parse(res[0].content.toString("utf8"));
                        buyers.push({
                          address: currentUserNEOAddress,
                          movieId: self.state.currentMovie.id
                        });

                        // update smart contract storage
                          this.storeBuyers(buyers, nos, function() {
                            alert("Thanks for booking the movie ticket!")
                          })
                      });
                    })
                    .catch(err => {
                      alert(
                        "There is something wrong with the server. We will get back to you as soon as possible."
                      );
                      console.log(`Cannot get storage from NEO, error:${err}`);
                    });
                })
                .catch(() => {
                  ToastStore.error("Purchase Failed");
                  // self.history.push('/');
                });
            } else {
              alert(`You don't have enough NEO to purchase this ticket.`);
            }
          })
          .catch(err => {
            console.log(`Error while getting user's balance ${err}`);
          });
        console.log(`User address${currentUserNEOAddress}`);
      })
      .catch(err => {
        console.log("Cannot get user Address");
      });
  }

  render() {
    console.log(`render HomePage  ${this.props.nos.exists}`);
    if (!this.props.nos.exists) {
      return null;
    }

    const movies = this.state.movies;

    console.log(`movies in render ${movies}`);
    if (movies === undefined || movies.length === 0) return null;

    console.log("render after movies checking");

    const opts = {
      height: "390",
      width: "640",
      playerVars: {
        autoplay: 1
      }
    };

    return (
      <React.Fragment>
        <div>
          <div>
            <Navbar color="dark" dark expand="md">
              <NavbarBrand href="/">Cineo: Buy movie tickets with NEO</NavbarBrand>
            </Navbar>
          </div>

          <center>
            <YouTube
              videoId={this.state.currentMovie.videoId}
              opts={opts}
              onReady={this._onReady}
            />

            <Jumbotron>
              <h1 className="display-3">{this.state.currentMovie.title}</h1>
              <p className="lead">{this.state.currentMovie.storyline}</p>
              <hr className="my-2" />
              <p>
                Actors :
                {this.state.currentMovie.actors.map(actor => `${actor} | `)}
              </p>
              <p>
                <Badge color="warning">IMDB {this.state.currentMovie.imdbRating}</Badge> &nbsp;
                <Badge color="warning">YEAR {this.state.currentMovie.year}</Badge> &nbsp;
              </p>
              <p>
                <Badge color="primary">PRICE {movieTicketPriceInGAS} GAS</Badge>
              </p>
              <p className="lead">
                <Button color="success" onClick={() => this.buyTicket(this.props.nos)}>
                  Buy Ticket
                </Button>
              </p>
            </Jumbotron>
          </center>

          <div>
            <Row>
              {movies.map(movie => {
                console.log(`movie in loop ${movie}`);
                if (movie) {
                  return <MovieCard movie={movie} key={movie.id + movie.title} app={this} />;
                }
              })}
            </Row>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default injectNOS(injectSheet(styles)(App));
