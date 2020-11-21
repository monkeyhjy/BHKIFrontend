import Vis from "vis";

function graph() {
	var nodes = new Vis.DataSet([
		{id: 1, label: 'Node 1', font: {size: 25}, color: {background: '#1bb0bf'}},
		{id: 2, label: 'Node 2', font: {size: 22}, color: {background: '#45bd59'}},
		{id: 3, label: 'Node 3', font: {size: 20, color: '#ffffff'}, color: {background: '#266ab4'}},
		{id: 4, label: 'Node 4', font: {size: 18, color: '#f8f8f8'}, color: {background: '#5a6bf5'}},
		{id: 5, label: 'Node 5', font: {size: 17, color: '#f7f7f7'}, color: {background: '#ef712a'}},
	]);

	// create an array with edges
	var edges = new Vis.DataSet([
		{from: 1, to: 2, length: 80},
		{from: 1, to: 3, length: 100},
		{from: 1, to: 4, length: 150},
		{from: 1, to: 5, length: 200}
	]);

	// create a network
	var container = document.getElementById('mynetwork');

	// provide the data in the vis format
	var data = {
		nodes: nodes,
		edges: edges
	};
	var options = {
		interaction: {
			dragNodes: false,
			dragView: false,
		},
	};

	// initialize your network!
	var network = new Vis.Network(container, data, options);
}

export {
	graph
}

