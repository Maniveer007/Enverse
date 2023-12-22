//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

contract LedgerContract{

    struct ledger{
        address from;
        address to ;
        bool isNFT;
        uint amount;
        address ifNFTaddress;
    }

    ledger[] public Ledger; //public for checking

    function addLedger(address _from,address _to, bool _isNFT,uint _amount,address _ifNFTaddress)external{
        if(_isNFT){
            require(_ifNFTaddress!=address(0));
        }
        else{
            require(_ifNFTaddress==address(0));
        }
        Ledger.push(ledger(_from,_to,_isNFT,_amount,_ifNFTaddress));
    }
}


//  0xa0B66fe91aaC3cd0D11E62DD3fB7aC30FD8664dd   mumbai