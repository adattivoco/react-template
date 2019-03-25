# Adattivo UI Project

## Installation

This project is a React single page application built using Webpack. To use this project, your computer needs:

- [NodeJS](https://nodejs.org/en/) (v10.15 or greater)
- [Git](https://git-scm.com/)

### Installing Modules

Then open the folder in your command line, and install the needed dependencies:

```bash
npm install
```

## Code layout
The code layout is pretty straight forward. All the src is under `src` and that includes the Javascript, Sass, HTML template, and images. The `settings` directory contains settings for the environments that is built into the Javascript before deploy. You'll also see the i18n file here for placing internationalized text when that is requirement is necessary.
## Running development server
To run webpack dev server, run `npm run dev` to run the project in development mode. Your dev site will be running on:

```
http://localhost:8080/
```

NOTE: The website portion of this site, including the homepage, contact, etc are built in a different project and run there. You won't see them here. You'll only be able to debug the dynamic portion of the site including explore, users, admins, and gyms.

## Building files
If you want to see the builds, they are located in the /dist directory after build.
- Dev Build: Run `npm run dev-build` command. Shouldn't be much need to do this, but you can see what you get with it.
- QA Build: Run the `npm run qa-build` command. This is done before deploying to QA. We do a similar build to dev, but it does break out the css to its own file and adds sourcemaps for debugging.
- Prod Build: Run the `npm run build` command. It creates the compressed assets in /dist directory. This is what is shipped to prod.


## Deployments
- To deploy to QA, run the `deploy-qa.sh` script.
- To deploy to Production, run the `deploy-prod.sh` script.

NOTE: For deploys you'll need the awscli installed. It is easily installed via Homebrew. You'll also need to add your AWS credentials to correct s3 buckets via the `aws configure` command to add access keys.
