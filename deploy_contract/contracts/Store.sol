// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Store {
    struct File {
        string filename;
        string cid;
    }

    mapping(address => File[]) public userFiles;

    function storeFile(string memory _filename, string memory _cid) public {
        File[] storage files = userFiles[msg.sender];
        files.push(File(_filename, _cid));
    }

    function getUserFiles() public view returns (File[] memory) {
        return userFiles[msg.sender];
    }
}
