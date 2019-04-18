const Fen2Yuan = (num) => {
	if (typeof num !== "number" || isNaN(num)) return null;
	return (num / 100).toFixed(2);
}


module.exports = {
	Fen2Yuan: Fen2Yuan,

}
