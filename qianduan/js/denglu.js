var jiekou=["http://10.161.5.8:5000","http://10.117.12.68:5000","http://10.151.17.97:5000","http://10.161.41.78:5000","http://10.161.14.216:5000"];
var jieI=0;
$(document).ready(function(){
	if(document.cookie.indexOf("j_username=")!==-1){
		$('#zhanghao').val(document.cookie.substring(11, 23));
		$('#mima').val(document.cookie.substring(11, 23));
	}
	$('#tijiao').on('submit', function (e) {
		e.preventDefault();
		/*console.log($('#zhanghao').val()); */
		if($('#zhanghao').val()===""){
			$('#shuruzhanghao').text("请输入账号");
			$('#shuruzhanghao').css('display','block');
			$('#zhanghao').css('border','1px solid #ff0000');
		}else if($('#mima').val()===""){
			$('#shurumima').text("请输入密码");
			$('#shurumima').css('display','block');
			$('#mima').css('border','1px solid #ff0000');
		}else{
			$.ajax({
				url:`${jiekou[jieI]}/login`,
				method:"POST",
				timeout:0,
				headers:{
					"Content-Type": "application/json"
				},
				data:JSON.stringify({
					"j_username":$('#zhanghao').val(),
					"j_password":$('#mima').val()
				}),
				success:function(res){
					console.log(res);
					if(res.message==="Invalid username or password"){
						$('#shurumima').text("用户名或密码错误");
						$('#zhanghao').css('border','1px solid #ff0000');
						$('#shurumima').css('display','block');
						$('#mima').css('border','1px solid #ff0000');
					}else if(res.message==="you have been blocked"){
						$('#shuruzhanghao').text("账号已被封，请联系管理员");
						$('#shuruzhanghao').css('display','block');
						$('#zhanghao').css('border','1px solid #ff0000');
					}else{
						var user=$('#zhanghao').val();
						document.cookie = `j_username=${user}; expires=${new Date(new Date().getTime() + 7*24*60*60*1000).toGMTString()}`;
						window.location.href = "homepage.html";
					}
				}
			});
		}
		/* $.ajax({  
			url: "https://auth.sztu.edu.cn/idp/AuthnEngine?currentAuth=urn_oasis_names_tc_SAML_2.0_ac_classes_BAMUsernamePassword",
			method: "POST",
			timeout: 0,
			headers: {
				"Content-Type": "application/json"
			},
			data:JSON.stringify({
				"j_username":"202100203026",
				"j_password":"mIBlJweoNhE7ySbQIp31KQ=="
				"j_checkcode":"%E9%AA%8C%E8%AF%81%E7%A0%81",
				"op":"login",
				"spAuthChainCode":"cc2fdbc3599b48a69d5c82a665256b6b"
			}),
			success: function() {      
				$.ajax({
					url:"http://10.117.12.68:5000/login",
					method:"POST",
					timeout:0,
					headers:{
						"Content-Type": "application/json"
					},
					data:JSON.stringify({
						"j_username":$('#zhanghao').val(),
						"j_password":$('#zhanghao').val()
					}),
					success:function(){
						window.location.href = "zhuye.html";
					}
				});
			},
			error:function () {
				alert("出错啦...");
			}
		}); */
	});
});
$('#zhanghao').click(function(){
	$('#shuruzhanghao').css('display','none');
	$('#zhanghao').css('border','0.5px solid #d6d6d6');
});
$('#mima').click(function(){
	$('#shurumima').css('display','none');
	$('#mima').css('border','0.5px solid #d6d6d6');
});
