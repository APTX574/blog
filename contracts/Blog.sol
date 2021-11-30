// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.10;

contract Blog {
    struct User{
        uint32 user_id;
        string userName;
        uint8 imgId;
        bool used;
   }
    struct blogStruct{
        uint32 blog_id;
        string title;
        string content;
        uint256 push_time;
        uint256 modify_time;
       
   }
    uint32 user_id;
    uint8 imgId;
    mapping(address=>User)  userMap;
    mapping(uint32=>blogStruct[]) blogMap;
    
    constructor() {
        user_id=0;

        imgId=0;
    }
    function register(string memory _name,string memory _intr) public  payable returns(uint8){
        if(userMap[msg.sender].used){
            return 0;
        }
        if(blogMap[userMap[msg.sender].user_id].length!=0){
            return 1;
        }
        userMap[msg.sender]=User(user_id++,_name,(imgId++)%8,true);
        blogMap[user_id-1].push(blogStruct(0,"intr",_intr,block.timestamp,0));
        return 2;
    }
    function login()public  view returns(string memory,uint8 ,string memory){
        require(userMap[msg.sender].used);
        return (userMap[msg.sender].userName , userMap[msg.sender].imgId , blogMap[userMap[msg.sender].user_id][0].content);

    }
    function pushBlog(string memory _title,string memory _content ) public {
        uint32 userId=userMap[msg.sender].user_id;
        uint32 blog_id=uint32(blogMap[userId].length);
        blogMap[userId].push(blogStruct(blog_id,_title,_content,block.timestamp,0));
    }
    function modifyBlog(uint32 _blog_id ,string memory _title,string memory _content ) public {
        uint32 userId=userMap[msg.sender].user_id;
        blogMap[userId][_blog_id].content=_content;
        blogMap[userId][_blog_id].title=_title;
        blogMap[userId][_blog_id].modify_time=block.timestamp;
    }
    function getBlog()public view returns(blogStruct[] memory){
        return blogMap[userMap[msg.sender].user_id];
    }

}