# Strapi plugin Revalidate

The plugin comes as a solution to the problem that Webhoock does not have a solution for a manual run, and we want to allow the user to first check his content in Preview.

The user can press a button called "Revalidate" after he has looked at the Preview and is sure of the new content and manually refer to the page (Next.js) that will update the new content.

The button takes the link from Strapi's webhooks. You must add a line in the webhooks called Revalidate.
Our recommendation is to enable the trigger of the Webhooks only to perform Publish or Unpublish.
