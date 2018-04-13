<?php
namespace Home\Controller;
use Think\Controller;
class IndexController extends Controller{
    public function index(){
    	$this->display();
     }
	public function reddotlist(){
		$data= M('hotdotlist')->select(); 
		$datas = json_encode($data,TRUE);
		echo($datas);
	}
	public function invest(){
		$datai = M('invest')->select();
		$datais = json_encode($datai,TRUE);
		echo($datais);
	}
}