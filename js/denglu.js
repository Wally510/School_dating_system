$(function () {
	$('#tijiao').on('submit', function (e) {
		e.preventDefault();
		$.ajax({
			url:/* http://10.161.18.188:5000 */"http://10.117.12.68:5000/login",
			method:"POST",
			timeout:0,
			headers:{
				"Content-Type": "application/json"
			},
			data:JSON.stringify({
				"j_username":$('#zhanghao').val(),
				"j_password":$('#zhanghao').val()
			}),
			success:function(res){
				var user=$('#zhanghao').val();
				document.cookie = `j_username=${user}; expires=${new Date(new Date().getTime() + 7*24*60*60*1000).toGMTString()}`;
				window.location.href = "zhuye.html";
			}
		});
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