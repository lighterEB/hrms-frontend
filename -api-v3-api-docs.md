# HRMS API文档


**简介**:HRMS API文档


**HOST**:http://127.0.0.1:8080/api


**联系人**:Your Name


**Version**:1.0


**接口路径**:/api/v3/api-docs


[TOC]






# 用户管理


## 获取用户详情


**接口地址**:`/api/v1/users/{id}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id||path|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|RSysUser|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||SysUser|SysUser|
|&emsp;&emsp;id||integer(int64)||
|&emsp;&emsp;createTime||string(date-time)||
|&emsp;&emsp;createUser||string||
|&emsp;&emsp;updateTime||string(date-time)||
|&emsp;&emsp;updateUser||string||
|&emsp;&emsp;isDeleted||integer(int32)||
|&emsp;&emsp;username||string||
|&emsp;&emsp;password||string||
|&emsp;&emsp;realName||string||
|&emsp;&emsp;phone||string||
|&emsp;&emsp;email||string||
|&emsp;&emsp;avatar||string||
|&emsp;&emsp;gender||integer(int32)||
|&emsp;&emsp;status||integer(int32)||
|&emsp;&emsp;lastLoginTime||string(date-time)||
|extra||object||
|success||boolean||
|timestamp||integer(int64)|integer(int64)|


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {
		"id": 0,
		"createTime": "",
		"createUser": "",
		"updateTime": "",
		"updateUser": "",
		"isDeleted": 0,
		"username": "",
		"password": "",
		"realName": "",
		"phone": "",
		"email": "",
		"avatar": "",
		"gender": 0,
		"status": 0,
		"lastLoginTime": ""
	},
	"extra": {},
	"success": true,
	"timestamp": 0
}
```


## 修改用户


**接口地址**:`/api/v1/users/{id}`


**请求方式**:`PUT`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "id": 0,
  "createTime": "",
  "createUser": "",
  "updateTime": "",
  "updateUser": "",
  "isDeleted": 0,
  "username": "",
  "password": "",
  "realName": "",
  "phone": "",
  "email": "",
  "avatar": "",
  "gender": 0,
  "status": 0,
  "lastLoginTime": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id||path|true|integer(int64)||
|sysUser|SysUser|body|true|SysUser|SysUser|
|&emsp;&emsp;id|||false|integer(int64)||
|&emsp;&emsp;createTime|||false|string(date-time)||
|&emsp;&emsp;createUser|||false|string||
|&emsp;&emsp;updateTime|||false|string(date-time)||
|&emsp;&emsp;updateUser|||false|string||
|&emsp;&emsp;isDeleted|||false|integer(int32)||
|&emsp;&emsp;username|||false|string||
|&emsp;&emsp;password|||false|string||
|&emsp;&emsp;realName|||false|string||
|&emsp;&emsp;phone|||false|string||
|&emsp;&emsp;email|||false|string||
|&emsp;&emsp;avatar|||false|string||
|&emsp;&emsp;gender|||false|integer(int32)||
|&emsp;&emsp;status|||false|integer(int32)||
|&emsp;&emsp;lastLoginTime|||false|string(date-time)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|RVoid|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||object||
|extra||object||
|success||boolean||
|timestamp||integer(int64)|integer(int64)|


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {},
	"extra": {},
	"success": true,
	"timestamp": 0
}
```


## 删除用户


**接口地址**:`/api/v1/users/{id}`


**请求方式**:`DELETE`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id||path|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|RVoid|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||object||
|extra||object||
|success||boolean||
|timestamp||integer(int64)|integer(int64)|


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {},
	"extra": {},
	"success": true,
	"timestamp": 0
}
```


## 修改用户状态


**接口地址**:`/api/v1/users/{id}/status/{status}`


**请求方式**:`PUT`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id|用户ID|path|true|integer(int64)||
|status|状态（0-禁用 1-正常）|path|true|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|RVoid|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||object||
|extra||object||
|success||boolean||
|timestamp||integer(int64)|integer(int64)|


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {},
	"extra": {},
	"success": true,
	"timestamp": 0
}
```


## 新增用户


**接口地址**:`/api/v1/users`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "id": 0,
  "createTime": "",
  "createUser": "",
  "updateTime": "",
  "updateUser": "",
  "isDeleted": 0,
  "username": "",
  "password": "",
  "realName": "",
  "phone": "",
  "email": "",
  "avatar": "",
  "gender": 0,
  "status": 0,
  "lastLoginTime": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|sysUser|SysUser|body|true|SysUser|SysUser|
|&emsp;&emsp;id|||false|integer(int64)||
|&emsp;&emsp;createTime|||false|string(date-time)||
|&emsp;&emsp;createUser|||false|string||
|&emsp;&emsp;updateTime|||false|string(date-time)||
|&emsp;&emsp;updateUser|||false|string||
|&emsp;&emsp;isDeleted|||false|integer(int32)||
|&emsp;&emsp;username|||false|string||
|&emsp;&emsp;password|||false|string||
|&emsp;&emsp;realName|||false|string||
|&emsp;&emsp;phone|||false|string||
|&emsp;&emsp;email|||false|string||
|&emsp;&emsp;avatar|||false|string||
|&emsp;&emsp;gender|||false|integer(int32)||
|&emsp;&emsp;status|||false|integer(int32)||
|&emsp;&emsp;lastLoginTime|||false|string(date-time)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|RVoid|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||object||
|extra||object||
|success||boolean||
|timestamp||integer(int64)|integer(int64)|


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {},
	"extra": {},
	"success": true,
	"timestamp": 0
}
```


