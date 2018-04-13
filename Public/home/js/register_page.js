
$(function(){
	$('.btn_tgm').on('click',function(){
		var $tgm = $('.tgm');
		$tgm.toggle();
		var $registerId = $("#register");
		$registerId.toggleClass("register_h01");
	});
	$('.btn_tjr').on('click',function(){
		var $tgm = $('.tjr');
		$tgm.toggle();
		var $registerId = $("#register");
		$registerId.toggleClass("register_h02");
	});
	//mobileRegisterTest();	
	registerTest();
	var $rjp_hidden = $(".key_board");
	if($rjp_hidden.is(":visible")){
		$('.register_content').css('overflow','visible');
		$('.register_content #register').css('overflow','visible');
	}
});
function registerTest(){
	$('#cellphone').on('blur',function(){
		registerTipsBlur();
	});
	$('#cellphone').on('focus',function(){
		registerTipsFocus();
	});
	$('#next_step_one').on('click',function(){
		var cellPhone = $('#cellphone');
		var cellPhoneVal = $('#cellphone').val();
		$("#register_tips").text(" ");
		var valp = cellPhoneVal.replace(/\s+/g,"");
		//var wran = $("#register_tips");
		if(cellPhoneVal == ""){
				$("#register_tips").text(" ");
				}else{
					var re = /^1\d{10}$/;
					if(re.test(cellPhoneVal)){
						$("#register_tips").text(" ");
						$.ajax({
							type:"post",
							url:con+'/checkphone',
							data:"phone="+valp,
							dataType:"json",
							async:false,
							success:function(res){
								if(res.state == "2"){
									$("#register_tips").html("改手机号已注册！");
				               }else{
				               		registerNextStepOne();
				               }
							}
						})
					}else{
						$("#register_tips").text("手机号不符合，请重新输入！");
						cellPhone.css({outline:'1px solid red',border:'0px solid red'});
					}
				}
		});
	
	$("#registercode").on('blur',function(){
		registerCodeBlur();
	});
	$("#registercode").on('focus',function(){
		registerCodeFocus();
	})
	$('#next_step_two').on('click',function(){
		registerCodeTips();
	});
	$('#next_step_three').on('click',function(){
		var $registerUserName = $("#registerusername"),
		registerUserName = $('#registerusername').val(),
		$registerPassWord = $("#registerpassword"),
		registerPassWord = $("#registerpassword").val();
		$(".register_username_tips").text(" ");
			if(registerUserName!="" && registerPassWord !=""){
				$.ajax({
					type:"post",
					url:con+"/register",
					data:$("form").serialize(),
					dataType:"json",
					async:false,
					success:function(data){
						$("#next_step_three a").attr('href',data.url);
						console.log(data.url);
					}
				})
				
			}else{
				if(registerUserName==""){
					$(".register_username_tips").text("请输入用户名");
			        $registerUserName.css({outline:'1px solid red',border:'0px solid red'});
			        return;
	      		}	
				if (registerPassWord ==""){
					$(".register_username_tips").text("请输入密码");
			        $registerPassWord.css({outline:'1px solid red',border:'0px solid red'});
			        return;
		        }
			}
	});
	$("#registerusername").on('blur',function(){
		registerUserNameBlur();
	});
	$("#registerpassword").on('blur',function(){
		registerUserNameBlur();
	});
	$(".rsend").on('click',function(){
		sendTime();
	});
	//time时间
	function sendTime(){
			var numbers = /^1\d{10}$/;
			var val = $('#cellphone').val().replace(/\s+/g,""); //获取输入手机号码
			if(numbers.test(val)){
				var time = 30;
				function timeCountDown(){
					if(time==0){
						clearInterval(timer);
						$('.info_voice_send .rsend').show();
						$('.info_voice_send .time_send').hide();
						return true;
					}
					$('.info_voice_send .rsend').hide();
						$('.info_voice_send .time_send').show();
					$('.info_voice_send .time').html(time);
					time--;
					return false;
				}
				timeCountDown();
				var timer = setInterval(timeCountDown,1000);
			}
	}
	/*验证*/
	
	function registerUserNameZc(){
		//debugger;
		var $registerUserName = $("#registerusername"),
		registerUserName = $('#registerusername').val(),
		$registerPassWord = $("#registerpassword"),
		registerPassWord = $("#registerpassword").val();
		$(".register_username_tips").text(" ");
			if(registerUserName!="" && registerPassWord !=""){
			$("#next_step_three a").attr('href','index_zcwc.html');
			return;
			}else{
			if(registerUserName==""){
			$(".register_username_tips").text("请输入用户名");
	        $registerUserName.css({outline:'1px solid red',border:'0px solid red'});
	        return;
	       	}
			if (registerPassWord ==""){
			$(".register_username_tips").text("请输入密码");
	        $registerPassWord.css({outline:'1px solid red',border:'0px solid red'});
	        return;
	        }
			}
	}
	function registerUserNameBlur(){
		var $registerUserName = $("#registerusername"),
		registerUserName = $('#registerusername').val(),
		$registerPassWord = $("#registerpassword"),
		registerPassWord = $("#registerpassword").val();
		$(".register_username_tips").text(" ");
		if(registerUserName !=""){
		   $(".register_username_tips").text(" ");
		   $registerUserName.css({outline:'1px solid #dadada',border:'0px solid #dadada'});
		   return;
		}
		if(registerPassWord !=""){
		   $(".register_username_tips").text(" ");
		   $registerPassWord.css({outline:'1px solid #dadada',border:'0px solid #dadada'});
		   return;
		}
	}
	function registerTipsBlur(){
		var cellPhone = $('#cellphone');
		var cellPhoneVal = $('#cellphone').val();
		$("#register_tips").text(" ");
		if(cellPhoneVal == ""){
				$("#register_tips").text("");
				}else{
					var re = /^1\d{10}$/;
					if(re.test(cellPhoneVal)){
						$("#register_tips").text(" ");
					}else{
						$("#register_tips").text("手机号不符合，请重新输入！");
						cellPhone.css({outline:'1px solid red',border:'0px solid red'});
					}
				}
	}
	function registerTipsFocus(){
		var cellPhone = $('#cellphone');
		cellPhone.css({outline:'1px solid #dadada',border:'0px solid #dadada'});
		$("#register_tips").text(" ");
	}
	function registerNextStepOne(){
		var cellPhone = $('#cellphone');
		var cellPhoneVal = $('#cellphone').val();
		var zmyzmVal = $('.cm_register_input_name').val();
		$("#register_tips").text(" ");
		if($(".register_phone_code").is(':hidden')){
			if(cellPhoneVal == "" || cellPhoneVal == "请填写11位数手机号码"){
				$("#register_tips").text("请填写11位数手机号码");
				}else{
					var re = /^1\d{10}$/;
					if(re.test(cellPhoneVal)){
						$("#register_tips").text(" ");
						//alert('123');
						$(".register_content_wrap").animate({marginLeft:-430+'px'},500);
						sendTime();
					}else{
						$("#register_tips").text("手机号不符合，请重新输入！");
						cellPhone.css({outline:'1px solid red',border:'0px solid red'});
					}
				}
		}else{
			if(zmyzmVal == ""){
				$("#register_tips").text("验证码不能为空");
				}else{
					if(zmyzmVal.length == 4){
						$("#register_tips").text(" ");
						$(".register_content_wrap").animate({marginLeft:-430+'px'},500);
						sendTime();
					}else{
					$("#register_tips").text("验证码错误,请重新输入！");	
					}
				}
		}
	}
	function wran(){
		console.log(213);
		$("#register_tips").html("改手机号已注册！");
	}
	function registerCodeFocus(){
		var registerCode = $("#registercode");
		registerCode.css({outline:'1px solid #dadada',border:'0px solid #dadada'});
		$(".regsiter_code_tips").text(' ');
	}
	function registerCodeBlur(){
		var registerCode = $("#registercode");
		var registerCodeVal = $("#registercode").val();
		$(".regsiter_code_tips").text(' ');
		if(registerCodeVal == ""){
			$(".regsiter_code_tips").text(' ');
		}else{
			var regisiterCVL = registerCodeVal.length;
			if(regisiterCVL == 4){
				$(".regsiter_code_tips").text(' ');
			}else{
				$(".regsiter_code_tips").text('验证错误，请重新输入');
				registerCode.css({outline:'1px solid red',border:'0px solid red'});
			}
		}
	}
	function registerCodeTips(){
		var registerCode = $("#registercode");
		var registerCodeVal = $("#registercode").val();
		$(".regsiter_code_tips").text(' ');
		if(registerCodeVal == ""){
			$(".regsiter_code_tips").text('验证码不能为空');
		}else{
			var regisiterCVL = registerCodeVal.length;
			if(regisiterCVL == 4){
				$(".regsiter_code_tips").text(' ');
				$(".register_content_wrap").animate({marginLeft:-860+'px'},500);
			}else{
				$(".regsiter_code_tips").text('验证码错误，请重新输入');
				registerCode.css({outline:'1px solid red',border:'0px solid red'});
			}
		}
		
	}
}
/***手机端的验证***/

	
	
	
	
	
	
	
	
	
	/*验证*/
	