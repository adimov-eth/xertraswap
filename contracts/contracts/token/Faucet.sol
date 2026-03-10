// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title Faucet
 * @notice Drips test tokens and native STRAX on Auroria testnet.
 *         Each address can claim once per cooldown period.
 */
contract Faucet {
    address public owner;
    uint256 public cooldown = 24 hours;
    uint256 public nativeDripAmount = 1 ether; // 1 STRAX

    struct TokenConfig {
        address token;
        uint256 amount;
    }

    TokenConfig[] public tokens;
    mapping(address => uint256) public lastClaimed;

    event Drip(address indexed recipient, uint256 tokenCount, uint256 nativeAmount);
    event TokenAdded(address indexed token, uint256 amount);
    event TokenRemoved(uint256 index);
    event CooldownUpdated(uint256 newCooldown);
    event NativeDripUpdated(uint256 newAmount);
    event Funded(address indexed funder, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Faucet: not owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    receive() external payable {
        emit Funded(msg.sender, msg.value);
    }

    function addToken(address _token, uint256 _amount) external onlyOwner {
        tokens.push(TokenConfig(_token, _amount));
        emit TokenAdded(_token, _amount);
    }

    function removeToken(uint256 index) external onlyOwner {
        require(index < tokens.length, "Faucet: invalid index");
        tokens[index] = tokens[tokens.length - 1];
        tokens.pop();
        emit TokenRemoved(index);
    }

    function setCooldown(uint256 _cooldown) external onlyOwner {
        cooldown = _cooldown;
        emit CooldownUpdated(_cooldown);
    }

    function setNativeDripAmount(uint256 _amount) external onlyOwner {
        nativeDripAmount = _amount;
        emit NativeDripUpdated(_amount);
    }

    function canClaim(address user) public view returns (bool) {
        return block.timestamp >= lastClaimed[user] + cooldown;
    }

    function timeUntilNextClaim(address user) public view returns (uint256) {
        uint256 nextClaim = lastClaimed[user] + cooldown;
        if (block.timestamp >= nextClaim) return 0;
        return nextClaim - block.timestamp;
    }

    function claim() external {
        require(canClaim(msg.sender), "Faucet: cooldown not expired");
        lastClaimed[msg.sender] = block.timestamp;

        // Drip native STRAX
        if (nativeDripAmount > 0 && address(this).balance >= nativeDripAmount) {
            (bool sent, ) = payable(msg.sender).call{value: nativeDripAmount}("");
            require(sent, "Faucet: STRAX transfer failed");
        }

        // Drip all configured tokens
        for (uint256 i = 0; i < tokens.length; i++) {
            IERC20 token = IERC20(tokens[i].token);
            uint256 amount = tokens[i].amount;
            if (token.balanceOf(address(this)) >= amount) {
                token.transfer(msg.sender, amount);
            }
        }

        emit Drip(msg.sender, tokens.length, nativeDripAmount);
    }

    function tokenCount() external view returns (uint256) {
        return tokens.length;
    }

    function withdrawTokens(address _token) external onlyOwner {
        uint256 bal = IERC20(_token).balanceOf(address(this));
        IERC20(_token).transfer(owner, bal);
    }

    function withdrawNative() external onlyOwner {
        (bool sent, ) = payable(owner).call{value: address(this).balance}("");
        require(sent, "Faucet: withdraw failed");
    }
}
