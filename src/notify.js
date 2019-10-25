import "./notify.css";
const NOTIFICATION_ELEMENT_NAME = "inline-notification";
class NotificationElement extends HTMLElement {
  constructor() {
    super();

    this.addEventListener("click", Element.prototype.remove);
  }

  connectedCallback() {
    if (this.isConnected) {
      setTimeout(() => {
        this.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: 3000,
        }).onfinish = () => this.remove();
      }, 5000);
    }
  }
}

customElements.define(NOTIFICATION_ELEMENT_NAME, NotificationElement);

export default function notify(message) {
  const notification = document.createElement(NOTIFICATION_ELEMENT_NAME);

  notification.setAttribute("title", message);
  notification.setAttribute("role", "alert");

  document.body.append(notification);
}
