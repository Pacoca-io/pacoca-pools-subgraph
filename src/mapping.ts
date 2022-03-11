import { Address, BigInt, BigDecimal } from "@graphprotocol/graph-ts";
import {
  Deposit,
  Withdraw,
} from "../generated/UpgradeablePool/UpgradeablePool";
import { User } from "../generated/schema";

export function handleDeposit(event: Deposit): void {
  const userAddress = toHexString(event.params.user);
  const amountDeposited = toDecimal(event.params.amount);

  let user = User.load(userAddress);

  if (!user) {
    user = new User(userAddress);

    user.balance = BigDecimal.fromString("0");
  }

  user.balance = user.balance + amountDeposited;

  user.save();
}

export function handleWithdraw(event: Withdraw): void {
  const userAddress = toHexString(event.params.user);
  const amountWithdrawn = toDecimal(event.params.amount);

  let user = User.load(userAddress);

  if (!user) {
    user = new User(userAddress);

    user.balance = BigDecimal.fromString("0");
  }

  user.balance = user.balance - amountWithdrawn;

  user.save();
}

//////////// Helpers ////////////

const BD_18 = BigDecimal.fromString("1000000000000000000");

function toDecimal(units: BigInt): BigDecimal {
  return units.toBigDecimal().div(BD_18);
}

function toHexString(address: Address): string {
  return address.toHexString();
}
