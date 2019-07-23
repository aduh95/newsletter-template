import { h, Component } from "preact";

export default class Footer extends Component {
  render() {
    return (
      <section className="newsletter-footer" data-type="Footer">
        <p class="text-center">
          <b>We want to hear from you!</b>
          <br />
          Send your feedback and suggestions about EcoXpert™ Connect.
          <a
            href="mailto:ecoxpertpartnerprogram@schneider-electric.com"
            target="_blank"
          >
            We are listening.
          </a>
        </p>
      </section>
    );
  }
}
