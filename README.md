# Strapi plugin Revalidate Button

The plugin comes as a solution to the problem that Webhook does not have a solution for a manual run, and we want to allow the user to first check his content in Preview.

The user can press a button called "Revalidate" after he has looked at the Preview and he is sure of the new content and manually refer to the page (Next.js) that will update the new content.

The button takes the link from Strapi's webhooks. You must add a line in the webhooks called Revalidate.
Our recommendation is to enable the trigger of the Webhooks only to perform Publish or Unpublish.

## Installation

```
yarn add strapi-plugin-revalidate-button@latest
```

### Enabled the Plugin in plugins.js file

```js
// ./config/plugins.js
'use strict';

module.exports = {
  'revalidate-button': {
    enabled: true,
  },
};
```

#### Add row on Webhoock config

<img style="width: 960px; height: auto;" src="public/image1.png" alt="Screenshot for list view in Strapi revalidate button plugin" />

#### Go to edit view

<img style="width: 960px; height: auto;" src="public/image.png" alt="Screenshot for list view in Strapi revalidate button plugin" />
