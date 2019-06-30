import React from 'react'
import { Link } from 'react-router-dom'

export default class Footer extends React.Component {
  render() {
    return (
      <div class="footer">
        <div class="footer-wrap">
          <div class="footer-col">
            <div class="footer-header">Company</div>
            <div class="footer-link"><a href="/why.html">Why</a></div>
          </div>
          <div class="footer-col">
            <div class="footer-header">Support</div>
            <div class="footer-link">Get Started</div>
            <div class="footer-link"><a href="/contact.html">Contact</a></div>
            <div class="footer-link"><a href="/faq-users.html">FAQs</a></div>
          </div>
          <div class="footer-col">
            <div class="footer-header">Partners</div>
            <div class="footer-link"><a href="/owners.html">Become a Partner</a></div>
            <div class="footer-link"><a href="/faq-partners.html">Partner FAQs</a></div>
          </div>
          <div class="footer-col">
            <div class="footer-header">Community</div>
            <div class="footer-link"><a href="/blog">Blog</a></div>
          </div>
          <div class="footer-col">
            <div class="footer-header">Follow Us</div>
          </div>
        </div>
      </div>
    )
  }
}
