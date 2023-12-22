//SPDX-License-Identifier:MIT
pragma solidity ^0.8.19;

import "@chainlink/contracts/src/v0.8/vrf/VRFV2WrapperConsumerBase.sol";
interface IquestLedger {
    function addLedger(address _from,address _to, bool _isNFT,uint _amount,address _ifNFTaddress)external;
}

contract oraclecrypto is VRFV2WrapperConsumerBase{

IquestLedger ledger;

uint256  lastRequestId;
mapping (address=>bool)  blacklist;


    event RequestSent(uint256 requestId, uint32 numWords);
    event RequestFulfilled(
        uint256 requestId,
        uint256[] randomWords,
        uint256 payment
    );
uint  maxpool;
uint  currentpool;

    struct RequestStatus {
        uint256 paid;
        bool fulfiled;
        uint randomword;
       address sender;
       uint poolwon;
    }
    mapping(uint256 => RequestStatus)  s_requests; 
    uint256[]  requestIds;
    mapping (address => uint)  addressreq;


    uint32 callbackGasLimit = 100000;
    uint16 requestConfirmations = 3;
    uint32 numWords = 1;

    address linkAddress = 0x326C977E6efc84E512bB9C30f76E30c160eD06FB;
    address wrapperAddress = 0x99aFAf084eBA697E584501b8Ed2c0B37Dd136693;

    constructor(address _ledger) VRFV2WrapperConsumerBase(linkAddress, wrapperAddress) payable{
        ledger=IquestLedger(_ledger);
        maxpool=msg.value;
        currentpool=msg.value;

    }


    function participate() external returns (uint requestId){
        

        requestId = requestRandomness(
            callbackGasLimit,
            requestConfirmations,
            numWords
        );
        addressreq[msg.sender]=requestId;
        requestIds.push(requestId);
        lastRequestId=requestId;
        s_requests[requestId]=RequestStatus(
            VRF_V2_WRAPPER.calculateRequestPrice(callbackGasLimit),
            false,0,msg.sender,0
        );

        emit RequestSent(requestId, numWords);
        return requestId;
    }

    function fulfillRandomWords(
        uint256 _requestId,
        uint256[] memory _randomWords
    ) internal override {
        // require(s_requests[_requestId].paid > 0, "request not found");
        s_requests[_requestId].fulfiled = true;
        s_requests[_requestId].randomword = _randomWords[0];
        emit RequestFulfilled(
            _requestId,
            _randomWords,
            s_requests[_requestId].paid
        );

    
        
    }
    function claim() external{
        require(blacklist[msg.sender]==false);
        require(s_requests[addressreq[msg.sender]].fulfiled==true);
        blacklist[msg.sender]=true;
        
        uint randomword=s_requests[addressreq[msg.sender]].randomword;

        uint prizewon=randomword%maxpool;
        if(currentpool>prizewon){
        payable(msg.sender).transfer(prizewon);
        currentpool=currentpool-prizewon;
        } else{
            prizewon=currentpool;
            payable(msg.sender).transfer(currentpool);
            currentpool=0;
        }
        IquestLedger(ledger).addLedger(address(this), msg.sender, false, prizewon, address(0));
    }

}














