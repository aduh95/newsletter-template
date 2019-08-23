# Newsletter Template Builder

NTB aims to be a WYSIWYG editor to help you build a newsletter template. Using
this tool, you can design your newsletter and export its HTML without the need
to touch the code yourself.

### Goals of the project

This project aims to generate a lightweight web app, that should be installable
and offline-first. This project is designed to be as asynchronous as possible,
this is to ensure a good user experience.

Only last version of evergreen browsers are supported, support for older
browsers is a non-goal as it clashes with goal #1 (which is to keep the app as
lightweight as possible).

### Privacy

This app is serverless, meaning everything happens in your browser and nothing
is communicated to the outside world. In fact, you don't even need an internet
connection to use the app!

### Build your own NTB

This version of NTB comes with a limited set of widget for your newsletter. If
you feel to limited by the current set, you can fork this repo to add your own
widgets.

To build the app, with yarn, use the following:

```sh
yarn install
yarn build
```

You can run the development server with:

```sh
yarn start
```

You can create new widgets in `/src/components/` folder, don't forget to also
create their `/src/edit_components/` equivalent. You might want to customize
also `/src/App.js`.

PR are always welcome if you want your components to be available on the webapp.
All components are lazy-loaded, that means adding new widgets won't affect
clients performance if they are using them.
