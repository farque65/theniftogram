export function addressShorten(address) {
	if (address !== null) {
	  const front = address.slice(0, 5);
	  const end = address.slice(-3, -1);
	  return front + '...'+ end;
	}
	return address;
}

export function decToHex(num) { 
	var hex = Number(num).toString(16);
	if (hex.length < 2) {
			hex = "0" + hex;
	}
	return hex;
};