## 获取用户的角色ID列表


**接口地址**:`/api/v1/users/{id}/roles`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id||path|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|RListLong|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||array||
|extra||object||
|success||boolean||
|timestamp||integer(int64)|integer(int64)|


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": [],
	"extra": {},
	"success": true,
	"timestamp": 0
}
```


## 分配用户角色


**接口地址**:`/api/v1/users/{id}/roles`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "roleIds": []
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id|用户ID|path|true|integer(int64)||
|assignUserRolesRequest|分配用户角色请求参数|body|true|AssignUserRolesRequest|AssignUserRolesRequest|
|&emsp;&emsp;roleIds|角色ID列表||true|array|integer(int64)|


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|RVoid|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||object||
|extra||object||
|success||boolean||
|timestamp||integer(int64)|integer(int64)|


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {},
	"extra": {},
	"success": true,
	"timestamp": 0
}
```


## 重置用户密码


**接口地址**:`/api/v1/users/{id}/password/reset`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "newPassword": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id|用户ID|path|true|integer(int64)||
|resetPasswordRequest|重置密码请求参数|body|true|ResetPasswordRequest|ResetPasswordRequest|
|&emsp;&emsp;newPassword|新密码||true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|RVoid|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||object||
|extra||object||
|success||boolean||
|timestamp||integer(int64)|integer(int64)|


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {},
	"extra": {},
	"success": true,
	"timestamp": 0
}
```


## 分页查询用户列表


**接口地址**:`/api/v1/users/page`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|request|用户查询请求参数|query|true|UserQueryRequest|UserQueryRequest|
|&emsp;&emsp;keyword|关键字（用户名、手机号或邮箱）||false|string||
|&emsp;&emsp;status|状态（0-禁用 1-正常）||false|integer(int32)||
|&emsp;&emsp;pageNum|页码||false|integer(int32)||
|&emsp;&emsp;pageSize|每页条数||false|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|RPageSysUser|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||PageSysUser|PageSysUser|
|&emsp;&emsp;records||array|SysUser|
|&emsp;&emsp;&emsp;&emsp;id||integer||
|&emsp;&emsp;&emsp;&emsp;createTime||string||
|&emsp;&emsp;&emsp;&emsp;createUser||string||
|&emsp;&emsp;&emsp;&emsp;updateTime||string||
|&emsp;&emsp;&emsp;&emsp;updateUser||string||
|&emsp;&emsp;&emsp;&emsp;isDeleted||integer||
|&emsp;&emsp;&emsp;&emsp;username||string||
|&emsp;&emsp;&emsp;&emsp;password||string||
|&emsp;&emsp;&emsp;&emsp;realName||string||
|&emsp;&emsp;&emsp;&emsp;phone||string||
|&emsp;&emsp;&emsp;&emsp;email||string||
|&emsp;&emsp;&emsp;&emsp;avatar||string||
|&emsp;&emsp;&emsp;&emsp;gender||integer||
|&emsp;&emsp;&emsp;&emsp;status||integer||
|&emsp;&emsp;&emsp;&emsp;lastLoginTime||string||
|&emsp;&emsp;total||integer(int64)||
|&emsp;&emsp;size||integer(int64)||
|&emsp;&emsp;current||integer(int64)||
|&emsp;&emsp;orders||array|OrderItem|
|&emsp;&emsp;&emsp;&emsp;column||string||
|&emsp;&emsp;&emsp;&emsp;asc||boolean||
|&emsp;&emsp;optimizeCountSql||PageSysUser|PageSysUser|
|&emsp;&emsp;searchCount||PageSysUser|PageSysUser|
|&emsp;&emsp;optimizeJoinOfCountSql||boolean||
|&emsp;&emsp;maxLimit||integer(int64)||
|&emsp;&emsp;countId||string||
|&emsp;&emsp;pages||integer(int64)||
|extra||object||
|success||boolean||
|timestamp||integer(int64)|integer(int64)|


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {
		"records": [
			{
				"id": 0,
				"createTime": "",
				"createUser": "",
				"updateTime": "",
				"updateUser": "",
				"isDeleted": 0,
				"username": "",
				"password": "",
				"realName": "",
				"phone": "",
				"email": "",
				"avatar": "",
				"gender": 0,
				"status": 0,
				"lastLoginTime": ""
			}
		],
		"total": 0,
		"size": 0,
		"current": 0,
		"orders": [
			{
				"column": "",
				"asc": true
			}
		],
		"optimizeCountSql": {},
		"searchCount": {},
		"optimizeJoinOfCountSql": true,
		"maxLimit": 0,
		"countId": "",
		"pages": 0
	},
	"extra": {},
	"success": true,
	"timestamp": 0
}
```


