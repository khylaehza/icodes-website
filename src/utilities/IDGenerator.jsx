function IdGenerator() {
	var minm = 100000;
	var maxm = 999999;
	let id = Math.floor(Math.random() * (maxm - minm + 1)) + minm;
	return id;
}

export default IdGenerator;
