let fs = require('fs');
let arg = process.argv;
s = fs.readFileSync('input.txt');
sss = s.toString();
x = sss * 1;
function bin(x){
	s = x.toString(2);
	if (s[0] == '-'){
		zbit = "1";
	}else{
		zbit = "0";
	}
	x = Math.abs(x);
	s = x.toString(2);
	ind_point = 0;
	indno0 = -1;
	for (i = 0; i < s.length; i++){
		if (s[i] == '.'){
			ind_point = i;
			break;
		}
	}
	for (i = ind_point; i < s.length; i++){
		if (s[i] == '1'){
			indno0 = i;
			break;
		}
	}
	order = "";
	mantiss = "";
	flag = 0;
	if ((x == 0) && (zbit == "0")){
		order = "00000000";
		mantiss = "00000000000000000000000";
		flag = 1;
	}
	if ((x == 0) && (zbit == "1")){
		order = "00000000";
		mantiss = "00000000000000000000000";
		flag = 1;
	}
	if (x > ((2 - Math.pow(2, -23)) * Math.pow(2, 127))){
		zbit = "0";
		order = "11111111";
		mantiss = "00000000000000000000000";
		flag = 1;

	}
	if (flag == 0){
		if (Math.abs(x) >= 1){
			if (ind_point == 0){
				order = (s.length - 1 + 127).toString(2);
			}else{
				order = (ind_point - 1 + 127).toString(2);
			}
			mantiss = s.slice(1);
		}else{
			order = (ind_point - indno0 + 127).toString(2);
			mantiss = s.slice(indno0 + 1);
		}
		prov = "";
		for (i = 0; i < 8 - order.length; i++){
			prov = prov + '0';
		}
		order = prov + order;
		for (i = 0; i < mantiss.length; i++){
			if (mantiss[i] == '.'){
				mantiss = mantiss.slice(0, i) + mantiss.slice(i + 1);
				break;
			}
		}
		prov = "";
		for (i = 0; i < 23 - mantiss.length; i++){
			prov = prov + '0';
		}
		mantiss = mantiss + prov;
		mantiss = mantiss.slice(0, 23);
	}
	answer = zbit + order + mantiss;
	return answer;
}
console.log(bin(x));