# 认证管理


## 用户注册


**接口地址**:`/api/auth/register`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>用户注册接口</p>



**请求示例**:


```javascript
{
  "username": "",
  "password": "",
  "realName": "",
  "phone": "",
  "email": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|registerRequest|注册请求参数|body|true|RegisterRequest|RegisterRequest|
|&emsp;&emsp;username|用户名||true|string||
|&emsp;&emsp;password|密码||true|string||
|&emsp;&emsp;realName|真实姓名||true|string||
|&emsp;&emsp;phone|手机号||true|string||
|&emsp;&emsp;email|邮箱||false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|RVoid|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||object||
|extra||object||
|success||boolean||
|timestamp||integer(int64)|integer(int64)|


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {},
	"extra": {},
	"success": true,
	"timestamp": 0
}
```


## 修改密码


**接口地址**:`/api/auth/password`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>修改当前登录用户的密码</p>



**请求示例**:


```javascript
{
  "oldPassword": "",
  "newPassword": "",
  "confirmPassword": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|updatePasswordRequest|修改密码请求参数|body|true|UpdatePasswordRequest|UpdatePasswordRequest|
|&emsp;&emsp;oldPassword|原密码||true|string||
|&emsp;&emsp;newPassword|新密码||true|string||
|&emsp;&emsp;confirmPassword|确认密码||true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|RVoid|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||object||
|extra||object||
|success||boolean||
|timestamp||integer(int64)|integer(int64)|


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {},
	"extra": {},
	"success": true,
	"timestamp": 0
}
```


## 退出登录


**接口地址**:`/api/auth/logout`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>用户退出登录</p>



**请求参数**:


暂无


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|RVoid|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||object||
|extra||object||
|success||boolean||
|timestamp||integer(int64)|integer(int64)|


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {},
	"extra": {},
	"success": true,
	"timestamp": 0
}
```


## 用户登录


**接口地址**:`/api/auth/login`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>用户登录接口</p>



**请求示例**:


```javascript
{
  "username": "",
  "password": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|loginRequest|登录请求参数|body|true|LoginRequest|LoginRequest|
|&emsp;&emsp;username|用户名||true|string||
|&emsp;&emsp;password|密码||true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|RLoginResponse|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||LoginResponse|LoginResponse|
|&emsp;&emsp;token||string||
|&emsp;&emsp;tokenType||string||
|&emsp;&emsp;expiresIn||integer(int64)||
|&emsp;&emsp;userInfo||UserInfoResponse|UserInfoResponse|
|&emsp;&emsp;&emsp;&emsp;id||integer||
|&emsp;&emsp;&emsp;&emsp;username||string||
|&emsp;&emsp;&emsp;&emsp;realName||string||
|&emsp;&emsp;&emsp;&emsp;avatar||string||
|&emsp;&emsp;&emsp;&emsp;email||string||
|&emsp;&emsp;&emsp;&emsp;phone||string||
|&emsp;&emsp;&emsp;&emsp;roles||array|string|
|&emsp;&emsp;&emsp;&emsp;permissions||array|string|
|extra||object||
|success||boolean||
|timestamp||integer(int64)|integer(int64)|


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {
		"token": "",
		"tokenType": "",
		"expiresIn": 0,
		"userInfo": {
			"id": 0,
			"username": "",
			"realName": "",
			"avatar": "",
			"email": "",
			"phone": "",
			"roles": [],
			"permissions": []
		}
	},
	"extra": {},
	"success": true,
	"timestamp": 0
}
```


## 获取用户信息


**接口地址**:`/api/auth/info`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>获取当前登录用户的详细信息</p>



**请求参数**:


暂无


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|RSysUser|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||SysUser|SysUser|
|&emsp;&emsp;id||integer(int64)||
|&emsp;&emsp;createTime||string(date-time)||
|&emsp;&emsp;createUser||string||
|&emsp;&emsp;updateTime||string(date-time)||
|&emsp;&emsp;updateUser||string||
|&emsp;&emsp;isDeleted||integer(int32)||
|&emsp;&emsp;username||string||
|&emsp;&emsp;password||string||
|&emsp;&emsp;realName||string||
|&emsp;&emsp;phone||string||
|&emsp;&emsp;email||string||
|&emsp;&emsp;avatar||string||
|&emsp;&emsp;gender||integer(int32)||
|&emsp;&emsp;status||integer(int32)||
|&emsp;&emsp;lastLoginTime||string(date-time)||
|extra||object||
|success||boolean||
|timestamp||integer(int64)|integer(int64)|


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {
		"id": 0,
		"createTime": "",
		"createUser": "",
		"updateTime": "",
		"updateUser": "",
		"isDeleted": 0,
		"username": "",
		"password": "",
		"realName": "",
		"phone": "",
		"email": "",
		"avatar": "",
		"gender": 0,
		"status": 0,
		"lastLoginTime": ""
	},
	"extra": {},
	"success": true,
	"timestamp": 0
}
```


