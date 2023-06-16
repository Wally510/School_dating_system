		var username;
		var jiekou=["http://10.161.5.8:5000","http://10.117.12.68:5000","http://10.151.17.97:5000","http://10.161.41.78:5000","http://10.161.14.216:5000"];
		var jieI=0;
		$(document).ready(function(){
			$.ajax({
				url: `${jiekou[jieI]}/get_message`,
				method: "GET",
				timeout: 0,
				headers: {
					"Authorization": document.cookie.substring(11, 23)
				},
				success:function(res){
					console.log(res);
					$('#avatarImg').attr('src',`${jiekou[jieI]}/get_avatar/${document.cookie.substring(11, 23)}.jpg`);
					var yh=res.accounts[0];
					username=yh;
					if(yh.name==="" || yh.name===null){
						$('#yonghuname .yonghuneirong').text("无");
					}else{
						$('#yonghuname .yonghuneirong').text(yh.name);
						$('#yonghuming').text(yh.name);
						$('#touxiang .circle').text(yh.name[0]);
					}
					if(yh.j_username==="" || yh.j_username===null){
						$('#yonghuj_username .yonghuneirong').text("无");
					}else{
						$('#yonghuj_username .yonghuneirong').text(yh.j_username);
						$('#yonghuxuehao').text(yh.j_username);
					}
					if(yh.sex==="" || yh.sex===null){
						$('#yonghusex .yonghuneirong').text("无");
					}else{
						$('#yonghusex .yonghuneirong').text(yh.sex);
					}
					if(yh.age===0 || yh.age===null){
						$('#yonghuage .yonghuneirong').text("无");
					}else{
						$('#yonghuage .yonghuneirong').text(yh.age);
					}
					if(yh.major==="" || yh.major===null){
						$('#yonghumajor .yonghuneirong').text("无");
					}else{
						$('#yonghumajor .yonghuneirong').text(yh.major);
					}
					if(yh.number==="" || yh.number===null){
						$('#yonghunumber .yonghuneirong').text("无");
					}else{
						$('#yonghunumber .yonghuneirong').text(yh.number);
					}
					if(yh.city==="" || yh.city===null){
						$('#yonghucity .yonghuneirong').text("无");
					}else{
						$('#yonghucity .yonghuneirong').text(yh.city);
					}
					if(yh.height===0 || yh.height===null){
						$('#yonghuheight .yonghuneirong').text("无");
					}else{
						$('#yonghuheight .yonghuneirong').text(yh.height);
					}
					if(yh.weight===0 || yh.weight===null){
						$('#yonghuweight .yonghuneirong').text("无");
					}else{
						$('#yonghuweight .yonghuneirong').text(yh.weight);
					}
					if(yh.personality==="" || yh.personality===null){
						$('#yonghupersonality .yonghuneirong').text("无");
					}else{
						$('#yonghupersonality .yonghuneirong').text(yh.personality);
					}
					if(yh.hobbies==="" || yh.hobbies===null){
						$('#yonghuhobbies .yonghuneirong2').text("无");
					}else{
						$('#yonghuhobbies .yonghuneirong2').text(yh.hobbies);
					}
					if(yh.introduction==="" || yh.introduction===null){
						$('#yonghuintroduction .yonghuneirong2').text("无");
					}else{
						$('#yonghuintroduction .yonghuneirong2').text(yh.introduction);
					}
					var label=yh.labels.split(',');
					for(var i=0;i<label.length;i++){
						var biaoqian=`<div class="biaoqiannr">${label[i]}<div class="biaoqiancha"><img src="img/叉.png" width="20px" height="20px"/></div></div>`;
						$('#biaoqianneirong').append(biaoqian);
					}
				},
				error:function () {
					
				}
			});
			
			$('.item1').click(
				function(val){
					if($(this).children()[1].innerText==='个人信息'){
						$('#gerenxingxi').css('display','block');
						$('#gerenbianji').css('display','none');
					}else if($(this).children()[1].innerText==='主页'){
						window.location.href = "homepage.html";
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
			
			$('#bianji').click(
				function(){
					$('#gerenxingxi').css('display','none');
					$('#gerenbianji').css('display','block');
					$('#j_username').text(username.j_username);
					$('#j_password1').val(username.j_password);
					$('#name').val(username.name);
					$('#city').val(username.city);
					$('#neirong').text(username.hobbies);
					$('#sex').val(username.sex);
					if(username.height!==0){
						$('#height').val(username.height);
					}
					if(username.weight!==0){
						$('#weight').val(username.weight);
					}
					$('#introduction').val(username.introduction);
					$('#personality').val(username.personality);
					if(username.age!==0){
						$('#age').val(username.age);
					}
					$('#number').val(username.number);
					$('#major').val(username.major);
				}
			);
			$('#fanhui').click(
				function(){
					$('#gerenxingxi').css('display','block');
					$('#gerenbianji').css('display','none');
				}
			);
			$('#chongzhi').click(function(){
				$("#gerenform")[0].reset();
				$('html,body').animate({
				    scrollTop:0
				},'slow');
				/*$("input[type='text']").prop("value","");
				$('select').prop('selectedIndex', 0);*/
			});
			$('#baocun').click(function(){
				var j_password;
				var j_password1=$('#j_password1').val();
				var j_password2=$('#j_password2').val();
				var j_password3=$('#j_password3').val();
				if(j_password2===""){
					j_password=j_password1;
				}else{
					j_password=j_password2;
				}
				if(j_password2===j_password3 || j_password2===""){
					var username=document.cookie.substring(11, 23);
					var formdata=new FormData();
					formdata.append("avatar",$('#yonghutupian')[0].files[0]);
					console.log(formdata);
					$.ajax({
						url: `${jiekou[jieI]}/upload`,
						method: "POST",
						timeout: 0,
						headers: {
							/*"Content-Type": "application/json", */
							"Authorization": document.cookie.substring(11, 23)
						},
						processData: false,
						mimeType:"multipart/form-data",
						contentType: false,
						data:formdata,
						success:function(res){
							console.log(res);
						},
						error:function () {
							alert("出错啦...");
						}
					});
					$.ajax({
						url: `${jiekou[jieI]}/edit_account`,
						method: "POST",
						timeout: 0,
						headers: {
							"Content-Type": "application/json",
							"Authorization": document.cookie.substring(11, 23)
						},
						data:JSON.stringify({
						    /* "j_username":$('#j_username').val(), */
						    "name":$('#name').val(),
						    "city":$('#city').val(),
						    "hobbies":$('#neirong').text(),
						    "sex":$('#sex').val(),
						    "height":$('#height').val(),
						    "weight":$('#weight').val(),
						    "introduction":$('#introduction').val(),
						    "personality":$('#personality').val(),
						    "age":$('#age').val(),
						    "number":$('#number').val(),
						    "major":$('#major').val(),
							"j_password":j_password
						}),
						success:function(res){
							console.log(res);
							window.location.href = "user.html";
						},
						error:function () {
							alert("出错啦...");
						}
					});
				}else{
					$('#liangci').css('display','block');
					$('#j_password2').css('border','1px solid #ff0000');
					$('#j_password3').css('border','1px solid #ff0000');
				}
			});
			$('#j_password2').click(function(){
				$('#liangci').css('display','none');
				$('#j_password2').css('border','1px solid #ccc');
				$('#j_password3').css('border','1px solid #ccc');
			});
			$('#j_password3').click(function(){
				$('#liangci').css('display','none');
				$('#j_password2').css('border','1px solid #ccc');
				$('#j_password3').css('border','1px solid #ccc');
			});
			
			$('#xiala').click(function(){
				if($('#hobbies_price').css('display')==='none'){
					$('#hobbies_price').css('display','block');
					$.ajax({
						url: `${jiekou[jieI]}/get_hobbies`,
						method: "GET",
						timeout: 0,
						success:function(res){
							var parent=document.getElementById("hobbies_price");
							var first = parent.firstElementChild; 
							while (first) { 
							    first.remove(); 
							    first = parent.firstElementChild; 
							}
							console.log(res);
							var hobbies=res.hobbies;
							for(var i=0;i<hobbies.length;i++){
								var hobby=`<label class="hobbiesN">${hobbies[i].hobby}</label>`;
								$('#hobbies_price').append(hobby);
							}
						},
						error:function () {
							console.log("出错啦...");
						}
					});
				}else{
					$('#hobbies_price').css('display','none');
				}
			});
			
			$('#qudiao').click(function(){
				$('#neirong').text("");
			});
			
			$('#biaoqianjia').click(function(){
				$('#tianxiebiaoqian').css('display','block');
				$('#beijing').css('display','block');
			});
			$('#biaoqianfanhui').click(function(){
				$('#tianxiebiaoqian').css('display','none');
				$('#beijing').css('display','none');
			});
			
			$('#biaoqianbaocun').click(function(){
				var labels="";
				var parent=document.getElementById("biaoqianneirong");
				var first = parent.firstElementChild; 
				while (first) { 
					labels=labels+first.innerText+",";
				    first.remove(); 
				    first = parent.firstElementChild; 
				}
				console.log(labels);
				labels=labels+$('#biaoqiannr').val();
				$.ajax({
					url: `${jiekou[jieI]}/edit_labels`,
					method: "POST",
					timeout: 0,
					headers: {
						"Content-Type": "application/json",
						"Authorization": document.cookie.substring(11, 23)
					},
					data:JSON.stringify({
					    "labels":labels
					}),
					success:function(res){
						console.log(res);
						window.location.href = "user.html";
					},
					error:function () {
						console.log("出错啦...");
					}
				});
			});
		});
		$('#hobbies_price').on('click','.hobbiesN',function(){
			var habby=`${$(this).text()+','}`;
			$('#neirong').append(habby);
		});
		
		$('#biaoqianneirong').on('click','.biaoqiancha',function(){
			$(this).parent().remove(); 
			var labels="";
			var parent=document.getElementById("biaoqianneirong");
			var first = parent.firstElementChild; 
			while (first) { 
				labels=labels+first.innerText+",";
			    first.remove(); 
			    first = parent.firstElementChild; 
			}
			console.log(labels);
			$.ajax({
				url: `${jiekou[jieI]}/edit_labels`,
				method: "POST",
				timeout: 0,
				headers: {
					"Content-Type": "application/json",
					"Authorization": document.cookie.substring(11, 23)
				},
				data:JSON.stringify({
				    "labels":labels
				}),
				success:function(res){
					console.log(res);
					window.location.href = "user.html";
				},
				error:function () {
					console.log("出错啦...");
				}
			});
		});
		var fileInput = document.querySelector('input[type=file]'),
		        previewImg = document.getElementById('touxiangtupian');
		fileInput.addEventListener('change', function () {
		    var file = this.files[0];
		    var reader = new FileReader();
		    // 监听reader对象的的onload事件，当图片加载完成时，把base64编码賦值给预览图片
		    reader.addEventListener("load", function () {
		        previewImg.src = reader.result;
		    }, false);
		    // 调用reader.readAsDataURL()方法，把图片转成base64
		    reader.readAsDataURL(file);
		}, false);
		cha