		var ok=0;
		var username;
		var jiekou=["http://10.161.5.8:5000","http://10.117.12.68:5000","http://10.151.17.97:5000","http://10.161.41.78:5000","http://10.161.14.216:5000"];
		var jieI=0;
		var tuijianyh=[];
		var huxiangxh=[];
		var sousuoyh=[];
		function ajaxtuijian(yonghu){
			var ajaxtj;
			$.ajax({
				async:false,
				url: /* http://10.161.18.188:5000/get_other_user_message */`${jiekou[jieI]}/get_other_user_message`,
				method: "POST",
				timeout: 0,
				headers: {
					"Content-Type": "application/json"
				},
				data:JSON.stringify({
					"j_username":yonghu
				}),
				success:function(res){
					ajaxtj = res.accounts;
				},
				error:function () {
					alert("出错啦...");
				}
			});
			return ajaxtj;
		}
		function xianshi(yh){
			if(yh.name===null){
				$('#yonghuname .neirong').text("无");
			}else{
				$('#yonghuname .neirong').text(yh.name);
			}
			if(yh.j_username===null){
				$('#yonghuj_username .neirong').text("无");
			}else{
				$('#yonghuj_username .neirong').text(yh.j_username);
			}
			if(yh.sex===null){
				$('#yonghusex .neirong').text("无");
			}else{
				$('#yonghusex .neirong').text(yh.sex);
			}
			if(yh.age===null){
				$('#yonghuage .neirong').text("无");
			}else{
				$('#yonghuage .neirong').text(yh.age);
			}
			if(yh.major===null){
				$('#yonghumajor .neirong').text("无");
			}else{
				$('#yonghumajor .neirong').text(yh.major);
			}
			if(yh.number===null){
				$('#yonghunumber .neirong').text("无");
			}else{
				$('#yonghunumber .neirong').text(yh.number);
			}
			if(yh.city===null){
				$('#yonghucity .neirong').text("无");
			}else{
				$('#yonghucity .neirong').text(yh.city);
			}
			if(yh.height===null){
				$('#yonghuheight .neirong').text("无");
			}else{
				$('#yonghuheight .neirong').text(yh.height);
			}
			if(yh.weight===null){
				$('#yonghuweight .neirong').text("无");
			}else{
				$('#yonghuweight .neirong').text(yh.weight);
			}
			if(yh.personality===null){
				$('#yonghupersonality .neirong').text("无");
			}else{
				$('#yonghupersonality .neirong').text(yh.personality);
			}
			if(yh.hobbies===null){
				$('#yonghuhobbies .neirong2').text("无");
			}else{
				$('#yonghuhobbies .neirong2').text(yh.hobbies);
			}
			if(yh.introduction===null){
				$('#yonghuintroduction .neirong2').text("无");
			}else{
				$('#yonghuintroduction .neirong2').text(yh.introduction);
			}
			if(yh.labels===""){
				$('#biaoqian').text("无");
			}else{
				var parent=document.getElementById("biaoqian");
				var first = parent.firstElementChild; 
				while (first) { 
				    first.remove(); 
				    first = parent.firstElementChild; 
				}
				var label=yh.labels.split(',');
				for(var i=0;i<label.length;i++){
					var biaoqian=`<div class="biaoqiannr">${label[i]}</div>`;
					$('#biaoqian').append(biaoqian);
				}
			}
		}
		
		$(document).ready(function(){
			$.ajax({
				/* async:false, */
				url: /*http://10.161.18.188:5000/get_message */`${jiekou[jieI]}/get_message`,
				method: "GET",
				timeout: 0,
				headers: {
					"Authorization": document.cookie.substring(11, 23)
				},
				success:function(res){
					console.log(res);
					var yh=res.accounts[0];
					username=yh;
					if(yh.name===null){
						$('#yonghuming').text("无");
					}else{
						$('#yonghuming').text(yh.name);
						$('#touxiang .circle').text(yh.name[0]);
					}
					if(yh.j_username===null){
						$('#yonghuxuehao').text("无");
					}else{
						$('#yonghuxuehao').text(yh.j_username);
					}
				},
				error:function () {
					
				}
			});
			$.ajax({
				/* async:false, */
				url: `${jiekou[jieI]}/recommend_users`,
				method: "GET",
				timeout: 0,
				headers: {
				  "Authorization": document.cookie.substring(11, 23)
				},
				success:function(res){
					console.log(res);
					if(res===0){
						$('#shibai').css('display','block');
						$('#jiazai').css('display','none');
						$('#shibai').text("请完善您的爱好信息，以便我们为您推荐用户");
					}else{
						$('#tuijianyonghu').css('display','block');
						$('#jiazai').css('display','none');
						for(var i=0;i<6;i++){
							var ajaxtj=ajaxtuijian(res.recommended_users[i].substring(2, 14));
							tuijianyh.push(ajaxtj);
						}
						for(var i=1;i<=6;i++){
							if(tuijianyh[i-1][0].name===null){
								$('#yonghu'+i).find('.yonghuxingming').text("无");
							}else{
								$('#yonghu'+i).find('.yonghuxingming').text(tuijianyh[i-1][0].name);
								$('#yonghu'+i).find('.circle').text(tuijianyh[i-1][0].name[0]);
							}
							if(tuijianyh[i-1][0].sex===null){
								$('#yonghu'+i).find('.yonghuxingbie').text("无");
							}else{
								$('#yonghu'+i).find('.yonghuxingbie').text(tuijianyh[i-1][0].sex);
							}
							if(tuijianyh[i-1][0].city===null){
								$('#yonghu'+i).find('.yonghuchengshi').text("无");
							}else{
								$('#yonghu'+i).find('.yonghuchengshi').text(tuijianyh[i-1][0].city);
							}
							if(tuijianyh[i-1][0].hobbies===null){
								$('#yonghu'+i).find('.yonghuoxingge').text("无");
							}else{
								$('#yonghu'+i).find('.yonghuoxingge').text(tuijianyh[i-1][0].hobbies);
							}
						}
					}
					/* $.ajax({
						url: "http://10.117.12.68:5000/get_liked_users",
						method: "POST",
						timeout: 0,
						headers: {
							"Content-Type": "application/json"
						},
						data:username,
						success:function(res){
							
						},
						error:function () {
							$('#shibai').css('display','block');
							$('#jiazai').css('display','none');
						}
					}); */
				},
				error:function () {
					$('#shibai').css('display','block');
					$('#jiazai').css('display','none');
				}
			});
			
			$('.item1').click(
				function(val){
					if($(this).children()[1].innerText==='主页'){
						
					}else if($(this).children()[1].innerText==='个人信息'){
						window.location.href = "user.html";
					}else if($(this).children()[1].innerText==='私信'){
						window.location.href = "private_letter.html";
					}
					
					if($(this).next().is(":hidden")){//如果二级导航没打开，打开它
						$(this).next().show(500);
						$(this).children('.you').css('transform','rotate(90deg)');//图片旋转90度
					}
					else if($(this).next().children().length==0){}//如果没有二级导航，没操作
					else{//如果二级导航打开了，关闭它
						$(this).next().hide(500)
						$('.you').css('transform','rotate(0deg)');//图片回到原来样子
					}	
				}
			);
			
			$('.item2').click(//点击二级标题触发事件
			     function(val){
					 if($(this).children()[0].innerText==='退出'){
						window.localStorage.removeItem('username');
						window.location.href = "index.html";
					 }else if($(this).children()[0].innerText==='用户反馈'){
						window.location.href = "feedback.html";
					 }
				 }
			);
			$('#zhuanhuan').click(function(){
				if($('#plat').css('display')==='none'){
					$('#plat').css('display','block');
				}else{
					$('#plat').css('display','none');
				}
			});
			//查看用户与申请好友
			$('.tuijian').click(function(){
				$('#tuijianxingxi').css('display','block');
				$('#beijing').css('display','block');
				var a=$(this).attr('id').substr(-1);
				var b=Number(a);
				var yh=tuijianyh[b-1][0];
				$('#avatarImg').attr('src',`${jiekou[jieI]}/get_avatar/${yh.j_username}.jpg`);
				xianshi(yh);
				$.ajax({
					async:false,
					url: `${jiekou[jieI]}/if_like`,
					method: "POST",
					timeout: 0,
					headers: {
						"Content-Type": "application/json",
						"Authorization": document.cookie.substring(11, 23)
					},
					data:JSON.stringify({
						"current_username":$('#yonghuj_username .neirong').text()
					}),
					success:function(res){
						console.log(res);
						var id=document.getElementById('xin');
						if(res.message==="no like"){
							id.style.animationName='mymoveNOT';
							ok=0;
						}else{
							id.style.animationName='mymoveOK';
							ok=1;
						}
					}
				});
				//alert($(this).find('.yonghuxingming').text());
			});
			$('.shenqinghaoyou').click(function(){
				var a=$(this).parent().attr('id').substr(-1);
				var b=Number(a);
				var yh=tuijianyh[b-1][0];
				$.ajax({
					url: `${jiekou[jieI]}/set_pmlist`,
					method: "POST",
					timeout: 0,
					headers: {
						"Content-Type": "application/json",
						"Authorization": document.cookie.substring(11, 23)
					},
					data:JSON.stringify({
						"receiver":yh.j_username
					}),
					success:function(res){
						console.log(res);
						window.location.href = "private_letter.html";
					},
					error:function () {
						
					}
				});
				return false;
			});
			
			$('#sousuoanniu').click(function(){
				$.ajax({
					url: `${jiekou[jieI]}/search_users`,
					method: "POST",
					timeout: 0,
					headers: {
						"Content-Type": "application/json",
						"Authorization": document.cookie.substring(11, 23)
					},
					data:JSON.stringify({
						"name":$('#sousuoname').val(),
						"city":$('#sousuocity').val(),
						"hobbies":$('#sousuohobbies').val(),
						"sex":$('#sousuosex').val(),
						"min_height":$('#sousuomin_height').val(),
						"min_weight":$('#sousuomin_weight').val(),
						"max_height":$('#sousuomax_height').val(),
						"max_weight":$('#sousuomax_weight').val(),
						"introduction":$('#sousuointroduction').val(),
						"personality":$('#sousuopersonality').val(),
						"age":$('#sousuoentry_year').val(),
						"number":$('#sousuonumber').val(),
						"major":$('#sousuomajor').val()
					}),
					success:function(res){
						$('#plat').css('display','none');
						$('#tuijian').css('display','none');
						$('#sousuoyonghu').css('display','block');
						console.log(res);
						sousuoyh=[];
						var parent=document.getElementById("sousuoliebiao");
						var first = parent.firstElementChild; 
						while (first) { 
						    first.remove(); 
						    first = parent.firstElementChild; 
						} 
						var sousuoyonghu = res.users;
						console.log(sousuoyonghu);
						for(var i=0;i<sousuoyonghu.length;i++){
							sousuoyh.push(sousuoyonghu[i]);
							var like=`<div class="sousuoxihuan"><div class="sousuotouxiang"><div class="circle" style="width:45px;height:45px;background-color: #aaaaff;">${sousuoyonghu[i].name[0]}</div></div><div class="sousuoxingming">${sousuoyonghu[i].name}</div><div class="sousuoxingbie">性别：${sousuoyonghu[i].sex}</div><div class="sousuochengshi">城市：${sousuoyonghu[i].city}</div><button class="sousuoshenqinghaoyou">私信</button></div><hr style="width: 98%;"/>`;
							$('#sousuoliebiao').append(like);
						}
					},
					error:function () {
						
					}
				});
			});
			
			$('#sousuofanhui').click(function(){
				$('#tuijian').css('display','block');
				$('#sousuoyonghu').css('display','none');
			});
			
			$('#shuaxinanniu').click(function(){
				if($('#tuijianyonghu').css('display')==='block'){
					$('#tuijianyonghu').css('display','none');
					$('#jiazai').css('display','block');
					setTimeout(function(){
						$('#tuijianyonghu').css('display','block');
						$('#jiazai').css('display','none');
					},1000);
				}
			});
			$('#fanhui2').click(function(){
				$('#tuijianxingxi').css('display','none');
				$('#beijing').css('display','none');
			});
			
			$('#tuijianbiaoti').click(function(){
				$('#xiahuaxian').animate({
					left:'0%'
				},400);
				if($('#shibai').css('display')==='none'&&$('#jiazai').css('display')==='none'){
					$('#tuijianyonghu').css('display','block');
					$('#xiaiyonghu').css('display','none');
				}
			});
			$('#xihuanbiaoti').click(function(){
				$('#xiahuaxian').animate({
					left:'57%'
				},400);
				if($('#shibai').css('display')==='none'&&$('#jiazai').css('display')==='none'){
					$('#tuijianyonghu').css('display','none');
					$('#xiaiyonghu').css('display','block');
					$.ajax({
						async:false,
						url: `${jiekou[jieI]}/get_liked_users`,
						method: "GET",
						timeout: 0,
						headers: {
						  "Authorization": document.cookie.substring(11, 23)
						},
						success:function(res){
							huxiangxh=[];
							var parent=document.getElementById("huxiangxihuan");
							var first = parent.firstElementChild; 
							while (first) { 
							    first.remove(); 
							    first = parent.firstElementChild; 
						    } 
							console.log(res);
							var huxiangxihuan = res.like_each_other;
							console.log(huxiangxihuan);
							for(var i=0;i<huxiangxihuan.length;i++){
								var ajaxxh = ajaxtuijian(huxiangxihuan[i]);
								huxiangxh.push(ajaxxh);
								var like=`<div class="sousuoxihuan"><div class="sousuotouxiang"><div class="circle" style="width:45px;height:45px;background-color: #aaaaff;">${ajaxxh[0].name[0]}</div></div><div class="sousuoxingming">${ajaxxh[0].name}</div><div class="sousuoxingbie">性别：${ajaxxh[0].sex}</div><div class="sousuochengshi">城市：${ajaxxh[0].city}</div><button class="sousuoshenqinghaoyou">私信</button></div><hr style="width: 98%;"/>`;
								$('#huxiangxihuan').append(like);
							}
						}
					});
				}
			});
			
			$('#huxiangxihuan').on('click','.sousuoxihuan',function(){
				for(var i=0;i<huxiangxh.length;i++){
					if($(this).find('.sousuoxingming').text()===huxiangxh[i][0].name){
						$('#tuijianxingxi').css('display','block');
						$('#beijing').css('display','block');
						var yh=huxiangxh[i][0];
						$('#avatarImg').attr('src',`${jiekou[jieI]}/get_avatar/${yh.j_username}.jpg`);
						xianshi(yh);
						$.ajax({
							async:false,
							url: `${jiekou[jieI]}/if_like`,
							method: "POST",
							timeout: 0,
							headers: {
								"Content-Type": "application/json",
								"Authorization": document.cookie.substring(11, 23)
							},
							data:JSON.stringify({
								"current_username":$('#yonghuj_username .neirong').text()
							}),
							success:function(res){
								console.log(res);
								var id=document.getElementById('xin');
								if(res.message==="no like"){
									id.style.animationName='mymoveNOT';
									ok=0;
								}else{
									id.style.animationName='mymoveOK';
									ok=1;
								}
							}
						});
					}
				}
			});
			$('#huxiangxihuan').on('click','.sousuoshenqinghaoyou',function(){
				for(var i=0;i<huxiangxh.length;i++){
					if($(this).parent().find('.sousuoxingming').text()===huxiangxh[i][0].name){
						var yh=huxiangxh[i][0];
						$.ajax({
							url: `${jiekou[jieI]}/set_pmlist`,
							method: "POST",
							timeout: 0,
							headers: {
								"Content-Type": "application/json",
								"Authorization": document.cookie.substring(11, 23)
							},
							data:JSON.stringify({
								"receiver":yh.j_username
							}),
							success:function(res){
								console.log(res);
								window.location.href = "private_letter.html";
							},
							error:function () {
								
							}
						});
						break;
					}
				}
				return false;
			});
			
			$('#sousuoliebiao').on('click','.sousuoxihuan',function(){
				for(var i=0;i<sousuoyh.length;i++){
					if($(this).find('.sousuoxingming').text()===sousuoyh[i].name){
						$('#tuijianxingxi').css('display','block');
						$('#beijing').css('display','block');
						var yh=sousuoyh[i];
						$('#avatarImg').attr('src',`${jiekou[jieI]}/get_avatar/${yh.j_username}.jpg`);
						xianshi(yh);
						$.ajax({
							async:false,
							url: `${jiekou[jieI]}/if_like`,
							method: "POST",
							timeout: 0,
							headers: {
								"Content-Type": "application/json",
								"Authorization": document.cookie.substring(11, 23)
							},
							data:JSON.stringify({
								"current_username":$('#yonghuj_username .neirong').text()
							}),
							success:function(res){
								console.log(res);
								var id=document.getElementById('xin');
								if(res.message==="no like"){
									id.style.animationName='mymoveNOT';
									ok=0;
								}else{
									id.style.animationName='mymoveOK';
									ok=1;
								}
							}
						});
					}
				}
			});
			$('#sousuoliebiao').on('click','.sousuoshenqinghaoyou',function(){
				for(var i=0;i<sousuoyh.length;i++){
					if($(this).parent().find('.sousuoxingming').text()===sousuoyh[i].name){
						var yh=sousuoyh[i];
						$.ajax({
							url: `${jiekou[jieI]}/set_pmlist`,
							method: "POST",
							timeout: 0,
							headers: {
								"Content-Type": "application/json",
								"Authorization": document.cookie.substring(11, 23)
							},
							data:JSON.stringify({
								"receiver":yh.j_username
							}),
							success:function(res){
								console.log(res);
								window.location.href = "private_letter.html";
							},
							error:function () {
								
							}
						});
						break;
					}
				}
				return false;
			});
			
			//收藏爱心
			window.onload=function(){
			    var id=document.getElementById('xin');
			    id.onclick=function(){
					if(ok===0){
						$.ajax({
							url: `${jiekou[jieI]}/save_like`,
							method: "POST",
							timeout: 0,
							headers: {
								"Content-Type": "application/json",
								"Authorization": document.cookie.substring(11, 23)
							},
							data:JSON.stringify({
								"liked_username":$('#yonghuj_username .neirong').text()
							}),
							success:function(res){
								console.log(res);
							}
						});
						id.style.animationName='mymoveOK';
						ok=1;
					}else{
						$.ajax({
							url: `${jiekou[jieI]}/save_like`,
							method: "POST",
							timeout: 0,
							headers: {
								"Content-Type": "application/json",
								"Authorization": document.cookie.substring(11, 23)
							},
							data:JSON.stringify({
								"liked_username":$('#yonghuj_username .neirong').text()
							}),
							success:function(res){
								console.log(res);
							}
						});
						id.style.animationName='mymoveNOT';
						ok=0;
					}     
			    }
			}
		});
		$('#yonghushenqing').click(function(){
			var yh=$(this).parent().find('#yonghuj_username .neirong').text();
			$.ajax({
				url: `${jiekou[jieI]}/set_pmlist`,
				method: "POST",
				timeout: 0,
				headers: {
					"Content-Type": "application/json",
					"Authorization": document.cookie.substring(11, 23)
				},
				data:JSON.stringify({
					"receiver":yh
				}),
				success:function(res){
					console.log(res);
					window.location.href = "private_letter.html";
				},
				error:function () {
					
				}
			});
		});
		neirong2