# 角色管理


## 获取角色详情


**接口地址**:`/api/v1/roles/{id}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id||path|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|RSysRole|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||SysRole|SysRole|
|&emsp;&emsp;id||integer(int64)||
|&emsp;&emsp;createTime||string(date-time)||
|&emsp;&emsp;createUser||string||
|&emsp;&emsp;updateTime||string(date-time)||
|&emsp;&emsp;updateUser||string||
|&emsp;&emsp;isDeleted||integer(int32)||
|&emsp;&emsp;roleName||string||
|&emsp;&emsp;roleCode||string||
|&emsp;&emsp;description||string||
|&emsp;&emsp;status||integer(int32)||
|extra||object||
|success||boolean||
|timestamp||integer(int64)|integer(int64)|


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {
		"id": 0,
		"createTime": "",
		"createUser": "",
		"updateTime": "",
		"updateUser": "",
		"isDeleted": 0,
		"roleName": "",
		"roleCode": "",
		"description": "",
		"status": 0
	},
	"extra": {},
	"success": true,
	"timestamp": 0
}
```


## 修改角色


**接口地址**:`/api/v1/roles/{id}`


**请求方式**:`PUT`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "id": 0,
  "createTime": "",
  "createUser": "",
  "updateTime": "",
  "updateUser": "",
  "isDeleted": 0,
  "roleName": "",
  "roleCode": "",
  "description": "",
  "status": 0
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id||path|true|integer(int64)||
|sysRole|SysRole|body|true|SysRole|SysRole|
|&emsp;&emsp;id|||false|integer(int64)||
|&emsp;&emsp;createTime|||false|string(date-time)||
|&emsp;&emsp;createUser|||false|string||
|&emsp;&emsp;updateTime|||false|string(date-time)||
|&emsp;&emsp;updateUser|||false|string||
|&emsp;&emsp;isDeleted|||false|integer(int32)||
|&emsp;&emsp;roleName|||false|string||
|&emsp;&emsp;roleCode|||false|string||
|&emsp;&emsp;description|||false|string||
|&emsp;&emsp;status|||false|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|RVoid|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||object||
|extra||object||
|success||boolean||
|timestamp||integer(int64)|integer(int64)|


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {},
	"extra": {},
	"success": true,
	"timestamp": 0
}
```


## 删除角色


**接口地址**:`/api/v1/roles/{id}`


**请求方式**:`DELETE`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id||path|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|RVoid|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||object||
|extra||object||
|success||boolean||
|timestamp||integer(int64)|integer(int64)|


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {},
	"extra": {},
	"success": true,
	"timestamp": 0
}
```


## 新增角色


**接口地址**:`/api/v1/roles`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "id": 0,
  "createTime": "",
  "createUser": "",
  "updateTime": "",
  "updateUser": "",
  "isDeleted": 0,
  "roleName": "",
  "roleCode": "",
  "description": "",
  "status": 0
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|sysRole|SysRole|body|true|SysRole|SysRole|
|&emsp;&emsp;id|||false|integer(int64)||
|&emsp;&emsp;createTime|||false|string(date-time)||
|&emsp;&emsp;createUser|||false|string||
|&emsp;&emsp;updateTime|||false|string(date-time)||
|&emsp;&emsp;updateUser|||false|string||
|&emsp;&emsp;isDeleted|||false|integer(int32)||
|&emsp;&emsp;roleName|||false|string||
|&emsp;&emsp;roleCode|||false|string||
|&emsp;&emsp;description|||false|string||
|&emsp;&emsp;status|||false|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|RVoid|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||object||
|extra||object||
|success||boolean||
|timestamp||integer(int64)|integer(int64)|


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {},
	"extra": {},
	"success": true,
	"timestamp": 0
}
```


## 获取角色的权限ID列表


**接口地址**:`/api/v1/roles/{id}/permissions`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id||path|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|RListLong|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||array||
|extra||object||
|success||boolean||
|timestamp||integer(int64)|integer(int64)|


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": [],
	"extra": {},
	"success": true,
	"timestamp": 0
}
```


