# 备份 / 恢复数据库

exec — 执行一个外部程序（在 php 文件所在目录进行执行）  

很久以前写的，很多方法是项目中的直接复制粘体用不了，只能提供下思路。  
用到执行外部程序的就这一句：
`exec("mysql -u$username -p$password $database < $backup_path$backup_name");`

    <?php
    defined('BASEPATH') OR exit('No direct script access allowed');

    class Database extends MY_Controller {
    	private $backup_path;
    	public function __construct(){
    		parent::__construct();
    		$this->backup_path = dirname($_SERVER['SCRIPT_FILENAME']).DIRECTORY_SEPARATOR.'db_backup'.DIRECTORY_SEPARATOR;
    	}

    	public function index(){
    		$this->loadViewhf('back/database.html');
    	}

    	public function list_backup(){
    		
    		//打开文件夹
    		$dir_handle = opendir($this->backup_path);
    		//读取文件夹
    		$backup_names = array(); 
    		while(false !== $file = readdir($dir_handle)){
    			if ($file == '.' || $file == '..') continue;
    			// 创建每一行数据
    			$table_row_map = (object)array(
    				'backup_name' => $file,
    				'backup_path' => '~/db_backup'
    				);
    			// 加入每一行数据到data
    			$result['data'][] = $table_row_map;
    		}
    		//返回结果	
            $this->returnResult($result);
    	}


    	public function backup(){

    		// 选择备份路径（网站根目录下的db_backup文件夹）
    		$backup_path = $this->backup_path;
    		// 生成备份文件名
    		$backup_name = date("Y-m-d_H-i-s").'_backup.sql';;
    		// 进行备份
    		$username = $this->db->username;
    		$password = $this->db->password;
    		$database = $this->db->database;
    		exec("mysqldump -u$username -p$password $database > $backup_path$backup_name");
    		// 返回结果
    		$result['status'] = true;
    		$this->returnResult($result);
    	}

    	public function del_backup(){
    		// 备份文件名
    		$backup_name = $this->input->post('backup_name', true);
    		// 选择备份路径（网站根目录下的db_backup文件夹）
    		$backup_path = $this->backup_path;
    		// 删除
    		if (unlink($backup_path.$backup_name)) {
    			$result['status'] = true;
    		}else{
    			$result['status'] = false;
    		}
    		// 返回结果
    		$this->returnResult($result);
    	}

    	public function recover_backup(){
    		// 备份文件名
    		$backup_name = $this->input->post('backup_name', true);
    		// 选择备份路径（网站根目录下的db_backup文件夹）
    		$backup_path = $this->backup_path;
    		// 恢复备份
    		$username = $this->db->username;
    		$password = $this->db->password;
    		$database = $this->db->database;
    		exec("mysql -u$username -p$password $database < $backup_path$backup_name");
    		// 返回结果
    		$result['status'] = true;
    		$this->returnResult($result);
    	}

    }
