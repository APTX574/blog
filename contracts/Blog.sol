// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.10;


contract Blog {
    event creatUser(bytes32 hash,uint256 userId);
    event addBlog_event(uint256 blog_id,uint256 add_time);
    uint256 blog_id;
    string public s;
    struct userStruct{
        uint256 userId;
        string userName;
        uint32 blogSum;
        bytes32 hash;

    }
    struct blogStruct{
        uint256 blog_id;
        string title;
        bytes32 hash;
        uint256 userId;
        uint256 add_time;
        uint256 modify_time;

    }
    mapping(uint256=>address) userIdMap;
    mapping(address=>userStruct)  userMap;
    mapping(uint256=>uint256[]) userBlogs;
    mapping(uint256=>blogStruct) blogMap;
    constructor() {
        blog_id=0;
    }
    function register(string memory mainMsg,string memory userName) public  payable returns(bytes32,uint256) {

        uint256  userId = uint256(keccak256(abi.encodePacked(block.difficulty, block.timestamp)))%1000000;
        while(userBlogs[userId].length!=0){
            userId = uint256(keccak256(abi.encodePacked(block.difficulty,  block.timestamp)))%1000000;
        }
        bytes32  hash=sha256(abi.encodePacked(userId,userName,mainMsg));
        emit creatUser(hash,userId);
        userMap[msg.sender]=userStruct(userId,userName,0,hash);
        return (hash,userId);
    }
    function vfUser(uint256  userId) public payable returns(bytes32){
        return userMap[userIdMap[userId]].hash;
    }
    function addBlog(bytes32 hash,string memory title)public payable{
        uint256 userid=userMap[msg.sender].userId;
        blogMap[userid]=blogStruct(blog_id,title,hash,userid,block.timestamp,block.timestamp);
        emit addBlog_event(blog_id,block.timestamp);
        blog_id=blog_id+1;

    }
    function login()public payable returns (uint256){
        return userMap[msg.sender].userId;
    }
}