## 分配角色权限


**接口地址**:`/api/v1/roles/{id}/permissions`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "permissionIds": []
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id|角色ID|path|true|integer(int64)||
|assignRolePermissionsRequest|分配角色权限请求参数|body|true|AssignRolePermissionsRequest|AssignRolePermissionsRequest|
|&emsp;&emsp;permissionIds|权限ID列表||true|array|integer(int64)|


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|RVoid|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||object||
|extra||object||
|success||boolean||
|timestamp||integer(int64)|integer(int64)|


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {},
	"extra": {},
	"success": true,
	"timestamp": 0
}
```


## 分页查询角色列表


**接口地址**:`/api/v1/roles/page`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|request|角色查询请求参数|query|true|RoleQueryRequest|RoleQueryRequest|
|&emsp;&emsp;keyword|关键字（角色名称或编码）||false|string||
|&emsp;&emsp;status|状态（0-禁用 1-正常）||false|integer(int32)||
|&emsp;&emsp;pageNum|页码||false|integer(int32)||
|&emsp;&emsp;pageSize|每页条数||false|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|RPageSysRole|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||PageSysRole|PageSysRole|
|&emsp;&emsp;records||array|SysRole|
|&emsp;&emsp;&emsp;&emsp;id||integer||
|&emsp;&emsp;&emsp;&emsp;createTime||string||
|&emsp;&emsp;&emsp;&emsp;createUser||string||
|&emsp;&emsp;&emsp;&emsp;updateTime||string||
|&emsp;&emsp;&emsp;&emsp;updateUser||string||
|&emsp;&emsp;&emsp;&emsp;isDeleted||integer||
|&emsp;&emsp;&emsp;&emsp;roleName||string||
|&emsp;&emsp;&emsp;&emsp;roleCode||string||
|&emsp;&emsp;&emsp;&emsp;description||string||
|&emsp;&emsp;&emsp;&emsp;status||integer||
|&emsp;&emsp;total||integer(int64)||
|&emsp;&emsp;size||integer(int64)||
|&emsp;&emsp;current||integer(int64)||
|&emsp;&emsp;orders||array|OrderItem|
|&emsp;&emsp;&emsp;&emsp;column||string||
|&emsp;&emsp;&emsp;&emsp;asc||boolean||
|&emsp;&emsp;optimizeCountSql||PageSysRole|PageSysRole|
|&emsp;&emsp;searchCount||PageSysRole|PageSysRole|
|&emsp;&emsp;optimizeJoinOfCountSql||boolean||
|&emsp;&emsp;maxLimit||integer(int64)||
|&emsp;&emsp;countId||string||
|&emsp;&emsp;pages||integer(int64)||
|extra||object||
|success||boolean||
|timestamp||integer(int64)|integer(int64)|


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {
		"records": [
			{
				"id": 0,
				"createTime": "",
				"createUser": "",
				"updateTime": "",
				"updateUser": "",
				"isDeleted": 0,
				"roleName": "",
				"roleCode": "",
				"description": "",
				"status": 0
			}
		],
		"total": 0,
		"size": 0,
		"current": 0,
		"orders": [
			{
				"column": "",
				"asc": true
			}
		],
		"optimizeCountSql": {},
		"searchCount": {},
		"optimizeJoinOfCountSql": true,
		"maxLimit": 0,
		"countId": "",
		"pages": 0
	},
	"extra": {},
	"success": true,
	"timestamp": 0
}
```


## 获取所有角色列表


**接口地址**:`/api/v1/roles/list`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


