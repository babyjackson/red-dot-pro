function banner() {
	var bn_id = 0;
	var bn_id2 = 1;
	var speed33 = 5000;
	var qhjg = 1;
	var MyMar33;
	$("#banner .d1").hide();
	$("#banner .d1").eq(0).fadeIn("slow");
	if($("#banner .d1").length > 1) {
		$("#banner_id li").eq(0).addClass("nuw");

		function Marquee33() {
			bn_id2 = bn_id + 1;
			if(bn_id2 > $("#banner .d1").length - 1) {
				bn_id2 = 0;
			}
			$("#banner .d1").eq(bn_id).css("z-index", "2");
			$("#banner .d1").eq(bn_id2).css("z-index", "1");
			$("#banner .d1").eq(bn_id2).show();
			$("#banner .d1").eq(bn_id).fadeOut("slow");
			$("#banner_id li").removeClass("nuw");
			$("#banner_id li").eq(bn_id2).addClass("nuw");
			bn_id = bn_id2;
		};

		function Marquee333() {
			bn_id2 = bn_id - 1;
			if(bn_id2 < 0) {
				bn_id2 = $("#banner .d1").length - 1;
			}
			$("#banner .d1").eq(bn_id).css("z-index", "2");
			$("#banner .d1").eq(bn_id2).css("z-index", "1");
			$("#banner .d1").eq(bn_id2).show();
			$("#banner .d1").eq(bn_id).fadeOut("slow");
			$("#banner_id li").removeClass("nuw");
			$("#banner_id li").eq(bn_id2).addClass("nuw");
			bn_id = bn_id2;
		};
		MyMar33 = setInterval(Marquee33, speed33);
		//箭头点击
		$(".banner_lt").click(function() {
			Marquee333();
			//alert('hhh')
		});
		$(".banner_gt").click(function() {		
			Marquee33();
			//alert('hhh')
		});
		$("#banner_id li").click(function() {
			var bn_id3 = $("#banner_id li").index(this);
			if(bn_id3 != bn_id && qhjg == 1) {
				qhjg = 0;
				$("#banner .d1").eq(bn_id).css("z-index", "2");
				$("#banner .d1").eq(bn_id3).css("z-index", "1");
				$("#banner .d1").eq(bn_id3).show();
				$("#banner .d1").eq(bn_id).fadeOut("slow", function() {
					qhjg = 1;
				});
				$("#banner_id li").removeClass("nuw");
				$("#banner_id li").eq(bn_id3).addClass("nuw");
				bn_id = bn_id3;
			}
		})
		$("#banner").hover(
			function() {
				clearInterval(MyMar33);
				$(".banner .gt_lt p").animate({
					opacity: 0.4
				}, 500);
			},
			function() {
				MyMar33 = setInterval(Marquee33, speed33);
				$(".banner .gt_lt p").animate({
					opacity: 0
				}, 500);
			}
		)
	} else {
		$("#banner_id").hide();
	}
}
//进度条
function animate() {
	$(".jdt_1 span").each(function(i, item) {
		var a = parseInt($(item).attr("w"));
		if(0 <= a <= 2) {
			$(".jdt_1 p b").css({
				marginLeft: 0 + "px"
			});
		}

		if(2 < a < 4) {
			$(".jdt_1 p b").css({
				marginLeft: "-2px"
			});
		}
		var jdtW = 138 * (a / 100);
		$(item).animate({
			width: jdtW + "px"
		}, 1000);
	});

}
$(function(){
	banner();
	animate();
})
					