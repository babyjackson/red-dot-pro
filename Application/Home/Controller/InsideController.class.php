<?php
namespace Home\Controller;
use Think\Controller;
class InsideController extends Controller{
    public function invest(){
    	/**
		 * 分页
		 * **/
		$invest=M("invest");//实例化invest对象
		$count = $invest->where($map)->count();//查询满足要求的总记录
		$page = new\Think\Page($count,2);//实例化分页类，传入总记录数和每页显示的记录数
		//分页跳转的时候确保查询条件
		foreach($map as $key=>$val){
			$page->parameter[$key] = urldecode($val);
		}
		$show = $page->show();//分页显示输出
		print_r($show);
        $this->display();
    }
}