暂无


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|RListSysRole|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||array|SysRole|
|&emsp;&emsp;id||integer(int64)||
|&emsp;&emsp;createTime||string(date-time)||
|&emsp;&emsp;createUser||string||
|&emsp;&emsp;updateTime||string(date-time)||
|&emsp;&emsp;updateUser||string||
|&emsp;&emsp;isDeleted||integer(int32)||
|&emsp;&emsp;roleName||string||
|&emsp;&emsp;roleCode||string||
|&emsp;&emsp;description||string||
|&emsp;&emsp;status||integer(int32)||
|extra||object||
|success||boolean||
|timestamp||integer(int64)|integer(int64)|


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": [
		{
			"id": 0,
			"createTime": "",
			"createUser": "",
			"updateTime": "",
			"updateUser": "",
			"isDeleted": 0,
			"roleName": "",
			"roleCode": "",
			"description": "",
			"status": 0
		}
	],
	"extra": {},
	"success": true,
	"timestamp": 0
}
```


# 权限菜单管理


## 获取权限详情


**接口地址**:`/api/v1/permissions/{id}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id||path|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|RSysPermission|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||SysPermission|SysPermission|
|&emsp;&emsp;id||integer(int64)||
|&emsp;&emsp;createTime||string(date-time)||
|&emsp;&emsp;createUser||string||
|&emsp;&emsp;updateTime||string(date-time)||
|&emsp;&emsp;updateUser||string||
|&emsp;&emsp;isDeleted||integer(int32)||
|&emsp;&emsp;parentId||integer(int64)||
|&emsp;&emsp;name||string||
|&emsp;&emsp;path||string||
|&emsp;&emsp;component||string||
|&emsp;&emsp;perms||string||
|&emsp;&emsp;icon||string||
|&emsp;&emsp;type||integer(int32)||
|&emsp;&emsp;sort||integer(int32)||
|&emsp;&emsp;status||integer(int32)||
|&emsp;&emsp;children||array|SysPermission|
|extra||object||
|success||boolean||
|timestamp||integer(int64)|integer(int64)|


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {
		"id": 0,
		"createTime": "",
		"createUser": "",
		"updateTime": "",
		"updateUser": "",
		"isDeleted": 0,
		"parentId": 0,
		"name": "",
		"path": "",
		"component": "",
		"perms": "",
		"icon": "",
		"type": 0,
		"sort": 0,
		"status": 0,
		"children": [
			{
				"id": 0,
				"createTime": "",
				"createUser": "",
				"updateTime": "",
				"updateUser": "",
				"isDeleted": 0,
				"parentId": 0,
				"name": "",
				"path": "",
				"component": "",
				"perms": "",
				"icon": "",
				"type": 0,
				"sort": 0,
				"status": 0,
				"children": [
					{}
				]
			}
		]
	},
	"extra": {},
	"success": true,
	"timestamp": 0
}
```


## 修改权限


**接口地址**:`/api/v1/permissions/{id}`


**请求方式**:`PUT`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "id": 0,
  "createTime": "",
  "createUser": "",
  "updateTime": "",
  "updateUser": "",
  "isDeleted": 0,
  "parentId": 0,
  "name": "",
  "path": "",
  "component": "",
  "perms": "",
  "icon": "",
  "type": 0,
  "sort": 0,
  "status": 0,
  "children": [
    {
      "id": 0,
      "createTime": "",
      "createUser": "",
      "updateTime": "",
      "updateUser": "",
      "isDeleted": 0,
      "parentId": 0,
      "name": "",
      "path": "",
      "component": "",
      "perms": "",
      "icon": "",
      "type": 0,
      "sort": 0,
      "status": 0,
      "children": [
        {
          "id": 0,
          "createTime": "",
          "createUser": "",
          "updateTime": "",
          "updateUser": "",
          "isDeleted": 0,
          "parentId": 0,
          "name": "",
          "path": "",
          "component": "",
          "perms": "",
          "icon": "",
          "type": 0,
          "sort": 0,
          "status": 0,
          "children": [
            {}
          ]
        }
      ]
    }
  ]
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id||path|true|integer(int64)||
|sysPermission|SysPermission|body|true|SysPermission|SysPermission|
|&emsp;&emsp;id|||false|integer(int64)||
|&emsp;&emsp;createTime|||false|string(date-time)||
|&emsp;&emsp;createUser|||false|string||
|&emsp;&emsp;updateTime|||false|string(date-time)||
|&emsp;&emsp;updateUser|||false|string||
|&emsp;&emsp;isDeleted|||false|integer(int32)||
|&emsp;&emsp;parentId|||false|integer(int64)||
|&emsp;&emsp;name|||false|string||
|&emsp;&emsp;path|||false|string||
|&emsp;&emsp;component|||false|string||
|&emsp;&emsp;perms|||false|string||
|&emsp;&emsp;icon|||false|string||
|&emsp;&emsp;type|||false|integer(int32)||
|&emsp;&emsp;sort|||false|integer(int32)||
|&emsp;&emsp;status|||false|integer(int32)||
|&emsp;&emsp;children|||false|array|SysPermission|


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|RVoid|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||object||
|extra||object||
|success||boolean||
|timestamp||integer(int64)|integer(int64)|


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {},
	"extra": {},
	"success": true,
	"timestamp": 0
}
```


## 删除权限


**接口地址**:`/api/v1/permissions/{id}`


