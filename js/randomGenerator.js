var genrateNumbers = function() {
    var randomNumbers = new Array(10);
    randomNumbers = _.fill(randomNumbers, 0);
    return randomNumbers.map(function(a) {
        return _.random(30, 70); 
    });
}

var updateData = function(numbers){
	var dropped = _.drop(numbers,1);
	return dropped.concat(_.random(30, 70));
}
