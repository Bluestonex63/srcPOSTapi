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
c()