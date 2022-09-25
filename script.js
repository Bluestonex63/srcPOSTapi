import {
	json,
	opine,
	urlencoded,
  } from "https://deno.land/x/opine@2.3.3/mod.ts";
const app = opine();
app.use(json()); 
let c = async () => {
	app.use((req, res, next) => {
    	res.append('Access-Control-Allow-Origin', ['*']);
    	res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    	res.append('Access-Control-Allow-Headers', 'X-API-key');
    	next();
	});
	app.post('/srcPOSTruns', (req, res) => {
		let headers = req.headers
		if (req.body != null) {
			console.log(headers.get("x-api-key"), req.body); 
		}
		if (headers.get("x-api-key") == undefined) {
			res.status = 400
			res.json({status: 400, message: "Please submit an API key"})
		} else if (req.body.length == 0) {
			res.status = 400
			res.json({status: 400, message: "Please submit a body with the desired run"})
		} else {
			fetch("https://www.speedrun.com/api/v1/runs", {
				method: "POST",
				headers: {
					"X-API-key": headers.get("x-api-key")
				},
				json: req.body
			}).then(x => x.json()).then(r => {
				if (!r.ok) {
					res.status = r.status
					res.json({status: r.status, message: r.message})
				} else {
					res.json({json: r})
				}
			})
		}
	});
}
c()

app.listen(3000);
console.log("Running!")