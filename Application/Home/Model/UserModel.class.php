<?php
namespace Home\Model;
use Think\Model;
class UserModel extends Model{
	//自动映射   告诉系统 form表单name属性和数据库表字段之间的对应关系
	//格式是固定的！！！  表单name=>表字段
	protected $_map=array(
		'username'=>'phone',
		'password'=>'pwd',
	);

	//自动完成 
	protected $_auto=array(
		array('phone','trim',1,'function'),
		array('pwd','md5',1,'function'),  //自动对密码进行md5加密
	);
}