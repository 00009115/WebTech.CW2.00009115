# Bloggy

This web application is intended to offer a great range of blogs published by very active and curios users. Allowing the content-makers to post blogs under plenty of blog categories, Bloggy has been built to come up with a very convenient way and great experience of reading blogs in our contemporary world. 
For further instructions, refer to the points below.

## How to install and run Bloggy to your machine locally?

1. Download the source code or just clone current git repository to your local machine:
```
git clone https://github.com/00009115/WebTech.CW2.00009115
```

2. Go to the particular directory:
```
cd .../WebTech.CW2.00009115
```

3. Install all npm-dependencies of the project:
```
npm i
```

3. Start the application:
```
node app
```

## What packages / main dependencies does Bloggy require?

Bloggy has been built under Node.js environment, thus it requires a stable Node.js in your local machine. Furthermore:
- [Express.js](https://expressjs.com/) - A minimal and flexible Node.js framework
- [Pug.js](https://pugjs.org/api/getting-started.html) - A template engine to make more dynamic HTML pages

## How to access public repository?

The source code of Bloggy is hosted in GitHub. The link is below:

https://github.com/00009115/WebTech.CW2.00009115

## Is Bloggy deployed globally?

Yes. You can experinece Bloggy without setting it up to your local machine. The link is below:

https://bloggy.glitch.me/

## Are blogs data available for public use?

Yes. You can use the blogs data of Bloggy through the API url showed below:

https://bloggy.glitch.me/api/v1/blogs - globally

OR

../api/v1/blogs - locally

## How this project has been structured?

The project has been structured in a way which allows the engines to have a very good experience of compiling ;)
Namely, all similar files have been grouped such as routes, page codes (pug), other services, etc. The main entry point - app.js is located in the main directory of the project. All other npm files along with git setup files are present.

### Some comments to major operating functions are present as well.