/** @format */

require("dotenv").config();

const express = require("express");
const app = express();

const path = require("path");
const pathToDistFolder = path.join(__dirname, "../giphy-search/dist");

const fetchData = require("./utils/fetchData");

const serveStatic = express.static(pathToDistFolder);

const serveGifs = async (req, res, next) => {
	const API_URL = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.API_KEY}&limit=25&rating=g`;
	const [data, error] = await fetchData(API_URL);
	if (error) {
		console.log(error.message);
		return res.status(404).send(error);
	}
	res.send(data);
};

app.use(serveStatic);

app.get("/api/gifs", serveGifs);

const port = 8080;
app.listen(port, () => {
	console.log(`Server is now running on http://localhost:${port}`);
});
