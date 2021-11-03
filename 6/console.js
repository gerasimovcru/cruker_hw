let loger = console.log.bind(console);

console.log = function(info){
	let date = new Date();
	
	loger(`${date} | ${info}`);
}


console.log(true);
