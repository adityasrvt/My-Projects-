import bag1 from "./assets/bag1.jpg";
import watch from "./assets/watch.jpg";
import wallet from "./assets/wallet.jpg";
import jewel from "./assets/jewellery.jpg";

export const PRODUCTS = {
  bags: [
    { id: "bag_1", src: bag1, name: "Royal Leather Bag", price: "$199" },
    { id: "bag_2", src: bag1, name: "Premium Tote Bag", price: "$249" },
    { id: "bag_3", src: bag1, name: "Classic Handbag", price: "$179" },
    { id: "bag_4", src: bag1, name: "Designer Satchel", price: "$299" },
  ],

  watches: [
    { id: "watch_1", src: watch, name: "Elite Watch", price: "$499" },
    { id: "watch_2", src: watch, name: "Luxury Gold Watch", price: "$699" },
    { id: "watch_3", src: watch, name: "Sport Chronograph", price: "$549" },
    { id: "watch_4", src: watch, name: "Classic Timepiece", price: "$449" },
  ],

  wallets: [
    { id: "wallet_1", src: wallet, name: "Leather Wallet", price: "$129" },
    { id: "wallet_2", src: wallet, name: "Bifold Wallet", price: "$99" },
    { id: "wallet_3", src: wallet, name: "Card Holder", price: "$79" },
    { id: "wallet_4", src: wallet, name: "Money Clip Wallet", price: "$149" },
  ],

  jewellery: [
    { id: "jewel_1", src: jewel, name: "Diamond Necklace", price: "$999" },
    { id: "jewel_2", src: jewel, name: "Gold Bracelet", price: "$799" },
    { id: "jewel_3", src: jewel, name: "Pearl Earrings", price: "$599" },
    { id: "jewel_4", src: jewel, name: "Platinum Ring", price: "$1299" },
  ]
};
