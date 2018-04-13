<?php
namespace Home\Controller;
use Think\Controller;
class UserController extends Controller{
    public function checkphone(){
		$phone = I("phone");
		//echo $phones;
		if(!$phone){
			return false;
		}else{
			//拿用户输入的手机号去数据库查找
	        // select * from user where phone=$_POST['phone'];
	        //$list = M('user')->where("phone='".$phone."'")->find();
			$list = M('user')->where("phone='".$phone."'")->find();
			if(count($list)<=0 || is_null($list)){
	           $this->ajaxReturn(['state'=>'1']);
	        }else{
	           $this->ajaxReturn(['state'=>'2']);
	        }
			//print_r($list);
		}
	}
	public function register(){
		if(!I('post.username')){
            $this->display();
        }else{
            $data=D('user')->create(); 
            $data['regtime'] = date('Y-m-d H:i:s');
            $lastId = D("user")->add($data);    
            if($lastId>0){
                $this->success("注册成功",U('Home/User/complete'));
            }else{
                $this->error("注册失败");
            }
        }
	}
	public function complete(){
		$this->display();
	}
	public function login(){
		/**判断是否缓存，是否登录过**/
		
		if(!cookie('home_id')){
            $this->display();
        }else{
            $this->redirect("Home/Index/index");
        }
	}
	/**ajax登录处理***/
	public function login_do(){
		$olddata = I('get.');
        $data = D("user")->create();
		//print_r($data);
        $where = $data;
		$result=D("user")->where($data)->find();
		//print_r($result);
		if(is_array($result) && count($result)>=1){
			//记录登记信息
			$data['logintime'] = date("Y-m-d H:i:s");
			$data['loginip'] = get_client_ip();
			$row = D("user")->where($where)->save($data);//根据条件保存修改-数据
			if($row>=1){
				//登录成功后存储回话信息
				//登录成功  存储会话信息
                session('home_uname',$result['uname']); 
                session('home_account',$result['phone']); 
                session('home_id',$result['uid']); 
                cookie("home_id",$result['uid'],60*60*24*7);
                if(isset($olddata['remember'])){
                    cookie("home_uname",$olddata['uname'],60*60*24*7);
                    cookie("home_password",$olddata['password'],60*60*24*7);
                }
				$data=array('status'=>'true','msg'=>'登陆成功');
			}else{
				$data=array('status'=>'false','msg'=>'登陆失败');
			}
		}else{
			$data=array('status'=>'false','msg'=>'用户名或密码错误');
		}
		$this->ajaxReturn($data);
		/*
		$olddata = I("post.");
		$data = D("user")->create();
		$where = $data;
		//var_dump($data);
		$result=D("user")->where($data)->find();
		//var_dump($result);
		*/
		
	}
	/***图形验证码***/
	public function checkverify(){
        if(!I('tel')||!I('code')){
            return false;
        }else{
            if(cookie('mobile')=="" || cookie('mobile_code')==""){
                $data=['state'=>'false','code'=>2,'msg'=>'验证码已过期，请重新发送'];
                $this->ajaxReturn($data);
                die;
            }
            if(I('code')==session('mobile_code') && I('tel')==session('mobile')){
                $data=['state'=>'true','code'=>1,'msg'=>'验证成功'];
                $this->ajaxReturn($data);
            }else{
                $data=['state'=>'false','code'=>0,'msg'=>'验证失败'];
                 $this->ajaxReturn($data);   
            }
        }
	}
}