// SPDX-License-Identifier: MIT
pragma solidity *0.8.0;

contract EventExample {

            struct device {
                    string id;
                    string value;
                    string status;
                    
                    }
    
    constructor()  {
       

    }

   event DataStored(string id, uint256 timestamp, string status);
   event login(string id, uint256 timestamp, string status);
   event addDevice(string id, uint256 timestamp, string status);
    address owner;
   mapping (uint => device)  public DEVICES; 
   uint256  public device_counter=0;

  modifier onlyowner{

      require(msg.sender == owner,"ACCESS DENIED");
      _;
  }

    function add_device(string memory id, string memory val, string memory status) public {
        
            DEVICES[device_counter]= device(id,val,status);
            emit addDevice(id, block.timestamp," a device is added  ");
            device_counter ++;
        }

   function storeData( string memory _id, string memory _val) external {
    for(uint i=0;i< device_counter;i++){
       if(keccak256(abi.encodePacked((DEVICES[i].id))) == keccak256(abi.encodePacked((_id)))){
           if(keccak256(abi.encodePacked((DEVICES[i].status))) == keccak256(abi.encodePacked(("Active")))){
        DEVICES[i].id=_val;
        emit DataStored(_id, block.timestamp," The device stored data"  );
                    }
                }
            }
    }

    function getData(string memory _id) public  {
    for(uint i=0;i< device_counter;i++){
    if(keccak256(abi.encodePacked((DEVICES[i].id))) == keccak256(abi.encodePacked((_id)))){
         emit DataStored(DEVICES[i].id, block.timestamp," Someone requests some data");
                    }
            }
    }

    function login_Device(string memory _id ) external{
    for(uint i=0;i< device_counter;i++){
     if(keccak256(abi.encodePacked((DEVICES[i].id))) == keccak256(abi.encodePacked((_id)))){

            emit login(_id, block.timestamp,"Device is logged");
             }
         }
    }

}
