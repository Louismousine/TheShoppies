import React, { Component } from 'react';
import logo from './profile.png';
import './App.css';
import Navbar from 'react-bootstrap/Navbar'
import Dashboard from "./Components/Dashboard";
import { slide as Menu } from 'react-burger-menu';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface IProps {
}

interface IState {
  nominees: any;
  nomineesPosters: any;
}
class App extends Component<IProps, IState>{
  constructor(props: any) {
    super(props)
    this.state = {
      nominees: [],
      nomineesPosters: [],
    };
  }

  render() {
    // styles taken from the react burger menu usage guide
    var styles = {
      bmBurgerButton: {
        position: 'fixed',
        left: '85vw',
        top: '1.5vh'
      },
      bmBurgerBars: {
        background: '#373a47'
      },
      bmBurgerBarsHover: {
        background: '#a90000'
      },
      bmCrossButton: {
        height: '24px',
        width: '24px'
      },
      bmCross: {
        background: '#bdc3c7'
      },
      bmMenuWrap: {
        position: 'fixed',
        height: '100%'
      },
      bmMenu: {
        background: '#373a47',
        padding: '2.5em 1.5em 0',
        fontSize: '1.15em'
      },
      bmMorphShape: {
        fill: '#373a47'
      },
      bmItemList: {
        color: '#b8b7ad',
        padding: '0.8em'
      },
      bmItem: {
        display: 'inline-block'
      },
      bmOverlay: {
        background: 'rgba(0, 0, 0, 0.3)'
      }
    }
    return (
      <div>
        <div className="App" id="home">
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Menu right styles={styles} customBurgerIcon={<p className="nav-link">Nominees</p>}>
            <h1>Nominees</h1>
            <h5>Click on a nominee to remove it</h5><div>
            {this.state.nomineesPosters.map((movie) => (
              <h2 style={{cursor:"pointer"}} onClick={()=>this.remove(movie)}>{`${movie.name}\n`}</h2>

            )

            )}
            </div>
          </Menu>
          <Navbar bg="dark" expand={true} collapseOnSelect={false} style={{ maxHeight: "12vh", marginBottom: "5vh" }}>
            <Navbar.Brand>
              <span style={{ fontSize: "2em", paddingLeft: "2vw" }}>
                <img
                  src={logo}
                  width="15%"
                  height="15%"
                  className="d-inline-block align-middle"
                  alt="logo"
                  style={{ marginRight: "1vw" }}
                />The Shoppies
                        </span>
            </Navbar.Brand>
          </Navbar>
          <header className="App-header">
            <Dashboard handler={this.handler} nominees={this.state.nominees} parent={this} />
          </header>
        </div>
      </div>
    );
  }
  async handler(nomineesParam, nomineesPostersParam, parent) {
    console.log(nomineesPostersParam)
    if (parent.state.nominees.length <= 5) {
    await parent.setState({ nominees: nomineesParam, nomineesPosters: nomineesPostersParam });
    console.log(parent.state.nomineesPosters)
    if (parent.state.nominees.length === 5) {
      toast.success('🎊 Nominations are complete!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
      });
    }
  }

}
remove(event){
  let index = this.state.nomineesPosters.indexOf(event)
  let nominees = this.state.nominees
  let nomineesPosters = this.state.nomineesPosters
  nominees.splice(index, 1)
  nomineesPosters.splice(index,1)
  this.setState({nominees:nominees,nomineesPosters:nomineesPosters})
}
}


export default App;
