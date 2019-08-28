import React from 'react'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'
import Waypoint from 'react-waypoint'

import Layout from '../components/layout'
import Header from '../components/Header'
import Nav from '../components/Nav'
import pic01 from '../assets/images/pic01.jpg'
import Ghost from '../assets/images/graph.svg'

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stickyNav: false,
    }
  }

  _handleWaypointEnter = () => {
    this.setState(() => ({ stickyNav: false }))
  }

  _handleWaypointLeave = () => {
    this.setState(() => ({ stickyNav: true }))
  }

  render() {
    return (
      <Layout>
        <Helmet title="Graph Ghost! 👻" />

        <Header />

        <Waypoint
          onEnter={this._handleWaypointEnter}
          onLeave={this._handleWaypointLeave}
        ></Waypoint>
        <Nav sticky={this.state.stickyNav} />

        <div id="main">
          <section id="intro" className="main">
            <div className="spotlight">
              <div className="content">
                <header className="major">
                  <h2>What is Graph Ghost?</h2>
                </header>
                <p>
                  Graph Ghost is a Google Chrome extension which allows a user
                  to select pieces of a website they want to make into a GraphQL
                  API and Graph Ghost creates the necessary code required to
                  host the API.
                </p>
                <ul className="actions">
                  <li>
                    <Link to="/generic" className="button">
                      Learn More
                    </Link>
                  </li>
                </ul>
              </div>
              <span className="image" id="imageNoBorder">
                <img src={Ghost} alt="GraphGhost" />
              </span>
            </div>
          </section>

          <section id="first" className="main special">
            <header className="major">
              <h2>Why Use Graph Ghost?</h2>
            </header>
            <ul className="features">
              <li>
                <span className="icon major style1 fa-code"></span>
                <h3>Get Code In a Matter of Minutes</h3>
                <p>
                  Get a fully working GraphQL Schema and endpoint Resolvers
                  within a matter of a few clicks - Easy Peasy!
                </p>
              </li>
              <li>
                <span className="icon major style3 fa-pencil"></span>
                <h3>Prototype Your Ideas Quicker</h3>
                <p>
                  Stop wasting time creating APIs! Cut down on technical debt
                  and make your ideas come to life.
                </p>
              </li>
              <li>
                <span className="icon major style5 fa-star"></span>
                <h3>Ditch REST APIs</h3>
                <p>
                  Rid yourself of old, hard to maintain, REST APIs and get a
                  fancy new GraphQL endpoint to work with.
                </p>
              </li>
            </ul>
            <footer className="major">
              <ul className="actions">
                <li>
                  <Link to="/generic" className="button">
                    Learn More
                  </Link>
                </li>
              </ul>
            </footer>
          </section>

          <section id="second" className="main special">
            <header className="major">
              <h2>What is GraphQL?</h2>
              <p>
                A strong and sturdy API for all of your business needs.
              </p>
              <p>
                
              </p>
            </header>
            <ul className="statistics">
              <li className="style1">
                <span className="icon fa-code-fork"></span>
                <strong>Founded</strong> By Facebook
              </li>
              <li className="style2">
                <span className="icon fa-folder-open-o"></span>
                <strong>Strongly</strong>Typed Language
              </li>
              <li className="style3">
                <span className="icon fa-signal"></span>
                <strong>1 URL</strong> For All Endpoints
              </li>
              <li className="style4">
                <span className="icon fa-laptop"></span>
                <strong>Easy</strong> To Manage
              </li>
              <li className="style5">
                <span className="icon fa-diamond"></span>
                <strong>Strong</strong> Community
              </li>
            </ul>
            <p className="content">
              Nam elementum nisl et mi a commodo porttitor. Morbi sit amet nisl
              eu arcu faucibus hendrerit vel a risus. Nam a orci mi, elementum
              ac arcu sit amet, fermentum pellentesque et purus. Integer maximus
              varius lorem, sed convallis diam accumsan sed. Etiam porttitor
              placerat sapien, sed eleifend a enim pulvinar faucibus semper quis
              ut arcu. Ut non nisl a mollis est efficitur vestibulum. Integer
              eget purus nec nulla mattis et accumsan ut magna libero. Morbi
              auctor iaculis porttitor. Sed ut magna ac risus et hendrerit
              scelerisque. Praesent eleifend lacus in lectus aliquam porta. Cras
              eu ornare dui curabitur lacinia.
            </p>
            <footer className="major">
              <ul className="actions">
                <li>
                  <Link to="/generic" className="button">
                    Learn More
                  </Link>
                </li>
              </ul>
            </footer>
          </section>

          <section id="cta" className="main special">
            <header className="major">
              <h2>Install Graph Ghost Now!</h2>
              <p>Click below to install our Google Chrome extension.</p>
            </header>
            <footer className="major">
              <ul className="actions">
                <li>
                  <Link to="/generic" className="button special">
                    Download
                  </Link>
                </li>
              </ul>
            </footer>
          </section>
        </div>
      </Layout>
    )
  }
}

export default Index
