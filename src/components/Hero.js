import { h, Component } from "preact";

export default class Hero extends Component {
  render() {
    return (
      <section className="newsletter-hero" data-type="Hero">
        <h1 data-key="title">{this.props.title || "[[Title]]"}</h1>

        <h6 data-key="date">{this.props.date || "[[Date]]"}</h6>
        <svg
          height="38.734"
          data-ignore
          width="103.855"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            class="cls-3"
            d="M10.395 31.114h-6.91v-3.33h5c1.1 0 1.59-.49 1.59-1.41v-.1c0-.85-.47-1.34-1.59-1.34h-5v-3h6.8c1.08 0 1.59-.49 1.59-1.46v-.12c0-.92-.51-1.46-1.59-1.46h-8.47a1.72 1.72 0 0 0-1.8 1.94v11.39a1.69 1.69 0 0 0 1.8 1.91h8.58c1.08 0 1.6-.54 1.6-1.51v-.14c0-.9-.52-1.37-1.6-1.37m8.61-6.1a3.53 3.53 0 0 1 2.34.9c.26.1 1.76 0 1.76-1.25s-1.17-2.31-4.24-2.31a6.03 6.03 0 1 0 0 12.06c3.09 0 4.24-.92 4.24-2.32s-1.5-1.34-1.76-1.25a3.48 3.48 0 0 1-2.34.9 3.37 3.37 0 0 1 0-6.73m11.34 6.81a3.44 3.44 0 1 1 3.19-3.4 3.22 3.22 0 0 1-3.19 3.4m0-9.47a5.81 5.81 0 0 0-6.14 6 5.75 5.75 0 0 0 6.09 6 5.75 5.75 0 0 0 6.12-6 5.78 5.78 0 0 0-6.07-6.07m28.86 9.51a2.73 2.73 0 0 1-2.86-2.78v-2.12a3 3 0 0 1 2.89-1.88c1.73 0 2.93 1.37 2.93 3.4s-1.17 3.37-3 3.37m.84-9.44a4.12 4.12 0 0 0-3.66 2.16c-.18-1.6-1.14-2-2-2a1.83 1.83 0 0 0-1.24.38v14.25c0 1.23.61 1.6 1.49 1.6h.36c.84 0 1.45-.4 1.45-1.6v-4.79a4.09 4.09 0 0 0 3.66 2.1c3.11 0 5.28-2.43 5.28-6.07s-2.21-6-5.31-6m9.58 4.97a2.94 2.94 0 0 1 2.93-2.67 2.56 2.56 0 0 1 2.67 2.67zm3-5a5.86 5.86 0 0 0-6 6.12c0 3.63 2.46 6 6.19 6 3.19 0 5-1.39 5-2.62 0-1.23-1.57-1.56-1.6-1.51a3.46 3.46 0 0 1-3.23 1.7 3.1 3.1 0 0 1-3.31-2.74h7.88c.61 0 .77-.33.8-.92v-.26a5.49 5.49 0 0 0-5.7-5.76m13.78 0c-1.71 0-2.58 1.33-3 3.12v-.31c0-2.15-1.08-2.67-2.07-2.67a1.85 1.85 0 0 0-1.24.38v9.77c0 1.23.61 1.59 1.5 1.59h.36c.84 0 1.45-.38 1.45-1.59v-4.05c0-2.41 2-3.29 4.34-3.33.77-1.44.18-2.91-1.34-2.91m10.64 8.66a1.77 1.77 0 0 1-1.47.78c-.9 0-1.27-.57-1.27-1.7v-4.88h2c.95 0 1.38-.43 1.38-1.23v-.19c0-.78-.4-1.18-1.34-1.18h-2v-1.46c0-1.23-.58-1.61-1.48-1.61h-.28c-.93 0-1.5.52-1.5 1.61v1.46h-.56c-.94 0-1.39.43-1.39 1.23v.17c0 .76.45 1.16 1.39 1.16h.56v5.29c0 2.59 1.17 3.94 3.71 3.94 1.87 0 3-1 3-2.1a1.3 1.3 0 0 0-.8-1.3"
            fill="#46b751"
          />
          <path
            class="cls-3"
            d="M54.905 19.314a11.08 11.08 0 0 0 4.37-.09 8.58 8.58 0 0 0 5-3.51c1.74-2.45 2.6-5.55 3.5-8.07a16.33 16.33 0 0 1 1.41-3.15 4.14 4.14 0 0 1 .79-.92 2.17 2.17 0 0 1 .87-.41.81.81 0 0 0 .64-.82.79.79 0 0 0-.69-.76l-1.81-.27c-1.61-.25-3.13-.51-4.56-.74a30 30 0 0 0-8.57-.45 12.23 12.23 0 0 0-7.23 3.7 8.29 8.29 0 0 0-2.19 4.48 7 7 0 0 0 .66 4.36 7.14 7.14 0 0 0 4 3.28l.3.08a1.57 1.57 0 0 0 .83-.11 2.23 2.23 0 0 0 .9-.93 17.25 17.25 0 0 0 .94-2.31 11.92 11.92 0 0 1 2.08-3.83 5.39 5.39 0 0 1 1.77-1.33 6.46 6.46 0 0 1 2.68-.5.8.8 0 1 0 0-1.6 7.41 7.41 0 0 0-4.87 1.6 12 12 0 0 0-3.17 5.2 16.37 16.37 0 0 1-.76 1.9.88.88 0 0 1-.18.26 5.44 5.44 0 0 1-3.09-2.5 5.28 5.28 0 0 1-.5-3.35 6.86 6.86 0 0 1 1.74-3.6 10.69 10.69 0 0 1 6.33-3.24 28.28 28.28 0 0 1 8.09.45c1.33.2 2.73.45 4.25.69l-.09.1a14.76 14.76 0 0 0-2.2 4.52c-.91 2.63-1.82 5.56-3.39 7.6a6.93 6.93 0 0 1-2.93 2.29 8.73 8.73 0 0 1-4.67.36 17.74 17.74 0 0 1-3.32-.86.79.79 0 0 0-1 .39 11.59 11.59 0 0 1-1.2 1.52 1.52 1.52 0 0 0-.21 0 2.17 2.17 0 0 0-1.78 1.27l-3 4.56-2.95-4.56a2.08 2.08 0 0 0-1.85-1.22c-1.25 0-2.33 1.13-2.19 1.36l4.58 6.35-4.67 6.47c-.14.24.89 1.35 2.06 1.35a2.1 2.1 0 0 0 1.83-1.23l3-4.63 3 4.61a2.16 2.16 0 0 0 1.89 1.18c1.24 0 2.27-1.11 2.16-1.35l-4.61-6.39 4.65-6.42c0-.09-.07-.28-.27-.5a8.59 8.59 0 0 0 .71-1 19.45 19.45 0 0 0 2.92.7m44.96 2.72v-2.51h-.9c-.07 0-.11 0-.11-.09 0-.06 0-.09.11-.09h2a.08.08 0 0 1 .09.09.08.08 0 0 1-.09.09h-.9v2.51a.09.09 0 0 1-.09.1c-.06 0-.09 0-.09-.1m1.62 0v-2.58c0-.08.05-.13.15-.13.11 0 .14 0 .19.15l.83 1.67.84-1.67c0-.11.08-.15.19-.15a.13.13 0 0 1 .15.13v2.58c0 .07 0 .1-.09.1-.06 0-.09 0-.09-.1v-2.47l-.84 1.64a.17.17 0 0 1-.18.13c-.11 0-.14 0-.18-.13l-.84-1.64v2.47c0 .07 0 .1-.08.1-.06 0-.08 0-.08-.1"
            fill="#46b751"
          />
        </svg>
      </section>
    );
  }
}
