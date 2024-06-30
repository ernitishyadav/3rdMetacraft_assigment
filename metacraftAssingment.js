

const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL
} = require("@solana/web3.js");

const newPair = new Keypair();
const publicKeyString = new PublicKey(newPair.publicKey).toString();
const privateKey = newPair.secretKey;

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

console.log("Public key of the generated keypair:", publicKeyString);

const getWalletBalance = async () => {
    try {
        console.log("Connection object is:", connection);
        const myWallet = Keypair.fromSecretKey(privateKey);
        const balance = await connection.getBalance(myWallet.publicKey);
        console.log(`Wallet balance is: ${balance / LAMPORTS_PER_SOL} SOL`);
    } catch (err) {
        console.error(err);
    }
};

const airDropSol = async () => {
    try {
        console.log("Connection object is:", connection);
        const myWallet = Keypair.fromSecretKey(privateKey);
        const airdropSignature = await connection.requestAirdrop(
            myWallet.publicKey,
            LAMPORTS_PER_SOL // airdrop 1 SOL
        );
        await connection.confirmTransaction(airdropSignature);
        console.log("Airdrop successful!");
    } catch (err) {
        console.error(err);
    }
};
