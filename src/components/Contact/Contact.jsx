import React, { Component } from 'react';
import s from './Contact.scss'
import { Col } from 'react-bootstrap'

export default class Contact extends Component {

  render() {
    return (
    	<section id="contact" className={classNames('wrap', s.contentSection, s.contact)}>
  	    <div className="contact-section">
	        <div className="container">
            <Col lg={8} lgOffset={2}>
              <div className="fade-away">
                <h2>Contact</h2>
                <div className={s.mainContent} id='mchead'>

                  <p>Good luck:</p>

                  <p>Feel free to email me to provide some feedback on my site, I'll consider any suggestions for new ideas, or to just say hello!</p>
                  <p><a href="mailto:results@alexcory.com">results@alexcory.com</a></p>
                </div>
              </div>
            </Col>
	        </div>
  	    </div>
    	</section>
    );
  }
}