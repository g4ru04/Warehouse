var express = require('express');
var router = express.Router();
var common = require('../service/common');
var call_api = require('../service/ht_api.js');
var sp = require('../service/sp');
// const {google} = require('googleapis');

const settings = require('../configs.js');
var ht_api_dict = require('../service/fake_ht_api.js', 'utf-8');
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/youseeseeyou', async function(req, res, next) {
	res.send(ht_api_dict);
});

router.post('/api', async function(req, res, next) {
	
	let data = await call_api.HT_Api(req.body);
	ht_api_dict[JSON.stringify(req.body)]=data;
	//if(ht_api_dict[JSON.stringify(req.body)]!=null){
	// data= ht_api_dict[JSON.stringify(req.body)];
	//}
	//console.log(ht_api_dict);
	//console.log(JSON.stringify(ht_api_dict));
	res.send(data);
});

// router.post('/upload_google_drive', async function(req, res, next) {
// 	res.send(await function(){
// 		return new Promise(function(resolve, reject){
// 			try{

// 			}catch(e){
// 				resolve({
// 					Success: false,
// 					url: ""
// 				})
// 			}
// 		})
// 	});
// });

router.get('/cust.do', function(req, res, next) {
	res.send(`<html>
		<head>
			<title>頁面讀取中</title>
			<script src="/javascripts/common.js"></script>
		</head>
		<body>
			<script>
				post('/cust.do', {c: getUrlParameter('c'),s: getUrlParameter('s')});
			</script>
		</body>
	</html>`)
});

router.post('/cust.do', function(req, res, next) {
  console.log(req.body);
  res.render('cs_customer',{
	  socket_server_ip: settings.socket_server.ip,
	  c: req.body.c,
	  s: req.body.s
  });
});

router.get('/serv.do', function(req, res, next) {
	res.render('cs_manager',{
		socket_server_ip:settings.socket_server.ip,
		express_server_ip:settings.express_server.ip 
	});
});

// router.get('/demo.do', function(req, res, next) {
//   res.send(`<html>
// 		<head>
// 			<title>Frames</title>
// 		</head>
// 		<frameset cols="*,500px,500px,500px">
// 			<frame>
// 			<frame name="upper_right" src="/cust.do?c=QzAwMDM=&s=U0UwMDAx">
// 			<frame name="upper_right" src="/cust.do?c=QzAwMDE=&s=U0UwMDAx">
// 			<frame name="lower_right" src="/serv.do">
// 		</frameset> 
// 	</html>`);
// });

// router.get('/camera', function(req, res, next) {
// 	res.send(`<input type='file' accept="image/*" capture="camera">`);
// });

// router.post('/line_send_message', function(req, res){
// 	sp.line_send_message(req, res);
// });
router.post('/upload_image', function(req, res){
	sp.upload_image(req, res);
});

router.get('/api/json/sl', common.getSl);
router.get('/api/json/dl', common.getDl);
router.get('/api/json/tl', common.getTl);

module.exports = router;
