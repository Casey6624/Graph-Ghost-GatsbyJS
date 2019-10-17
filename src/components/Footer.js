import React from 'react'
import { Link } from 'gatsby'

import logo from '../assets/images/logo.svg'

const Footer = props => (
  <footer id="footer">
    <section>
      <h2>Who Am I?</h2>
      <p>
        Hi, I am Casey - A final year Computing (Web Development) student who
        loves to create new things.
      </p>
      <p>
        Graph-Ghost is my space to publish my dissertation ideas for anyone to
        utilize. Everything I publish will hold an MIT License.
      </p>
    </section>
    <section>
      <h2>Reach Out.</h2>
      <dl className="alt">
        <dt>Email</dt>
        <dd>
          <a href="mailto:info@graphghost.co.uk">info@graphghost.co.uk</a>
        </dd>
      </dl>
      <h2>Check Out.</h2>
      <dl className="alt">
        <dt>Thanks</dt>
        <dd>
          <a href="/thanks">Assets And 3rd Party Material</a>
        </dd>
      </dl>
      <ul className="icons">
        <li>
          <a
            href="https://twitter.com/CaseyKCSmith"
            className="icon fa-twitter alt"
          >
            <span className="label">Twitter</span>
          </a>
        </li>
        <li>
          <a href="https://github.com/Casey6624" className="icon fa-github alt">
            <span className="label">GitHub</span>
          </a>
        </li>
      </ul>
    </section>
  </footer>
)

export default Footer
