import "./notify.css";

export default function notify(message) {
  const notif = document.createElement("div");
  const removeNotif = () => notif.remove();

  notif.className = "notification";
  notif.appendChild(document.createTextNode(message));

  document.body.append(notif);

  notif.addEventListener("click", removeNotif);
  setTimeout(() => {
    notif.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: 3000,
    }).onfinish = removeNotif;
  }, 5000);
}
