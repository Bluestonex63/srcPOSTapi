/*import { createRequire } from "https://deno.land/std/node/module.ts";

const require = createRequire(import.meta.url);

const fetch = require('node-fetch');
const express = require('express');
const cors = require('cors');
const app = express()
const  bodyParser = require('body-parser')

let c = async () => {
	app.use( bodyParser.json() );       // to support JSON-encoded bodies
	app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	  extended: true
	})); 
	app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type, X-API-key');
    next();
	});
	app.post('/', (req, res) => {
		let headers = req.headers
		if (req.headers["x-api-key"] == undefined) {
			res.status(400).json({status: 400, message: "Please input an api key"})
		} else if (req.body.length == 0) {
			res.status(400).json({status: 400, message: "Please input a body"})
		} else {
			fetch("https://www.speedrun.com/api/v1/runs", {
				method: "POST",
				headers: {
					"X-API-key": req.headers["x-api-key"]
				},
				json: req.body
			}).then(x => x.json()).then(r => {
				if (!r.ok) {
					res.status(r.status).json({status: r.status, message: r.message})
				} else {
					res.json(r)
				}
			})
		}
	});
	app.listen(8080, () => {
		console.log('server is listening on port 8080');
	});
}
c()*/

import { Application, Router } from "https://deno.land/x/oak/mod.ts";
export { Router, Application };

import router from "./routes.ts";

const env = Deno.env.toObject()
const PORT = env.PORT || 3000;
const HOST = env.HOST || 'localhost';


import { Router } from "./deps.ts";

const app = new Router();

app.get("/api/v1/", (context) => {
  context.response.body = {
    success: true,
    msg: "Hello World",
  };
});

app.use(errorHandler);
app.use(router.routes());
app.use(router.allowedMethods());
app.use(_404);

console.log(`Server running on port ${PORT}`);

app.listen(`${HOST}:${PORT}`);
export default router;
