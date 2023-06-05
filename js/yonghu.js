		var username;
		$(document).ready(function(){
			$.ajax({
				url: /*http://10.161.18.188:5000/get_message */"http://10.151.17.97:5000/get_message",
				method: "GET",
				timeout: 0,
				headers: {
					"Authorization": document.cookie.substring(11, 23)
				},
				success:function(res){
					console.log(res);
					$('#avatarImg').attr('src',`http://10.151.17.97:5000/get_avatar/${document.cookie.substring(11, 23)}.jpg`);
					var yh=res.accounts[0];
					username=yh;
					if(yh.name===null){
						$('#yonghuname .yonghuneirong').text("无");
					}else{
						$('#yonghuname .yonghuneirong').text(yh.name);
						$('#yonghuming').text(yh.name);
					}
					if(yh.j_username===null){
						$('#yonghuj_username .yonghuneirong').text("无");
					}else{
						$('#yonghuj_username .yonghuneirong').text(yh.j_username);
						$('#yonghuxuehao').text(yh.j_username);
					}
					if(yh.sex===null){
						$('#yonghusex .yonghuneirong').text("无");
					}else{
						$('#yonghusex .yonghuneirong').text(yh.sex);
					}
					if(yh.age===null){
						$('#yonghuage .yonghuneirong').text("无");
					}else{
						$('#yonghuage .yonghuneirong').text(yh.age);
					}
					if(yh.major===null){
						$('#yonghumajor .yonghuneirong').text("无");
					}else{
						$('#yonghumajor .yonghuneirong').text(yh.major);
					}
					if(yh.number===null){
						$('#yonghunumber .yonghuneirong').text("无");
					}else{
						$('#yonghunumber .yonghuneirong').text(yh.number);
					}
					if(yh.city===null){
						$('#yonghucity .yonghuneirong').text("无");
					}else{
						$('#yonghucity .yonghuneirong').text(yh.city);
					}
					if(yh.height===null){
						$('#yonghuheight .yonghuneirong').text("无");
					}else{
						$('#yonghuheight .yonghuneirong').text(yh.height);
					}
					if(yh.weight===null){
						$('#yonghuweight .yonghuneirong').text("无");
					}else{
						$('#yonghuweight .yonghuneirong').text(yh.weight);
					}
					if(yh.personality===null){
						$('#yonghupersonality .yonghuneirong').text("无");
					}else{
						$('#yonghupersonality .yonghuneirong').text(yh.personality);
					}
					if(yh.hobbies===null){
						$('#yonghuhobbies .yonghuneirong2').text("无");
					}else{
						$('#yonghuhobbies .yonghuneirong2').text(yh.hobbies);
					}
					if(yh.introduction===null){
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
						window.location.href = "zhuye.html";
					}else if($(this).children()[1].innerText==='私信'){
						window.location.href = "sixin.html";
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
					 console.log($(this).children()[0].innerText);
					 $('.content').html($(this).children()[0].innerText);
				 }
			);
			
			$('#bianji').click(
				function(){
					$('#gerenxingxi').css('display','none');
					$('#gerenbianji').css('display','block');
					$('#j_username').val(username.j_username);
					$('#name').val(username.name);
					$('#city').val(username.city);
					$('#neirong').text(username.hobbies);
					$('#sex').val(username.sex);
					$('#height').val(username.height);
					$('#weight').val(username.weight);
					$('#introduction').val(username.introduction);
					$('#personality').val(username.personality);
					$('#age').val(username.age);
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
				$.ajax({
					url: "http://10.151.17.97:5000/edit_account",
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
					    "major":$('#major').val()
					}),
					success:function(res){
						console.log(res);
					},
					error:function () {
						alert("出错啦...");
					}
				});
			});
			
			$('#xiala').click(function(){
				if($('#hobbies_price').css('display')==='none'){
					$('#hobbies_price').css('display','block');
					$.ajax({
						url: "http://10.151.17.97:5000/get_hobbies",
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
					url: "http://10.151.17.97:5000/edit_labels",
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
						window.location.href = "yonghu.html";
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
		});
		
