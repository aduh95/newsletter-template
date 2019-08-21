# Newsletter Template Builder

NTB aims to be a WYSIWYG editor to help you build a newsletter template. Using
this tool, you can design your newsletter and export its HTML without the need
to touch the code yourself

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
