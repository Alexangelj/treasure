pragma solidity >=0.5.8 <0.6.0;

import "@openzeppelin/contracts/ownership/Ownable.sol";
// Need ERC-20, Owner, Stop, Token contracts, SafeMath

/**
 * @title SafeMath
 * @dev Math operations with safety checks that revert on error
 */
library SafeMath {

  /**
  * @dev Multiplies two numbers, reverts on overflow.
  */
  function mul(uint256 a, uint256 b) internal pure returns (uint256) {
    // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
    // benefit is lost if 'b' is also tested.
    // See: https://github.com/OpenZeppelin/openzeppelin-solidity/pull/522
    if (a == 0) {
      return 0;
    }

    uint256 c = a * b;
    require(c / a == b, "Reverse operation produces incorrect value");

    return c;
  }

  /**
  * @dev Integer division of two numbers truncating the quotient, reverts on division by zero.
  */
  function div(uint256 a, uint256 b) internal pure returns (uint256) {
    require(b > 0, "Cannot divide by 0."); // Solidity only automatically asserts when dividing by 0
    uint256 c = a / b;
    // assert(a == b * c + a % b); // There is no case in which this doesn't hold

    return c;
  }

  /**
  * @dev Subtracts two numbers, reverts on overflow (i.e. if subtrahend is greater than minuend).
  */
  function sub(uint256 a, uint256 b) internal pure returns (uint256) {
    require(b <= a, "Cannot be larger number after having subtracted");
    uint256 c = a - b;

    return c;
  }

  /**
  * @dev Adds two numbers, reverts on overflow.
  */
  function add(uint256 a, uint256 b) internal pure returns (uint256) {
    uint256 c = a + b;
    require(c >= a, "Function is less than added value.");

    return c;
  }

  /**
  * @dev Divides two numbers and returns the remainder (unsigned integer modulo),
  * reverts when dividing by zero.
  */
  function mod(uint256 a, uint256 b) internal pure returns (uint256) {
    require(b != 0, "Cannot divide by 0.");
    return a % b;
  }
}


interface IERC20 {

    event Transfer(
        address indexed from,
        address indexed to,
        uint256 value
    );
    event Approval(
        address indexed owner,
        address indexed to,
        uint256 value
    );

    function totalSupply() external view returns (uint256);
    function transfer(address to, uint256 value) external returns (bool);
    function transferFrom(address from, address to, uint256 value) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 value) external returns (bool);
}


contract TrsrTokenDetailed is IERC20 {
    string private _name;
    string private _symbol;
    uint8 private _decimals;

    constructor(string memory name, string memory symbol, uint8 decimals) public {
        _name = name;
        _symbol = symbol;
        _decimals = decimals;
    }

    function name() public view returns (string memory) {
        return _name;
    }
    function symbol() public view returns(string memory) {
        return _symbol;
    }
    function decimals() public view returns(uint8) {
        return _decimals;
    }
}


contract TrsrToken is IERC20, Ownable, TrsrTokenDetailed {
    // Note: Formatting
    // declaration name public/private view returns (literal) { function operations; }
    // function test() public view returns (bool) { return True; }
    constructor(uint256 initialSupply) TrsrTokenDetailed("Treasure", "TRSR", 18) public {
        _mint(msg.sender, initialSupply);
    }

    using SafeMath for uint256;
    // Mapping, map addresses to balances, and maps addresses to addresses of balances for the allowance/approval of spending
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowed;

    // Variable for the total supply
    uint256 private _totalSupply;

    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address owner) public view returns (uint256){
        return _balances[owner];
    }

    function transferFrom(address from, address to, uint256 value) public returns (bool) {
        require(value <= _balances[from], "Value exceeds balance.");
        require(value <= _allowed[from][msg.sender], "Value exceeds allowance.");
        require(to != address(0), "Cannot send to self.");
        _balances[from] = _balances[from].sub(value);
        _balances[to] = _balances[to].add(value);
        _allowed[from][msg.sender] = _allowed[from][msg.sender].sub(value);
        emit Transfer(from, to, value);
        return true;
    }

    function approve(address spender, uint256 value) public returns (bool){
        require(spender != address(0), "Cannot have the spender = address(0)");
        _allowed[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }

    function allowance(address owner, address spender) public view returns (uint256) {
        return _allowed[owner][spender];
    }

    function increaseAllowance(address spender, uint256 value) public returns (bool) {
        require(spender != address(0), "Cannot be address(0)");
        _allowed[msg.sender][spender] = (_allowed[msg.sender][spender].add(value));
        emit Approval(msg.sender, spender, value);
        return true;
    }

    function decreaseAllowance(address spender, uint256 value) public returns (bool) {
        require(spender != address(0), "Cannot be address(0)");
        _allowed[msg.sender][spender] = (_allowed[msg.sender][spender].sub(value));
        emit Approval(msg.sender, spender, value);
        return true;
    }
    function transfer(address to, uint256 value) public returns (bool){
        require(value <= _balances[msg.sender], "Contract does not have enough to send.");
        require(to != address(0), "Cannot send to address(0).");

        _balances[msg.sender] = _balances[msg.sender].sub(value);
        _balances[to] = _balances[to].add(value);

        emit Transfer(msg.sender, to, value);
        return true;
    }

    function _mint(address to, uint256 value) internal {
        require(to != address(0), "address(0) incorrect.");
        _totalSupply = _totalSupply.add(value);
        _balances[to] = _balances[to].add(value);
        emit Transfer(address(0), to, value);
    }

    function _burn(address to, uint256 value) internal {
        require(to != address(0), "Address(0) incorrect.");
        _totalSupply = _totalSupply.sub(value);
        _balances[to] = _balances[to].sub(value);
        emit Transfer(to, address(0), value);
    }

}