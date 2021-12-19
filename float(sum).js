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

let fs = require('fs');
let arg = process.argv;
s = fs.readFileSync('sum.txt');
sss = s.toString();
for (i = 0; i < sss.length; i++){
	if (sss[i] == '+'){
		a = sss.slice(0, i) * 1;
		a2 = sss.slice(0, i) * 1;
		b = sss.slice(i + 1) * 1;
		b2 = sss.slice(i + 1) * 1;
		break;
	}
	if ((sss[i] == '-') && (i != 0)){
		a = sss.slice(0, i) * 1;
		a2 = sss.slice(0, i) * 1;
		b = sss.slice(i) * 1;
		b2 = sss.slice(i) * 1;
	}
}


a = Math.abs(a);
b = Math.abs(b);
if (a > b){
	k = a;
	a = b;
	b = k;
}
zna = "";
znb = "";
if (a == Math.abs(a2)){
	if (a2.toString()[0] == '-'){
		zna = "-";
	}else{
		zna = "+";
	}
	if (b2.toString()[0] == '-'){
		znb = "-";
	}else{
		znb = "+";
	}
}
else{
	if (b2.toString()[0] == '-'){
		zna = "-";
	}else{
		zna = "+";
	}
	if (a2.toString()[0] == '-'){
		znb = "-";
	}else{
		znb = "+";
	}
}



bina = bin(a.toString());
binb = bin(b.toString());
zbit_s = "";
if (a2 + b2 >= 0){
	zbit_s = "0";
}else{
	zbit_s = "1";
}
order_s = "";
mantiss_s = "";
order_a = bina.slice(1, 9);
order_b = binb.slice(1, 9);

//console.log(order_a, order_b);


mantiss_a = '1' + bina.slice(9);
mantiss_b = '1' + binb.slice(9);



r = parseInt(order_b, 2) - parseInt(order_a, 2);
order_a = order_b;
order_s = order_a;
prov = "";
for (i = 0; i < r; i++){
	prov = prov + '0';
}
mantiss_a = prov + mantiss_a;
mantiss_a = mantiss_a.slice(0, 24);

//console.log(mantiss_a, mantiss_b);



if (((zna == "+") && (znb == "-")) || ((zna == "-") && (znb == "+"))){
	mantiss_s = parseInt(mantiss_b, 2) - parseInt(mantiss_a, 2);
}
if (((zna == "+") && (znb == "+")) || ((zna == "-") && (znb == "-"))){
	mantiss_s = parseInt(mantiss_a, 2) + parseInt(mantiss_b, 2);
}

mantiss_s = mantiss_s.toString(2);

//console.log(mantiss_s);

flag = 0;

if (mantiss_s.length == 1){
	zbit_s = "0";
	order_s = "00000000";
	mantiss_s = "00000000000000000000000";
	flag = 1;
}
if (mantiss_s.length == 24){
	order_s = order_a;
	mantiss_s = mantiss_s.slice(1);
	flag = 1;
}
if (mantiss_s.length == 25){
	order_s = (parseInt(order_a, 2) + 1).toString(2);
	mantiss_s = mantiss_s.slice(1, 24);
	flag = 1;
}
if ((mantiss_s.length < 24) && (mantiss_s.length > 1) && (flag == 0)){
	r = 24 - mantiss_s.length;
	order_s = (parseInt(order_a, 2) - r).toString(2);
	prov = "";
	for (i = 0; i < 8 - order_s.length; i++){
		prov = prov + '0';
	}
	order_s = prov + order_s;
	mantiss_s = mantiss_s.slice(1);
	while (mantiss_s.length < 23){
		mantiss_s = mantiss_s + '0';
	}
}



console.log(zbit_s, order_s, mantiss_s);
j = a2 + b2;
console.log(bin(j)[0], bin(j).slice(1, 9), bin(j).slice(9));