**请求方式**:`DELETE`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id||path|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|RVoid|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||object||
|extra||object||
|success||boolean||
|timestamp||integer(int64)|integer(int64)|


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {},
	"extra": {},
	"success": true,
	"timestamp": 0
}
```


## 新增权限


**接口地址**:`/api/v1/permissions`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "id": 0,
  "createTime": "",
  "createUser": "",
  "updateTime": "",
  "updateUser": "",
  "isDeleted": 0,
  "parentId": 0,
  "name": "",
  "path": "",
  "component": "",
  "perms": "",
  "icon": "",
  "type": 0,
  "sort": 0,
  "status": 0,
  "children": [
    {
      "id": 0,
      "createTime": "",
      "createUser": "",
      "updateTime": "",
      "updateUser": "",
      "isDeleted": 0,
      "parentId": 0,
      "name": "",
      "path": "",
      "component": "",
      "perms": "",
      "icon": "",
      "type": 0,
      "sort": 0,
      "status": 0,
      "children": [
        {
          "id": 0,
          "createTime": "",
          "createUser": "",
          "updateTime": "",
          "updateUser": "",
          "isDeleted": 0,
          "parentId": 0,
          "name": "",
          "path": "",
          "component": "",
          "perms": "",
          "icon": "",
          "type": 0,
          "sort": 0,
          "status": 0,
          "children": [
            {}
          ]
        }
      ]
    }
  ]
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|sysPermission|SysPermission|body|true|SysPermission|SysPermission|
|&emsp;&emsp;id|||false|integer(int64)||
|&emsp;&emsp;createTime|||false|string(date-time)||
|&emsp;&emsp;createUser|||false|string||
|&emsp;&emsp;updateTime|||false|string(date-time)||
|&emsp;&emsp;updateUser|||false|string||
|&emsp;&emsp;isDeleted|||false|integer(int32)||
|&emsp;&emsp;parentId|||false|integer(int64)||
|&emsp;&emsp;name|||false|string||
|&emsp;&emsp;path|||false|string||
|&emsp;&emsp;component|||false|string||
|&emsp;&emsp;perms|||false|string||
|&emsp;&emsp;icon|||false|string||
|&emsp;&emsp;type|||false|integer(int32)||
|&emsp;&emsp;sort|||false|integer(int32)||
|&emsp;&emsp;status|||false|integer(int32)||
|&emsp;&emsp;children|||false|array|SysPermission|


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|RVoid|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||object||
|extra||object||
|success||boolean||
|timestamp||integer(int64)|integer(int64)|


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {},
	"extra": {},
	"success": true,
	"timestamp": 0
}
```


## 获取所有权限列表（树形结构）


**接口地址**:`/api/v1/permissions/tree`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


暂无


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|RListSysPermission|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||array|SysPermission|
|&emsp;&emsp;id||integer(int64)||
|&emsp;&emsp;createTime||string(date-time)||
|&emsp;&emsp;createUser||string||
|&emsp;&emsp;updateTime||string(date-time)||
|&emsp;&emsp;updateUser||string||
|&emsp;&emsp;isDeleted||integer(int32)||
|&emsp;&emsp;parentId||integer(int64)||
|&emsp;&emsp;name||string||
|&emsp;&emsp;path||string||
|&emsp;&emsp;component||string||
|&emsp;&emsp;perms||string||
|&emsp;&emsp;icon||string||
|&emsp;&emsp;type||integer(int32)||
|&emsp;&emsp;sort||integer(int32)||
|&emsp;&emsp;status||integer(int32)||
|&emsp;&emsp;children||array|SysPermission|
|extra||object||
|success||boolean||
|timestamp||integer(int64)|integer(int64)|


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": [
		{
			"id": 0,
			"createTime": "",
			"createUser": "",
			"updateTime": "",
			"updateUser": "",
			"isDeleted": 0,
			"parentId": 0,
			"name": "",
			"path": "",
			"component": "",
			"perms": "",
			"icon": "",
			"type": 0,
			"sort": 0,
			"status": 0,
			"children": [
				{
					"id": 0,
					"createTime": "",
					"createUser": "",
					"updateTime": "",
					"updateUser": "",
					"isDeleted": 0,
					"parentId": 0,
					"name": "",
					"path": "",
					"component": "",
					"perms": "",
					"icon": "",
					"type": 0,
					"sort": 0,
					"status": 0,
					"children": [
						{}
					]
				}
			]
		}
	],
	"extra": {},
	"success": true,
	"timestamp": 0
}
```


## 分页获取权限列表


**接口地址**:`/api/v1/permissions/page`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|pageNum|页码|query|false|integer(int32)||
|pageSize|每页条数|query|false|integer(int32)||
|name|权限名称|query|false|string||
|type|权限类型：0-目录，1-菜单，2-按钮|query|false|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|RPageSysPermission|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||PageSysPermission|PageSysPermission|
|&emsp;&emsp;records||array|SysPermission|
|&emsp;&emsp;&emsp;&emsp;id||integer||
|&emsp;&emsp;&emsp;&emsp;createTime||string||
|&emsp;&emsp;&emsp;&emsp;createUser||string||
|&emsp;&emsp;&emsp;&emsp;updateTime||string||
|&emsp;&emsp;&emsp;&emsp;updateUser||string||
|&emsp;&emsp;&emsp;&emsp;isDeleted||integer||
|&emsp;&emsp;&emsp;&emsp;parentId||integer||
|&emsp;&emsp;&emsp;&emsp;name||string||
|&emsp;&emsp;&emsp;&emsp;path||string||
|&emsp;&emsp;&emsp;&emsp;component||string||
|&emsp;&emsp;&emsp;&emsp;perms||string||
|&emsp;&emsp;&emsp;&emsp;icon||string||
|&emsp;&emsp;&emsp;&emsp;type||integer||
|&emsp;&emsp;&emsp;&emsp;sort||integer||
|&emsp;&emsp;&emsp;&emsp;status||integer||
|&emsp;&emsp;&emsp;&emsp;children||array|SysPermission|
|&emsp;&emsp;total||integer(int64)||
|&emsp;&emsp;size||integer(int64)||
|&emsp;&emsp;current||integer(int64)||
|&emsp;&emsp;orders||array|OrderItem|
|&emsp;&emsp;&emsp;&emsp;column||string||
|&emsp;&emsp;&emsp;&emsp;asc||boolean||
|&emsp;&emsp;optimizeCountSql||PageSysPermission|PageSysPermission|
|&emsp;&emsp;searchCount||PageSysPermission|PageSysPermission|
|&emsp;&emsp;optimizeJoinOfCountSql||boolean||
|&emsp;&emsp;maxLimit||integer(int64)||
|&emsp;&emsp;countId||string||
|&emsp;&emsp;pages||integer(int64)||
|extra||object||
|success||boolean||
|timestamp||integer(int64)|integer(int64)|


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {
		"records": [
			{
				"id": 0,
				"createTime": "",
				"createUser": "",
				"updateTime": "",
				"updateUser": "",
				"isDeleted": 0,
				"parentId": 0,
				"name": "",
				"path": "",
				"component": "",
				"perms": "",
				"icon": "",
				"type": 0,
				"sort": 0,
				"status": 0,
				"children": [
					{
						"id": 0,
						"createTime": "",
						"createUser": "",
						"updateTime": "",
						"updateUser": "",
						"isDeleted": 0,
						"parentId": 0,
						"name": "",
						"path": "",
						"component": "",
						"perms": "",
						"icon": "",
						"type": 0,
						"sort": 0,
						"status": 0,
						"children": [
							{}
						]
					}
				]
			}
		],
		"total": 0,
		"size": 0,
		"current": 0,
		"orders": [
			{
				"column": "",
				"asc": true
			}
		],
		"optimizeCountSql": {},
		"searchCount": {},
		"optimizeJoinOfCountSql": true,
		"maxLimit": 0,
		"countId": "",
		"pages": 0
	},
	"extra": {},
	"success": true,
	"timestamp": 0
}
```


## 获取当前用户的菜单


**接口地址**:`/api/v1/permissions/menu`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


暂无


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|RListMenuVO|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||array|MenuVO|
|&emsp;&emsp;id||integer(int64)||
|&emsp;&emsp;name||string||
|&emsp;&emsp;path||string||
|&emsp;&emsp;component||string||
|&emsp;&emsp;icon||string||
|&emsp;&emsp;orderNum||integer(int32)||
|&emsp;&emsp;parentId||integer(int64)||
|&emsp;&emsp;hidden||boolean||
|&emsp;&emsp;sort||integer(int32)||
|extra||object||
|success||boolean||
|timestamp||integer(int64)|integer(int64)|


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": [
		{
			"id": 0,
			"name": "",
			"path": "",
			"component": "",
			"icon": "",
			"orderNum": 0,
			"parentId": 0,
			"hidden": true,
			"sort": 0
		}
	],
	"extra": {},
	"success": true,
	"timestamp": 0
}
```


# test-controller


## hello


**接口地址**:`/api/test/hello`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


暂无


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK||


**响应参数**:


暂无


**响应示例**:
```javascript

```


## generatePassword


**接口地址**:`/api/test/generate-password`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|rawPassword||query|true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|RString|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||string||
|extra||object||
|success||boolean||
|timestamp||integer(int64)|integer(int64)|


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": "",
	"extra": {},
	"success": true,
	"timestamp": 0
}
```


## checkDatabase


**接口地址**:`/api/test/db-check`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


暂无


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|RObject|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||object||
|extra||object||
|success||boolean||
|timestamp||integer(int64)|integer(int64)|


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {},
	"extra": {},
	"success": true,
	"timestamp": 0
}
```


## checkPassword


**接口地址**:`/api/test/check-password`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|rawPassword||query|true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|RObject|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||object||
|extra||object||
|success||boolean||
|timestamp||integer(int64)|integer(int64)|


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {},
	"extra": {},
	"success": true,
	"timestamp": 0
}
```